import Task from '../models/task.js';
import User from '../models/user.js';

export const addTask = async (req, res) => { 

    try {

        const { title, description } = req.body;
        const userId = req.user._id;

        if (!userId) {

            return res.status(401).json({
                success: false,
                message: "Access denied, you are not authenticated"
            })
        }

        if (!title || !description) { 

            return res.status(400).json({

                success: false,
                message: "Please enter all fields"
            })
        }

        const newTask = await Task.create({
            title,
            description
        });

        if (!newTask) { 

            return res.status(400).json({

                success: false,
                message: "Task not created"
            })
        }

        await User.findByIdAndUpdate(userId,
            {
                $push: { tasks: newTask._id }
            }
        );

        return res.status(200).json({

            success: true,
            message: 'Task created successfully',
            data : newTask
        })
        
    } catch (error) { 

        console.log("Error occured in addTask : ", error);
        return res.status(500).json({

            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

export const getAllTasksDetails = async (req, res) => { 

    try {
           
        const userId = req.user._id;

        if (!userId) { 

            return res.status(401).json({

                success: false,
                message: "Access denied, you are not authenticated"
            })
        }
        const UserDetails = await User.findById(userId).populate('tasks');
        const tasks = UserDetails.tasks

        return res.status(200).json({

            success: true,
            message: "All tasks",
            data: tasks
        })

    } catch (error) { 

        return res.status(500).json({

            success: false,
            message: "Internal server error",
        })
    }
}

export const getTaskByTaskId = async (req, res) => { 

    try {
           
        const { taskId } = req.params;
        if (!taskId) { 

            return res.status(400).json({

                success: false,
                message: "Please provide task id"
            })
        }

        const taskDetails = await Task.findById(taskId);

        if (!taskDetails) {
            
            return res.status(404).json({
                
                success: false,
                message: "Task not found"
            })
        }

        return res.status(200).json({
            
            success: true,
            message: "Task details",
            data: taskDetails
        })

    } catch (error) { 

        return res.status(500).json({

            success: false,
            message: "Internal server error",
        })
    }
}

export const editTask = async (req, res) => { 
    
    try {

        const { taskId } = req.params;
        const { title, description, important, completed } = req.body;

        if (!taskId) { 

            return res.status(400).json({

                success: false,
                message: "Please provide task id",
            })
        }

        const taskExist = await Task.findById(taskId);

        if (!taskExist) { 

            return res.status(401).json({

                success: false,
                message: "Task not found",
            })
        }

        if (title) { 

            taskExist.title = title;
        }
        if (description) {
            
            taskExist.description = description;
        }
        if (important !== undefined) {
             
            taskExist.important = important;
        } 
        if (completed !== undefined) {
            
            taskExist.completed = completed;
        }

        const updatedTask = await taskExist.save();

        return res.status(200).json({

            success: true,
            message: "Task updated successfully",
            data: updatedTask
        })


    } catch (error) { 


        return res.status(500).json({

            success: true,
            message: "Internal server error",
            error : error.message
        })
    }

}

export const deleteTask = async (req, res) => { 

    try {
           
        const { taskId } = req.params;
        const userId = req.user._id;

        if (!userId) { 

            return res.status(401).json({

                success: false,
                message: "Access denied, you are not authenticated"
            })
        }

        if (!taskId) {
            
            return res.status(400).json({

                success: false,
                message: "Please provide task id"
            })
        }

        const taskExist = await Task.findById(taskId);

        if (!taskExist) { 

            return res.status(404).json({

                success: false,
                message: "Task not found"
            })
        }

        await taskExist.remove();

        await User.findByIdAndUpdate(userId, {

             $pull : {tasks : taskExist._id}
        })

        return res.status(200).json({

            success: true,
            message: "Task deleted successfully",
            data : taskExist
        })

    } catch (error) { 

        return res.status(500).json({

            success: false,
            message: "Internal server error",
            error : error.message
        })
    }
}

