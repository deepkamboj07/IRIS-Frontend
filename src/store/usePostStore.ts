import { create } from 'zustand'
import { notification } from 'antd'
import { serviceGet, servicePost } from '../libs/utils/apiService'
import { useAuthStore } from './useAuthStore'

interface PostImage {
  id: string
  imageUrl: string
}

interface UserInfo {
  id: string
  name: string
  username: string
  profileImg?: string
}

export interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  images: PostImage[]
  user?: UserInfo
}

export interface Posts {
    docs: Post[]
    total: number
    page: number
    limit: number
    hasMore?: boolean
}

interface PostStore {
  posts: Posts,
  loading: Map<string, boolean>
  error: string | null

  getMyPosts: (page?: number, limit?: number, search?: string) => Promise<void>
  createPost: (data: { title: string; content: string; images?: string[] }) => Promise<void>

  uploadImage: (file: File) => Promise<string>
}

export const usePostStore = create<PostStore>((set) => ({
  posts:{
    docs: [],
    total: 0,
    page: 1,
    limit: 10
  },
  loading: new Map(),
  error: null,

  getMyPosts: async (page = 1, limit = 10, search = '') => {
  set({ loading: new Map([['getMyPosts', true]]), error: null });

  try {
    const res = await serviceGet(`/api/v1/posts/my-posts?page=${page}&limit=${limit}&search=${search}`);
    const newPosts = res.data;

    set((state) => {
      const updatedDocs =
        page === 1
          ? newPosts.docs
          : [...(state.posts.docs || []), ...newPosts.docs];

      return {
        posts: {
          ...newPosts,
          docs: updatedDocs,
          hasMore: newPosts.docs.length < newPosts.total,
        },
        loading: new Map([['getMyPosts', false]]),
      };
    });
  } catch (err: any) {
    const msg = err?.response?.data?.message || 'Failed to fetch posts';
    set({ error: msg, loading: new Map([['getMyPosts', false]]) });
    notification.error({ message: 'Fetch Error', description: msg });
  }
}
,

  createPost: async ({ title, content, images }) => {
    try {
        set({ loading: new Map([['createPost', true]]), error: null })
      const res = await servicePost('/api/v1/posts/create-post', { title, content, images })
      const { docs } = res.data;
      await useAuthStore.getState().getMyProfile();
      set((state) => ({
        posts: { ...state.posts, docs: [docs, ...state.posts.docs], total: state.posts.total + 1 },
        loading: new Map([['createPost', false]])
      }))
      notification.success({ message: 'Post Created', description: res.data.message })
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to create post'
      set({ error: msg, loading: new Map([['createPost', false]]) })
      notification.error({ message: 'Post Error', description: msg })
    }
  },
    uploadImage: async (file: File): Promise<string> => {
        set({ loading: new Map([['uploadImage', true]]) })
        try {
        const formData = new FormData()
        formData.append('image', file)
        const res = await servicePost('/api/v1/upload', formData, {
            'Content-Type': 'multipart/form-data'
        })
        set({ loading: new Map([['uploadImage', false]]) })
        return res.data.docs.url
        } catch (err: any) {
        const msg = err?.response?.data?.message || 'Failed to upload image'
        set({ error: msg, loading: new Map([['uploadImage', false]]) })
        notification.error({ message: 'Upload Error', description: msg })
        throw new Error(msg)
        }
    }
}))
