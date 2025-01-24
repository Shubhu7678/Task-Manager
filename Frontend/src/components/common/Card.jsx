import { FaRegHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import ModalComponent from "./ModalComponent";
import { useState } from "react";

const Card = ({ flag, task }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <div className="bg-gray-700 flex flex-col text-white p-4 rounded-lg shadow-md">
                {flag ? (
                    <>
                
                            <h2 className="text-xl font-semibold mb-4">{task?.title}</h2>
                            <p className="text-base flex-grow">{task?.description}</p>
                            <div className="flex justify-between items-center mt-4 ">
                                <button className="bg-orange-600 hover:bg-orange-500 cursor-pointer transition duration-300 text-white px-4 py-2 rounded-md">
                                    Incomplete
                                </button>
                                <FaRegHeart className="text-xl hover:text-gray-300 cursor-pointer transition duration-300 " />
                                <FaEdit className="text-xl hover:text-gray-300 cursor-pointer transition duration-300 " />
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