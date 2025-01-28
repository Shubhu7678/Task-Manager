import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form";
import { resetPassword } from "../services/operations/authHelper";

const ResetPassword = () => {

    const { userId } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {

        console.log(data);
        try {
            
            await resetPassword(userId, data,navigate);

        } catch (error) { 

            console.log("Error occured in reset password : ", error);
        }
    }
    return (
        <div className="w-full h-screen  bg-gray-900 flex items-center justify-center">
            <div className="max-w-lg w-full p-8 bg-gray-700 rounded-lg shadow-lg">
                <h1 className="text-3xl text-white font-bold text-center">Forgot Password</h1>
                <div className="text-white mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400">Password</label>
                            <input
                                type="password"
                                className="mt-1 px-2 py-3 bg-gray-800 block w-full shadow-sm rounded-md text-sm"
                                name="password"
                                placeholder="Enter your password"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="mb-2">
                            <button type="submit" className="w-full px-4 py-3 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword