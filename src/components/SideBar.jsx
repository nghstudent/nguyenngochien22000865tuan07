import { NavLink } from "react-router-dom";
import { FaTh, FaFolder, FaUsers, FaChartBar, FaEnvelope } from "react-icons/fa";
import { IoCode } from "react-icons/io5";
import clsx from "clsx";
import Logo from "../assets/images/Image 1858.png";
import Group from "../assets/images/Group.png";

const menuItems = [
  { icon: <FaTh />, label: "Dashboard", path: "/dashboard" },
  { icon: <FaFolder />, label: "Projects", path: "/projects" },
  { icon: <FaUsers />, label: "Teams", path: "/teams" },
  { icon: <FaChartBar />, label: "Analytics", path: "/analytics" },
  { icon: <FaEnvelope />, label: "Messages", path: "/messages" },
  { icon: <IoCode />, label: "Integrations", path: "/integrations" },
];

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white border border-gray-300 shadow-sm rounded-md flex flex-col sticky top-0">
      {/* Logo */}
      <div className="flex items-center justify-center py-4 border-b border-gray-200">
        <img src={Logo} alt="Logo" className="h-10" />
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map(({ icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            // className={({ isActive }) =>
            //   clsx(
            //     "flex items-center px-4 py-2 rounded-md transition",
            //     isActive
            //       ? "bg-rose-600 text-white font-semibold"
            //       : "text-gray-700 hover:bg-gray-100"
            //   )
            // }
            className={({ isActive }) =>
              clsx(
                'flex items-center rounded transition-all duration-200',
                isActive
                  ? 'bg-rose-600 text-white font-semibold'
                  : 'text-gray-700 hover:bg-gray-100',
                'px-4 py-4'
              )
            }
            
          >
            <span className="mr-4">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Advertisement */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <img src={Group} alt="Ad" className="mx-auto w-24 mb-3" />
          <h3 className="text-sm font-semibold">V2.0 IS AVAILABLE</h3>
          <button className="mt-2 text-sm px-3 py-1 border rounded hover:bg-gray-100">
            Try now
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
