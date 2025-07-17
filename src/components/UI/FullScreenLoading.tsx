import { Spin } from "antd";

const FullScreenLoading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <Spin size="large" tip="Loading..." />
        </div>
    );
};

export default FullScreenLoading;
