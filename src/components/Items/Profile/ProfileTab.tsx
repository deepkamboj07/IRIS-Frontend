import { useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const tabs = ["Your Posts", "Saved", "Photos"];

interface ProfileTabsProps {
  onTabChange?: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ onTabChange }) => {
  const [active, setActive] = useState("Your Posts");

  const handleClick = (tab: string) => {
    setActive(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="flex space-x-6 mt-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleClick(tab)}
          className={`pb-1 cursor-pointer border-b-3 font-medium text-sm ${
            active === tab
              ? "text-black border-blue-500 font-bold"
              : "text-gray-600 border-white "
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
