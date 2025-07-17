interface PostImageGridProps {
  images: string[];
}

const PostImageGrid: React.FC<PostImageGridProps> = ({ images }) => {
  if (!images.length) return null;

  return (
    <div className="grid grid-cols-2 gap-2 mt-4 overflow-hidden rounded-lg">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Post image ${idx + 1}`}
          className="w-full h-[200px] object-cover rounded-md"
        />
      ))}
    </div>
  );
};

export default PostImageGrid;
