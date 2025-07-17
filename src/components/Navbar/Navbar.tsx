import SearchBar from "../Inputs/SearchBar";
import { BellOutlined, LoadingOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from "antd"; // Optional if you're using Ant Design buttons
import { usePostStore } from "../../store/usePostStore";

interface NavbarProps {
  collapsed: boolean;
  toggle: () => void;
  onClickOnCreate: () => void;
}

const Navbar: React.FC<NavbarProps> = ({  onClickOnCreate }) => {

  const {loading} = usePostStore();

  return (
    <div className="navbar h-[10vh] w-full flex items-center px-6 bg-white border-b border-gray-200 relative">
      
      {/* Center Search Bar */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <SearchBar
          placeholder="Search for anything"
          onSearch={() => {}}
          className="w-[300px] md:w-[400px]"
        />
      </div>

      {/* Right Icons */}
      <div className="ml-auto flex items-center gap-4">
        <BellOutlined className="text-gray-600 text-xl cursor-pointer" />
        <Button
          type="default"
          icon={
            loading.get('createPost') ? (
              <LoadingOutlined spin className=" text-gradient-primary" />
            ) : (
              <PlusOutlined />
            )
          }
          className="text-blue-600 border-blue-600"
          onClick={onClickOnCreate}
        >
          {loading.get('createPost') ? 'Creating...' : 'Create'}
        </Button>
        <Button>
          <LogoutOutlined
            className="text-gray-600 text-xl cursor-pointer"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
          />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
