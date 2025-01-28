
import toast from 'react-hot-toast';
import { authEndPoints } from '../apis';
import axios from 'axios';
import { setUser, setToken } from '../../slices/authSlice';

const { SEND_OTP_API,AUTH_LOGIN_API, AUTH_SIGNUP_API,SEND_URL_FOR_PASSWORD_RESET_API,RESET_PASSWORD_API } = authEndPoints;


export const sendOtp = async (email, navigate) => { 

    const toastId = toast.loading('Loading...');
    try {
          
        const response = await axios.post(SEND_OTP_API, { email });

        if (!response.data.success) { 

            throw new Error(response.data.message);
        }

        toast.dismiss(toastId);
        toast.success("Otp sent successfully");
        navigate('/verify-email');

    } catch (error) { 

        console.log("Error occured while sending otp", error);
        toast.dismiss(toastId);
        toast.error(error.response.data.message);
    }
}
export const registerUser = async(data,navigate) => { 

    const toastId = toast.loading('Loading...');
    try {
          
        const response = await axios.post(AUTH_SIGNUP_API, data);
        if (!response.data.success) { 

            throw new Error(response.data.message);
        }
            
        toast.dismiss(toastId);
        navigate("/login");
        toast.success(response.data.message);
        
    } catch (error) { 

        console.log("Error occured while registering user", error);
        toast.dismiss(toastId);
        toast.error(error.response.data.message);
        
    }
}

export const login = async (data,dispatch,navigate) => { 

    const toastId = toast.loading('Loading...');
    try {

        const response = await axios.post(AUTH_LOGIN_API, data);

        if (!response.data.success) {
                
            throw new Error(response.data.message);
        }

        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.data));
        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.data));
        navigate("/");
        toast.dismiss(toastId);
        toast.success(response.data.message);

        
    } catch (error) { 

        console.log("Error occured while logging in user", error);
        toast.error(error.response.data.message);
        toast.dismiss(toastId);
    }
}

export const logout = (navigate,dispatch) => { 

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate("/login");
    toast.success("Logged out successfully");
}

export const sendUrlForPasswordReset = async(email) => { 
        
    const toastId = toast.loading('Loading...');
    try {
            
        const response = await axios.post(SEND_URL_FOR_PASSWORD_RESET_API, { email });
        console.log(response);
        if (!response.data.success) { 

            throw new Error(response.data.message);
        }

        toast.dismiss(toastId);
        toast.success(response.data.message);

    } catch (error) { 

        console.log("Error occured while sending url for password reset", error);
        toast.dismiss(toastId);
        toast.error(error.response.data.message);
    }
}

export const resetPassword = async (userId, data,navigate) => { 

    const toastId = toast.loading('Loading...');
    try {

        const response = await axios.put(RESET_PASSWORD_API + `/${userId}`, data);

        if (!response.data.success) { 

            throw new Error(response.data.message);
        }

        toast.dismiss(toastId);
        toast.success(response.data.message);
        navigate("/login");

    } catch (error) { 

        console.log("Error occured while resetting password", error);
        toast.dismiss(toastId);
        toast.error(error.response.data.message);

    }
}