import Navbar from "../components/common/Navbar"
import Sidebar from "../components/core/Dashboard/Sidebar"
import { Outlet } from "react-router-dom"


const Dashboard = () => {

    return (
        <div className="w-full h-screen">
            <Navbar />
            <div className="w-full h-[calc(100vh-64px)] flex">
                <Sidebar />
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard