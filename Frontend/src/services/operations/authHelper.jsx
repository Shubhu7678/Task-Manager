
import toast from 'react-hot-toast';
import { authEndPoints } from '../apis';
import axios from 'axios';
import { setUser, setToken } from '../../slices/authSlice';

const { SEND_OTP_API,AUTH_LOGIN_API, AUTH_SIGNUP_API } = authEndPoints;


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
        toast.error("Error occured while logging in user");
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