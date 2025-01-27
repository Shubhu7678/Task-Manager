import { NavLink, useNavigate } from "react-router-dom"
import OtpInput from "react-otp-input";
import { useState } from "react";
import toast from 'react-hot-toast'
import { registerUser } from "../services/operations/authHelper";
import { useSelector } from "react-redux";

const VerifyEmail = () => {

    const [otp, setOtp] = useState('');
    const { signedData } = useSelector((state) => state.otp);
    const navigate = useNavigate();
    const handleOnClick = async () => {

        if (otp.length !== 6) {

            toast.error("Please enter a valid OTP");
            setOtp('');
            return;
        }

        try {
            const payload = {...signedData, otp};
            await registerUser(payload, navigate);

        } catch (error) {

            console.log("Error occured while verifying otp", error);
        }


    }

    return (
        <div className="w-full h-screen  bg-gray-900 flex items-center justify-center">
            <div className="max-w-lg w-full p-8 bg-gray-700 rounded-lg shadow-lg">
                <h1 className="text-3xl text-white font-bold text-center">Verify Email</h1>
                <div className="text-white mt-2">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mb-4 flex justify-center items-center text-black">
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input  {...props} />}
                                inputStyle={{
                                    border: "none",
                                    outline: "none",
                                    fontSize: "1.5rem",
                                    padding: "0.5rem",
                                    borderRadius: "0.5rem",
                                    color: "black",
                                    width: "3rem",
                                    height: "3rem",
                                    textAlign: "center",
                                    backgroundColor: "gray",
                                }}
                            />
                        </div>
                        <div className="mb-2">
                            <button onClick={handleOnClick} type="button" className="w-full px-4 py-3 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none">Verify</button>
                        </div>
                        <div>
                            You do not have an account? <NavLink to="/signup" className="text-blue-600 hover:text-blue-700 transition duration-300 underline">Register</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail