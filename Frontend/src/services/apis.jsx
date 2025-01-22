const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authEndPoints = {

    AUTH_LOGIN_API: BASE_URL + `/api/v1/auth/login`,
    AUTH_SIGNUP_API: BASE_URL + `/api/v1/auth/signup`
}