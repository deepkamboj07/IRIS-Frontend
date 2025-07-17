import { Skeleton } from "antd";

interface StatItemProps {
  label: string;
  value: number;
  loading?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ label, value,loading }) => {
  return (
    <div className="">
      <div className="text-black text-sm">{label}</div>
      {
        loading ? (
          <Skeleton
           active paragraph={{ rows: 1, width: "100%" }} title={false} />
        ):
              <div className="text-black font-semibold text-md">{value}</div>
      }
      
    </div>
  );
};

export default StatItem;
