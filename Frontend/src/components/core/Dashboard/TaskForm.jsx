
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { addTask } from '../../../services/operations/taskHelper';
import { setAllTasks } from '../../../slices/taskSlice';

const TaskForm = ({ setIsModalOpen }) => {

    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const { editTask,allTasks } = useSelector((state) => state.task);
    const { token } = useSelector((state) => state.auth);

    const onSubmit = async (data) => {

        if (editTask) {

            console.log("Edit task : ", data);
        } else {

            try {

                const result = await addTask(data, token);
                if (result) { 

                    console.log("Task added successfully : ", result);
                    dispatch(setAllTasks([...allTasks, result]));
                    setIsModalOpen(false);
                }
            } catch (error) { 

                console.log("Error occured  : ", error);
            }
        }
    }

    return (
        <div className="w-full text-white">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full mb-2">
                    <label className="text-gray-300" htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="w-full mt-1 px-2 py-3 bg-gray-800 rounded-md outline-none shadow-md"
                        name="title"
                        placeholder="Enter title"
                        {...register('title', { required: true })}
                    />
                    {errors.title && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="w-full mb-4">
                    <label className="text-gray-300" htmlFor="description">Description</label>
                    <input
                        type="text"
                        className="w-full mt-1 px-2 py-3 bg-gray-800 rounded-md outline-none shadow-md"
                        name="description"
                        placeholder="Enter description"
                        {...register('description', { required: true })}
                    />
                    {errors.description && <span className="text-red-500">This field is required</span>}
                </div>
                <div>
                    <button
                        className="bg-gray-950 text-white px-4 py-2 rounded-md "
                     
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm