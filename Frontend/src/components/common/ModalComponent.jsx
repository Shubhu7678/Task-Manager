
import AddTask from "../core/Dashboard/AddTask"

const ModalComponent = ({setIsModalOpen}) => {
    return (
      <>
      <div className="fixed top-0 left-0 w-full h-screen opacity-70 bg-black"></div>
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
                <AddTask setIsModalOpen={setIsModalOpen } />
      </div>
      </>
  )
}

export default ModalComponent