import TaskForm from "./TaskForm"
import { IoCloseCircleSharp } from "react-icons/io5";

const AddTask = ({setIsModalOpen}) => {
  return (
    <div className="w-[450px] bg-gray-700 p-4 rounded-lg shadow-md">
      <div>
        <div className="w-full flex justify-between items-center mb-4">
          <span className=""></span>
         <h2 className="text-2xl text-white font-semibold">Add Task</h2>
         <IoCloseCircleSharp onClick={() => (setIsModalOpen(false))} className="text-2xl text-gray-300 cursor-pointer" />

        </div>
        <TaskForm setIsModalOpen={setIsModalOpen}/>
      </div>
    </div>
  )
}

export default AddTask