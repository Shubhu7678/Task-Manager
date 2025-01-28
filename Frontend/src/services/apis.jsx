const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authEndPoints = {
       
    SEND_OTP_API : BASE_URL + '/api/v1/auth/sendOtp',
    AUTH_LOGIN_API: BASE_URL + `/api/v1/auth/login`,
    AUTH_SIGNUP_API: BASE_URL + `/api/v1/auth/signup`,
    SEND_URL_FOR_PASSWORD_RESET_API: BASE_URL + `/api/v1/auth/sendUrlForPasswordReset`,
    RESET_PASSWORD_API: BASE_URL + `/api/v1/auth/resetPassword`
}

export const taskEndPoints = {
    
    ADD_TASK_API: BASE_URL + `/api/v1/task/addTask`,
    GET_ALL_TASKS_DETAILS: BASE_URL + `/api/v1/task/getAllTasksDetails`,
    GET_TASK_BY_TASK_ID: BASE_URL + `/api/v1/task/getTaskByTaskId`,
    EDIT_TASK_API: BASE_URL + `/api/v1/task/editTask`,
    DELETE_TASK_API: BASE_URL + `/api/v1/task/deleteTask`,   
}