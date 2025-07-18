import ProjectTable from "../../components/Items/project/ProjectTable";
import RegisterProjectModal from "../../components/Modal/CreateProjectModal";
import { useUIStore } from "../../store/useUIStore";

const Project = () => {

    const { closeModal,modalType} = useUIStore();

    return (
         <div className="bg-gray-50 min-h-screen">
            <div className="p-6">
            <h3 className="text-base font-semibold mb-4">Projects</h3>
                <ProjectTable />
            </div>

            <RegisterProjectModal
                isOpen={modalType === 'project'}
                close={closeModal}
            />

        </div>


    );
}

export default Project;