import Board from "../../components/Items/Tasks/Board";
import { FileTextOutlined } from '@ant-design/icons';
const Tasks = () => {
    return (
         <div className="bg-gray-50 min-h-screen">
            <div className="p-4 space-x-2 flex">
                <FileTextOutlined style={{ fontSize: '18px', color: '#555' }} />
                <div className="text-xl font-semibold">
                    Project Zero
                </div>
            </div>
            <Board />
        </div>
    );
}

export default Tasks;