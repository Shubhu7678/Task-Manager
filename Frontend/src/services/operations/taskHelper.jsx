
import { taskEndPoints } from "../apis";
import { toast } from "react-hot-toast";
import axios from "axios";
const { ADD_TASK_API,
    GET_ALL_TASKS_DETAILS,
    GET_TASK_BY_TASK_ID,
    EDIT_TASK_API,
    DELETE_TASK_API,
   
} = taskEndPoints;

export const addTask = async (data, token) => {

    let result = [];
    const toastId = toast.loading('Loading...');
    try {

        const response = await axios.post(ADD_TASK_API, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.data

    } catch (error) {

        console.log("Error occured in addTask : ", error);
        toast.error("Error occured in add Task");
    }

    toast.dismiss(toastId);
    return result;
}

export const getAllTasksData = async (token) => {

    const toastId = toast.loading('Loading...');
    let result = [];
    try {

        const response = await axios.get(GET_ALL_TASKS_DETAILS, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.data;

    } catch (error) {

        console.log("Error occured in getAllTasksData : ", error);
        toast.error("Error occured in fetching tasks");
    }

    toast.dismiss(toastId);
    return result;
}
export const getTaskbyTaskId = async (taskId, token) => {

    const toastId = toast.loading('Loading...');
    let result = [];
    try {

        const response = await axios.get(GET_TASK_BY_TASK_ID + `/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.data;

    } catch (error) {

        console.log("Error occured in getAllTasksData : ", error);
        toast.error("Error occured in fetching tasks");
    }

    toast.dismiss(toastId);
    return result;
}
export const updateTaskData = async (taskId, data, token) => {

    const toastId = toast.loading('Loading...');
    let result = [];
    try {

        const response = await axios.put(EDIT_TASK_API + `/${taskId}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.data;

    } catch (error) {

        console.log("Error occured in getAllTasksData : ", error);
        toast.error("Error occured in fetching tasks");
    }

    toast.dismiss(toastId);
    return result;
}
export const deleteTaskData = async (taskId, token) => {

    const toastId = toast.loading('Loading...');
    let result = [];
    try {

        const response = await axios.delete(DELETE_TASK_API + `/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (!response.data.success) {

            throw new Error(response.data.message);
        }

        result = response.data.data;

    } catch (error) {

        console.log("Error occured in getAllTasksData : ", error);
        toast.error("Error occured in fetching tasks");
    }

    toast.dismiss(toastId);
    return result;
}