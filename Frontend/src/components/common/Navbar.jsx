import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaBeerMugEmpty } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/operations/authHelper';

const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, user } = useSelector((state) => state.auth);

    const handleLogout = () => {

        document.getElementById('my_modal_3').close();
        logout(navigate, dispatch);
    }
    return (
        <>
            <div className="navbar w-full h-[64px] bg-teal-600 text-gray-50">
                <div className="w-full px-8 py-1">
                    <div className="flex w-full items-center justify-between">
                        <NavLink className="text-3xl">
                            <div className="flex items-center gap-2">
                                <span className="text-3xl"><FaBeerMugEmpty /></span>
                                <span className="text-3xl font-serif">TMS</span>
                            </div>
                        </NavLink>
                        <div className="flex items-center gap-4">
                            {
                                token ? (
                                    <>
                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                <div className="w-9 rounded-full">
                                                    <img
                                                        className="object-cover"
                                                        alt="Tailwind CSS Navbar component"
                                                        src={user?.profileImage}
                                                    />
                                                </div>
                                            </div>
                                            <ul
                                                tabIndex={0}
                                                className="menu menu-sm dropdown-content bg-base-100 text-gray-800 rounded-box z-[4] mt-3 w-52 p-2 shadow">
                                                <li>
                                                    <NavLink to="/dashboard/my-profile" className="hover:bg-gray-100 p-2 rounded-md">
                                                        Profile
                                                        <span className="badge">new</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/dashboard/setting" className="hover:bg-gray-100 p-2 rounded-md">
                                                        Settings
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/dashboard/my-blogs" className="hover:bg-gray-100 p-2 rounded-md">
                                                        Blogs
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <button className=" hover:bg-gray-100 p-2 rounded-md" onClick={() => document.getElementById('my_modal_3').showModal()}>Logout</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                ) :
                                    (
                                        <>
                                            <NavLink to="/login" className="px-3 py-2 bg-gray-600 text-md rounded-md hover:text-yellow-400 duration-300">Login</NavLink>
                                            <NavLink to="/signup" className="px-3 py-2 bg-gray-600 text-md rounded-md hover:text-yellow-400 duration-300">SignIn</NavLink>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal for logout by daisyUI */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box text-center bg-teal-900">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm text-gray-400 btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-semibold mt-2 text-lg text-gray-400 text-center">Are you sure you want to logout ?</h3>
                    <div className="mt-4 flex gap-4 items-center justify-center">

                        <button onClick={() => handleLogout()} className="px-4 py-3  bg-gray-800 text-white text-md rounded-md">Logout</button>
                        <button onClick={() => document.getElementById('my_modal_3').close()} className="px-4 py-3  bg-gray-800 text-white text-md rounded-md hover:text-yellow-200 duration-300">Cancel</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Navbar