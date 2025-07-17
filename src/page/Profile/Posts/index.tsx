import { useEffect, useRef, useState } from "react";
import PostCard from "../../../components/Items/Profile/Post/PostCard";
import CreatePostModal from "../../../components/Modal/CreatePostModal";
import { usePostStore } from "../../../store/usePostStore";
import { useUIStore } from "../../../store/useUIStore";

const PostsPage: React.FC = () => {
  const { openModal, modalType, closeModal } = useUIStore();
  const { createPost, posts, loading, getMyPosts } = usePostStore();

  const [page, setPage] = useState(1);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handlePostSubmit = async (data: any) => {
    try {
      const payload = {
        title: data.title?.trim() || "",
        content: data.content?.trim() || "",
        images: data.images?.map((img: string) => img.trim()) || [],
      };
      await createPost(payload);
      closeModal();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    getMyPosts(1, 6, "");
  }, []);

  useEffect(() => {
    if (!posts.hasMore || loading.get("getMyPosts") || posts.docs.length >= posts.total) return;

    console.log("Setting up observer for pagination");
    console.log(posts.hasMore, loading.get("getMyPosts"));
    console.log("Current page:", page);
    console.log("Total posts:", posts.total);
    console.log("Posts on current page:", posts.docs.length);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && posts.hasMore) {
          const nextPage = page + 1;
          setPage(nextPage);
          getMyPosts(nextPage, 6, "");
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [page, loading]);

  return (
    <div className="space-y-4 h-full overflow-y-auto">
      {posts.docs.map((post) => (
        <PostCard
          key={post.id}
          author={{
            name: post.user?.name || "Unknown",
            avatar: post.user?.profileImg || "https://i.pravatar.cc/150?img=3",
          }}
          date={new Date(post.createdAt).toLocaleDateString()}
          title={post.title}
          description={post.content}
          images={post.images.map((img) => img.imageUrl)}
        />
      ))}

      <div ref={observerRef} className="h-10 flex justify-center items-center">
        {loading.get("getMyPosts") && (
          <span className="text-gray-500">Loading more posts...</span>
        )}
      </div>

      <CreatePostModal
        open={modalType === "post"}
        onClose={closeModal}
        onSubmit={handlePostSubmit}
        setOpen={() => {
          openModal("post");
        }}
      />
    </div>
  );
};

export default PostsPage;
