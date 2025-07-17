import { Skeleton } from "antd";
import { Card } from "../../../Wrapper/Card"
import { EditOutlined } from "@ant-design/icons";
interface SummaryProfileProps {
  onEdit?: () => void;
  summary: string;
  loading?: boolean;
}

const SummaryProfile: React.FC<SummaryProfileProps> = ({ onEdit, summary, loading }) => {
    return (
         <Card className="p-4 rounded-lg shadow-sm">
            {
                loading ? (
                    <Skeleton active paragraph={{ rows: 3 }} title={false} />
                ):
                (
                    <>
                    <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800 text-sm">Summary</h3>
                <EditOutlined
                className="text-gray-500 cursor-pointer hover:text-blue-500"
                onClick={onEdit}
                />
            </div>
            {/* Info Items */}
            <div className="space-y-2 text-gray-700 text-sm">
                <div className="flex items-center gap-2">
                    <span>{summary || "No summary provided"}</span>
                </div>
            </div>
                    </>
                )
            }
        </Card>
    )
}
export default SummaryProfile;