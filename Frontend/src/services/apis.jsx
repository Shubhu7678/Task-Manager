const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authEndPoints = {

    AUTH_LOGIN_API: BASE_URL + `/api/v1/auth/login`,
    AUTH_SIGNUP_API: BASE_URL + `/api/v1/auth/signup`
}

export const taskEndPoints = {
    
    ADD_TASK_API: BASE_URL + `/api/v1/task/addTask`,
    GET_ALL_TASKS_DETAILS: BASE_URL + `/api/v1/task/getAllTasksDetails`,
    GET_TASK_BY_TASK_ID: BASE_URL + `/api/v1/task/getTaskByTaskId`,
    EDIT_TASK_API: BASE_URL + `/api/v1/task/editTask`,
    DELETE_TASK_API: BASE_URL + `/api/v1/task/deleteTask`,   
}