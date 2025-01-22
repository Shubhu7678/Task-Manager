import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './components/core/Dashboard/UserDashoard';

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/user-dashboard"/>} />
        <Route element={<Dashboard/>}>
          <Route path="/dashboard/user-dashboard" element={<UserDashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
       </Routes>
    </>
  )
}

export default App