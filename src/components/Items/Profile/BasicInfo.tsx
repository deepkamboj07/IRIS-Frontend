import { Skeleton } from "antd";
import { Card } from "../../../Wrapper/Card";
import {
  EnvironmentOutlined,
  EditOutlined,
  ApartmentOutlined,
  ClusterOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";

interface BasicInfoProfileProps {
  college?: string;
  company?: string;
  location?: string;
  skills?: string[];
  onEdit?: () => void;
  loading?: boolean;
}

const BasicInfo: React.FC<BasicInfoProfileProps> = ({
  college = "N/A",
  company = "N/A",
  location = "N/A",
  skills = [],
  onEdit,
  loading = false,
}) => {



  return (
    <Card className="p-4 rounded-lg shadow-sm">
      {/* Header */}
      {
        loading ? (
          <Skeleton active paragraph={{ rows: 5 }} title={false} />
        ) :
        <>
        <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 text-sm">Basic Info</h3>
        <EditOutlined
          className="text-gray-500 cursor-pointer hover:text-blue-500"
          onClick={onEdit}
        />
      </div>
      <div className="space-y-2 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <ApartmentOutlined />
          <span>{college}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClusterOutlined />
          <span>{company}</span>
        </div>
        <div className="flex items-center gap-2">
          <EnvironmentOutlined />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2">
          <AppstoreAddOutlined />
          <span>{skills.length > 0 ? skills.join(", ") : "No skills listed"}</span>
        </div>
      </div>
        </>
      }
    </Card>
  );
};

export default BasicInfo;
