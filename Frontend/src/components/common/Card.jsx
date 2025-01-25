import { FaRegHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import ModalComponent from "./ModalComponent";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTask, setEditTask, setAllTasks } from "../../slices/taskSlice";
import toast from "react-hot-toast";
import { getTaskbyTaskId, updateTaskData } from "../../services/operations/taskHelper";


const Card = ({ flag, task }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { allTasks } = useSelector((state) => state.task);

    const handleImportantTask = async (taskId, isImportant) => {

        try {

            const formData = {};

            formData.important = !isImportant;

            const result = await updateTaskData(taskId, formData, token);
            if (result) {

                dispatch(setAllTasks(allTasks.map((tk) => tk?._id === taskId ? result : tk)));
            }

        } catch (error) {

            console.log("Error occured while editing task", error);
        }
    }

    const handleCompletedTask = async (taskId, isCompleted) => {

        try {

            const formData = {};
            formData.completed = !isCompleted;

            const result = await updateTaskData(taskId, formData, token);
            if (result) {

                dispatch(setAllTasks(allTasks.map((tk) => tk?._id === taskId ? result : tk)));
            }

        } catch (error) {

            console.log("Error occured while editing task", error);
        }
    }

    const handleEditTask = async (taskId) => {

        setIsModalOpen(true);
        dispatch(setEditTask(true));
        try {

            const result = await getTaskbyTaskId(taskId, token);
            if (result) {

                dispatch(setTask(result));
                console.log("Task fetched successfully : ", result);
            }

        } catch (error) {

            console.log("Error occured while editing task", error);
            toast.error("Error occured while editing task");
        }

    }
    return (
        <>
            <div className="bg-gray-700 flex flex-col text-white p-4 rounded-lg shadow-md">
                {flag ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">{task?.title}</h2>
                        <p className="text-base flex-grow">{task?.description}</p>
                        <div className="flex justify-between items-center mt-4 ">
                            {task?.completed ?
                                (
                                    <button onClick={() => handleCompletedTask(task?._id, task?.completed)} className="bg-green-600 hover:bg-green-500 cursor-pointer transition duration-300 text-white px-4 py-2 rounded-md">
                                        Completed
                                    </button>
                                )
                                :
                                (
                                    <button onClick={() => handleCompletedTask(task?._id, task?.completed)} className="bg-orange-600 hover:bg-orange-500 cursor-pointer transition duration-300 text-white px-4 py-2 rounded-md">
                                        Incomplete
                                    </button>
                                )
                            }
                            {task?.important ? (
                                <FaHeart onClick={() => handleImportantTask(task?._id, task?.important)} className="text-xl text-red-400 hover:text-gray-300 cursor-pointer transition duration-300 " />
                            ) : (
                                <FaRegHeart onClick={() => handleImportantTask(task?._id, task?.important)} className="text-xl text-red-400 hover:text-gray-300 cursor-pointer transition duration-300 " />
                            )}
                            <FaEdit onClick={() => handleEditTask(task?._id)} className="text-xl hover:text-gray-300 cursor-pointer transition duration-300 " />
                            <FaRegTrashCan className="text-xl hover:text-gray-300 cursor-pointer transition duration-300 " />
                        </div>
                    </>
                ) : (
                    <>
                        <div onClick={() => setIsModalOpen(true)} className="w-full cursor-pointer h-full flex flex-col items-center justify-center gap-2">
                            <MdAddCircle className="text-5xl hover:text-gray-300 transition duration-300" />
                            <p className="text-xl font-semibold">Add Task</p>
                        </div>
                    </>
                )}
            </div>
            {isModalOpen && (
                <ModalComponent setIsModalOpen={setIsModalOpen} />
            )}
        </>
    )
}

export default Card