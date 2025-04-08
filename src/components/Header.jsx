import { FaSearch, FaBell, FaQuestion } from 'react-icons/fa';
import Avatar from "../assets/images/Avatar 313.png";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

const Header = () => {
  const location = useLocation();

  const pageTitle = useMemo(() => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/projects":
        return "Projects";
      case "/teams":
        return "Teams";
      case "/analytics":
        return "Analytics";
      case "/messages":
        return "Messages";
      case "/integrations":
        return "Integrations";
      default:
        return "Dashboard";
    }
  }, [location.pathname]);

  return (
    <div className="top-15 z-40 w-full bg-white border-b border-gray-300">
      <header className="p-4 flex items-center justify-between">
        {/* Bên trái */}
        <h1 className="text-xl font-bold text-pink-800">{pageTitle}</h1>

        {/* Bên phải */}
        <div className="flex items-center gap-4">
          {/* Ô tìm kiếm*/}
          <div className="relative w-60">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-3 py-1.5 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Các icon khác */}
          <FaBell className="text-gray-600 cursor-pointer" onClick={() => alert("Chức năng sẽ sớm ra mắt!")} />
          <FaQuestion className="text-gray-600 cursor-pointer" onClick={() => alert("Chức năng sẽ sớm ra mắt!")} />
          <img src={Avatar} alt="User avatar" className="w-8 h-8 rounded-full object-cover" onClick={() => alert("Chức năng sẽ sớm ra mắt!")} />
        </div>
      </header>
    </div>
  );
};

export default Header;
