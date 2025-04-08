import { FaSearch, FaBell, FaQuestion } from 'react-icons/fa';
import Avatar from "../assets/images/Avatar 313.png";

const Header = () => {
  return (
    <div className="sticky top-0 z-40 w-full bg-white border-b border-gray-300">
      <header className="p-4 flex items-center justify-between">
        {/* Bên trái */}
        <h1 className="text-xl font-bold text-pink-800">Dashboard</h1>

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
          <FaBell className="text-gray-600 cursor-pointer" />
          <FaQuestion className="text-gray-600 cursor-pointer" />
          <img src={Avatar} alt="User avatar" className="w-8 h-8 rounded-full object-cover" />
        </div>
      </header>
    </div>
  );
};

export default Header;
