import { useEffect, useState } from "react";
import { FaTh } from "react-icons/fa";
import { IoCartOutline, IoLogoUsd } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

// const StatCard = ({ label, value, icon, percent, color }) => (
//   <div className={`p-5 rounded-xl shadow-md ${color.bg}`}>
//     <div className="flex justify-between items-center">
//       <h4 className="text-lg font-semibold text-gray-700">{label}</h4>
//       <div className={`p-2 rounded-md ${color.iconBg}`}>
//         {icon}
//       </div>
//     </div>
//     <p className="text-2xl font-bold text-gray-900 mt-3 text-left">{value}</p>
//     <p className="text-sm text-green-500 mt-1 text-left">
//       ▲ {percent} period of change
//     </p>
//   </div>
// );

// const Overview = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch("/data/dataThongKe.json")
//       .then((res) => res.json())
//       .then((json) => setData(json[0]))
//       .catch((err) => console.error("Lỗi khi load dữ liệu:", err));
//   }, []);

//   if (!data) return <p className="text-center">Đang tải...</p>;

//   return (
//     <section className="p-6">
//       <div className="flex items-center gap-2 mb-6">
//         <FaTh className="text-pink-600 text-xl" />
//         <h2 className="text-2xl font-bold">Overview</h2>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatCard
//           label="Turnover"
//           value={`$${data.turnover.toLocaleString()}`}
//           icon={<IoCartOutline className="text-xl text-pink-600" />}
//           percent="5.39%"
//           color={{ bg: "bg-pink-50", iconBg: "bg-pink-100" }}
//         />
//         <StatCard
//           label="Profit"
//           value={`$${data.profit.toLocaleString()}`}
//           icon={<IoLogoUsd className="text-xl text-blue-500" />}
//           percent="4.87%"
//           color={{ bg: "bg-blue-100", iconBg: "bg-blue-200" }}
//         />
//         <StatCard
//           label="New customers"
//           value={data.newCustomer}
//           icon={<RxAvatar className="text-xl text-indigo-500" />}
//           percent="6.84%"
//           color={{ bg: "bg-indigo-50", iconBg: "bg-indigo-100" }}
//         />
//       </div>
//     </section>
//   );
// };

const Overview = () => {
  return (
    <div style={{ 
      border: '2px solid black', 
      padding: '16px', 
      borderRadius: '8px',
      margin: '16px',
      backgroundColor: '#f9f9f9',
      textAlign: 'center'
    }}>
      <h1>Đây là Overview</h1>
    </div>
  );
};

export default Overview;
