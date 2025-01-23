import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './components/core/Dashboard/UserDashoard';
import ImportantTasks from './components/core/Dashboard/ImportantTasks';
import CompletedTasks from './components/core/Dashboard/CompletedTasks';
import IncompletedTasks from './components/core/Dashboard/IncompletedTasks';
import ProtectedRoutes from './components/core/Auth/PrivateRoutes.jsx';
import OpenRoutes from './components/core/Auth/OpenRoutes';

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/user-dashboard" />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Dashboard />}>
            <Route path="/dashboard/user-dashboard" element={<UserDashboard />} />
            <Route path="/dashboard/task-important" element={<ImportantTasks />} />
            <Route path="/dashboard/task-completed" element={<CompletedTasks />} />
            <Route path="/dashboard/task-incompleted" element={<IncompletedTasks />} />
          </Route>
        </Route>
        <Route element={<OpenRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

      </Routes>
    </>
  )
}

export default App