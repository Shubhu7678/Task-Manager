
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { sendUrlForPasswordReset } from "../services/operations/authHelper";

const ForgotPassword = () => {

    const { handleSubmit, register, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        console.log(data);
        try {

            await sendUrlForPasswordReset(data.email);
        } catch (error) {

            console.log("Error occured in forgot password : ", error);
        }
    }
    return (
        <div className="w-full h-screen  bg-gray-900 flex items-center justify-center">
            <div className="max-w-lg w-full p-8 bg-gray-700 rounded-lg shadow-lg">
                <h1 className="text-3xl text-white font-bold text-center">Forgot Password</h1>
                <div className="text-white mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400">Email</label>
                            <input
                                type="email"
                                className="mt-1 px-2 py-3 bg-gray-800 block w-full shadow-sm rounded-md text-sm"
                                name="email"
                                placeholder="Enter your email"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="mb-2">
                            <button type="submit" className="w-full px-4 py-3 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none">Submit</button>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                You do not have an account? <NavLink to="/signup" className="text-blue-600 hover:text-blue-700 transition duration-300 underline">Register</NavLink>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword