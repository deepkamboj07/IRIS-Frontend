import { create } from 'zustand';
import { serviceGet, servicePatch, servicePost } from '../libs/utils/apiService';
import { toast } from 'sonner';

interface TaskListType {
  id?: string;
  detail: string;
  createdAt?: string;
  status?: 'pending' | 'completed';
}

export interface TaskType {
  id?: string;
  title: string;
  description: string;
  status?: 'pending' | 'inProgress' | 'inReview' | 'completed';
  taskLists?: TaskListType[];
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectType {
  id: string;
  name: string;
  description?: string;
  userId: string;
  tasks?: TaskType[];
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectStore {
  projects: {
    docs: ProjectType[];
    total: number;
    page: number;
    limit: number;
  };
  singleProject: ProjectType | null;
  loading: boolean;
  error: string | null;

  fetchProjects: (params?: { page?: number; limit?: number; search?: string }) => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
  createProject: (project: { name: string; description?: string }) => Promise<void>;
  addTaskToProject: (projectId: string, task: { title: string; description: string; taskList?: TaskListType[] }) => Promise<void>;
  updateTaskInProject: (projectId: string, taskId: string, updatedTask: Partial<TaskType>) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: {
    docs: [],
    total: 0,
    page: 1,
    limit: 10,
    },
  singleProject: null,
  loading: false,
  error: null,

  fetchProjects: async ({ page = 1, limit = 10, search = '' } = {}) => {
    set({ loading: true, error: null });
    try {
      const res = await serviceGet(`/api/v1/projects?page=${page}&limit=${limit}&search=${search}`);
      set({ projects: res.data || [], loading: false });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || 'Failed to fetch projects', loading: false });
    }
  },

  fetchProjectById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await serviceGet(`/api/v1/projects/${id}`);
      set({ singleProject: res.data?.docs || null, loading: false });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || 'Failed to fetch project', loading: false });
    }
  },

  createProject: async ({ name, description }) => {
    set({ loading: true, error: null });
    try {
      const res = await servicePost(`/api/v1/projects`, { name, description });
      await get().fetchProjects(); // Refresh list
      if(res.success){
        toast.success('Project created successfully');
      }
    } catch (error: any) {
      set({ error: error?.response?.data?.message || 'Failed to create project', loading: false });
    } finally {
      set({ loading: false });
    }
  },

  addTaskToProject: async (projectId, task) => {
    set({ loading: true, error: null });
    try {
      const res = await servicePost(`/api/v1/projects/${projectId}/tasks`, task);
      if(res.success){
        
         await get().fetchProjectById(projectId); // Refresh the single project
        toast.success('Task added successfully');
      }
    } catch (error: any) {
      set({ error: error?.response?.data?.message || 'Failed to add task', loading: false });
    } finally {
      set({ loading: false });
    }
  },

  updateTaskInProject: async (projectId, taskId, updatedTask) => {
    set({ loading: true, error: null });
    try {
      const res = await servicePatch(`/api/v1/projects/${taskId}`, updatedTask);
      
      if(res.success){
        await get().fetchProjectById(projectId); // Refresh the single project
        toast.success('Task updated successfully');
      }
    } catch (error: any) {
      set({ error: error?.response?.data?.message || 'Failed to update task', loading: false });
    } finally {
      set({ loading: false });
    }
  },

}));
