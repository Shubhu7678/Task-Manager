
import toast from 'react-hot-toast';
import { authEndPoints } from '../apis';
import axios from 'axios';
import { setUser, setToken } from '../../slices/authSlice';

const { AUTH_LOGIN_API, AUTH_SIGNUP_API } = authEndPoints;

export const registerUser = async(data,navigate) => { 

    const toastId = toast.loading('Loading...');
    try {
          
        const response = await axios.post(AUTH_SIGNUP_API, data);

        if (!response.data.success) { 

            throw new Error(response.data.message);
        }
            
        navigate("/login");
        toast.success(response.data.message);
        
    } catch (error) { 

        console.log("Error occured while registering user", error);
        toast.error("Error occured while registering user");
        
    }

    toast.dismiss(toastId);
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