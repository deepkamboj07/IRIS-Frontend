import { MoreOutlined } from "@ant-design/icons";
import PostImageGrid from "./PostImageGrid";
import PostActions from "./PostActions";
import AvatarProfile from "../../AvtarProfile";

interface PostCardProps {
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  title: string;
  description: string;
  images?: string[];
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  date,
  title,
  description,
  images = [],
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <AvatarProfile
            src={author.avatar}
            alt={author.name}
            width="w-10"
            height="h-10"
            className="rounded-full"
            fallbackText={author.name}  
          />
          <div>
            <div className="font-medium text-sm text-black">{author.name}</div>
            <div className="text-xs text-gray-400">{date}</div>
          </div>
        </div>
        <MoreOutlined className="text-gray-400 text-lg cursor-pointer" />
      </div>

      <div className="text-sm text-black font-semibold mb-1">{title}</div>
      <p className="text-sm text-gray-700">{description}</p>

 
      <PostImageGrid images={images} />


      <PostActions />
    </div>
  );
};

export default PostCard;
