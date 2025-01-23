import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const { token } = useSelector((state) => state.auth);

    if (token) {
        return <Outlet />
    } else { 
        return <Navigate to="/login" />
    }

}

export default PrivateRoutes