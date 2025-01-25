
import { useSelector } from "react-redux"
import AddTask from "../core/Dashboard/AddTask"
import EditTask from "../core/Dashboard/EditTask"

const ModalComponent = ({ setIsModalOpen }) => {
  
  const { editTask } = useSelector((state) => state.task);
    return (
      <>
      <div className="fixed top-0 left-0 w-full h-screen opacity-70 bg-black"></div>
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
          {editTask ?
            (
              <EditTask setIsModalOpen={setIsModalOpen} />
            ):
            (
              <AddTask setIsModalOpen={setIsModalOpen } />
            )
           }
                
      </div>
      </>
  )
}

export default ModalComponent