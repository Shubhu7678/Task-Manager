import { LuLayoutDashboard } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { MdOutlineAddTask } from "react-icons/md";
import { TbLabelImportant } from "react-icons/tb";

export const SidebarData = [

    {
        title: 'All Tasks',
        path: '/dashboard/user-dashboard',
        icon : (<LuLayoutDashboard />)
    },
    {
        title: 'Important tasks',
        path: '/dashboard/task-important',
        icon : (<TbLabelImportant />)
    },
    {
        title: 'Completed tasks',
        path: '/dashboard/task-completed',
        icon : (<MdOutlineAddTask />)
    },
    {
        title: 'Incompleted tasks',
        path: '/dashboard/task-incompleted',
        icon : (<FaTasks />)
    },
    
];