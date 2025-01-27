import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
// import { registerUser } from '../services/operations/authHelper';
import { setSignedData } from '../slices/otpSlice';
import { sendOtp } from '../services/operations/authHelper';
const Signup = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {

    try {
      // await registerUser(data, navigate); 
      dispatch(setSignedData(data));
      await sendOtp(data.email, navigate);
    } catch (error) {

      console.log("Error occured while registering user", error);
    }

  }

  return (
    <>
      <div className="w-full h-screen  bg-gray-900 flex items-center justify-center">
        <div className="max-w-lg w-full p-8 bg-gray-700 rounded-lg shadow-lg">
          <h1 className="text-3xl text-white font-bold text-center">Register</h1>
          <div className="text-white mt-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">Name</label>
                <input
                  type="text"
                  className="mt-1 px-2 py-3 bg-gray-800 block w-full shadow-sm rounded-md text-sm"
                  placeholder="Enter your name"
                  {...register('name', { required: true })}
                />
                {errors.name && <span className="text-red-500">This field is required</span>}

              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">Email</label>
                <input
                  type="email"
                  className="mt-1 px-2 py-3 bg-gray-800 block w-full shadow-sm rounded-md text-sm"
                  placeholder="Enter your email"
                  {...register('email', { required: true })}
                />
                {errors.email && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-400">Password</label>
                <input
                  type="password"
                  className="mt-1 px-2 py-3 bg-gray-800 block w-full shadow-sm rounded-md text-sm"
                  placeholder="Enter your password"
                  {...register('password', { required: true })}
                />
                {errors.password && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-400">Confirm Password</label>
                <input
                  type="password"
                  className="mt-1 px-2 py-3 bg-gray-800 block w-full shadow-sm rounded-md text-sm"
                  placeholder="Enter your confirm password"
                  {...register('confirmPassword', { required: true })}
                />
                {errors.confirmPassword && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="mb-2">
                <button type="submit" className="w-full px-4 py-3 text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none">Register</button>
              </div>
              <div>
                You have an account? <NavLink to="/login" className="text-blue-600 hover:text-blue-700 transition duration-300 underline">Login</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup;