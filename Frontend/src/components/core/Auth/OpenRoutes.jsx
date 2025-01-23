import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"


const OpenRoutes = () => {
 
    const { token } = useSelector((state) => state.auth);

    if (token) {
        return <Navigate to="/" />
    } else { 
        return <Outlet />
    }
}

export default OpenRoutes