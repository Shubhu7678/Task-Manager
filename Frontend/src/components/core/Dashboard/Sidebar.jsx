
import { SidebarData } from "../../../utils/SidebarData"
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="w-[330px] h-full bg-gray-800">
      <div className="w-full h-full flex flex-col gap-2 overflow-y-auto p-4">
        {
          SidebarData.map((data, index) => (
            <NavLink to={data?.path} key={index} className={`px-2 py-3 ${pathname === data?.path ? 'bg-teal-600' : ''} text-white rounded-md`}>
              <p className="text-lg flex gap-2 items-center">
                {data?.icon}
                <span>{ data?.title }</span>
              </p>
            </NavLink>
          ))
        }
      </div>
    </div >
  )
}

export default Sidebar