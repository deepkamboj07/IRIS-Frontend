import { HeartOutlined, HeartFilled, MessageOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useState } from "react";

const PostActions: React.FC = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex gap-6 pt-4 text-gray-500 text-sm items-center">
      <button
        onClick={() => setLiked((prev) => !prev)}
        className={`flex items-center gap-1 transition ${
          liked ? "text-red-500" : "hover:text-black"
        }`}
      >
        {liked ? <HeartFilled /> : <HeartOutlined />}
        Like
      </button>
      <button className="flex items-center gap-1 hover:text-black transition">
        <MessageOutlined /> Comment
      </button>
      <button className="flex items-center gap-1 hover:text-black transition">
        <ShareAltOutlined /> Share
      </button>
    </div>
  );
};

export default PostActions;
