import { useNavigate, useParams } from "react-router-dom";
import Board from "../../../components/Items/Tasks/Board";
import { useEffect } from "react";
import { useProjectStore } from "../../../store/useProjectStore";
import { Skeleton } from "antd";
import { Card } from "../../../Wrapper/Card";
import { useUIStore } from "../../../store/useUIStore";
import TaskModal from "../../../components/Modal/TaskModal";

const Tasks = () => {

    const navigate = useNavigate();
    const {modalType,closeModal} = useUIStore();
    const {fetchProjectById,loading,singleProject,addTaskToProject} = useProjectStore();
    const idQuery = new URLSearchParams(window.location.search);
    const id = idQuery.get('id') || useParams().id;

    useEffect(() => {
        if(!id) {
            navigate("/tasks");
        }
        else{
            fetchProjectById(id);
        }

    }, [id]);

    return (
         <div className="bg-gray-50 min-h-screen">
            <div className="p-6">
            <button onClick={() => navigate(-1)} className="mb-2 text-blue-500 hover:underline">
                <b>Back</b>
            </button>
                {
                    loading ? (
                        <div>
                            <Skeleton.Input active/>
                            <div className="mt-10 flex flex-row gap-4  h-[100vh]">
                                <Card className="w-full">
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                </Card>
                                <Card className="w-full">
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                </Card>
                                <Card className="w-full ">
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                </Card>
                                <Card className="w-full">
                                    <Skeleton active paragraph={{ rows: 4 }} />
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-base font-semibold mb-4">{singleProject?.name}</h3>
                            <Board />
                        </>
                    )
                }
            </div>


            <TaskModal
                visible={modalType === "task"}
                onClose={closeModal}
                onSubmit={async(data) => {
                    console.log(data);
                    await addTaskToProject(data.projectId, {
                        title: data.title,
                        description: data.description || '',
                        taskList:  data.taskList ? data.taskList.map((item: any) => ({ detail: item.detail })) : undefined,
                    });
                }}
                projectId={id || ""}
            />


        </div>


    );
}

export default Tasks;