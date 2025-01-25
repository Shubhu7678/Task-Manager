
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { addTask, updateTaskData } from '../../../services/operations/taskHelper';
import { setAllTasks, setEditTask, setTask } from '../../../slices/taskSlice';

const TaskForm = ({ setIsModalOpen }) => {

    const { register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const { editTask, allTasks, task } = useSelector((state) => state.task);
    const { token } = useSelector((state) => state.auth);

    if (editTask) {

        setValue('title', task?.title);
        setValue('description', task?.description);
    }

    const isFormChanged = async (data) => {

        if (data.title !== task?.title || data.description !== task?.description) {

            return true;
        } else {

            return false;
        }
    }

    const onSubmit = async (data) => {

        if (editTask) {

            const formChanged = isFormChanged(data);
            if (formChanged) {

                const formData = {};
                try {

                    if (data.title !== task.title) {

                        formData.title = data.title;
                    }

                    if (data.description !== task.description) {

                        formData.description = data.description;
                    }

                    const result = await updateTaskData(task._id, formData, token);
                    if (result) {

                        dispatch(setAllTasks(allTasks.map((tk) => tk?._id === task._id ? result : tk)));
                        setIsModalOpen(false);
                        dispatch(setEditTask(false));
                        dispatch(setTask(null));

                    }


                } catch (error) {

                    console.log("Error occured  : ", error);
                }
            }
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