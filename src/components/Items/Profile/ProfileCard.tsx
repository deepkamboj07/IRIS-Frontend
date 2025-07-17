import { Card } from "../../../Wrapper/Card";
import AvatarProfile from "../AvtarProfile";
import { EditOutlined } from "@ant-design/icons";
import StatItem from "./StatItem";
import ProfileTabs from "./ProfileTab";

interface ProfileCardProps {
  user: {
    name: string;
    username: string;
    image: string;
    followerCount: number;
    followingCount: number;
    postsCount: number;
    savedCount: number;
    photosCount: number;
  };
  className?: string;
  onTabChange?: (tab: string) => void;
  loading?: boolean;
  onEditProfile?: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, className, onTabChange, loading, onEditProfile }) => {
  return (
    <Card className={`rounded-xl ${className} p-6 pb-0`}>
      <div className="flex justify-between items-start flex-wrap gap-4">
        {/* Left Section: Avatar & Info */}
        <div className="flex items-start gap-4">
          <AvatarProfile
            src={user.image}
            alt={user.name}
            width="w-30"
            height="h-30"
            className="rounded-full"
            fallbackText={user.name}
          />
          <div>
            <p className="text-lg font-semibold text-black">{user.name}</p>
            <p className="text-sm text-black">@{user.username}</p>

            <div className="flex space-x-6 mt-4">
              <StatItem label="Followers" value={user.followerCount} loading={loading} />
              <StatItem label="Following" value={user.followingCount} loading={loading} />
              <StatItem label="Posts" value={user.postsCount} loading={loading} />
              <StatItem label="Saved" value={user.savedCount} loading={loading} />
              <StatItem label="Photos" value={user.photosCount} loading={loading} />
            </div>
            <div className="mt-8">
              <ProfileTabs onTabChange={onTabChange} />
            </div>
          </div>
          
        </div>

        {/* Edit Profile Button */}
        <button className="flex items-center text-sm text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-100 transition" onClick={onEditProfile}>
          <EditOutlined className="mr-2" /> Edit Profile
        </button>
      </div>

      {/* Tabs */}
      
    </Card>
  );
};

export default ProfileCard;
