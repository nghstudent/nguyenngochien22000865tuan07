// import React, { useState, useEffect } from "react";
// import { FileText, Upload, Download, Pencil } from "lucide-react";
// import EditModal from "./EditModal";
// import AddModal from "./AddModal";

// const pageSize = 6;

// // Hàm đổi màu trạng thái dựa vào giá trị status
// const getStatusColor = (status) => {
//   switch (status) {
//     case "Completed":
//       return "bg-green-500";
//     case "New":
//       return "bg-blue-500";
//     case "In-progress":
//       return "bg-yellow-500";
//     default:
//       return "bg-gray-400";
//   }
// };

// const DataTable = () => {
//   const [orders, setOrders] = useState([]);
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [page, setPage] = useState(1);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [isAddOpen, setIsAddOpen] = useState(false);

//   // Gọi API lấy danh sách khách hàng khi component được mount
//   useEffect(() => {
//     fetch("http://localhost:3000/customers")
//       .then((res) => res.json())
//       .then((data) => setOrders(data))
//       .catch((error) => console.error("Lỗi khi load dữ liệu:", error));
//   }, []);

//   // Tính tổng số trang và lấy dữ liệu trang hiện tại
//   const totalPages = Math.ceil(orders.length / pageSize);
//   const paginatedOrders = orders.slice((page - 1) * pageSize, page * pageSize);

//   // Chọn hoặc bỏ chọn tất cả checkbox trên trang hiện tại
//   const handleSelectAll = (e) => {
//     const pageIds = paginatedOrders.map((o) => o.id);
//     if (e.target.checked) {
//       setSelectedIds([...new Set([...selectedIds, ...pageIds])]);
//     } else {
//       setSelectedIds(selectedIds.filter((id) => !pageIds.includes(id)));
//     }
//   };

//   // Chọn hoặc bỏ chọn một dòng
//   const handleSelectOne = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   // Mở modal sửa và set khách hàng cần chỉnh sửa
//   const openEditModal = (customer) => {
//     setEditingCustomer(customer);
//     setIsEditOpen(true);
//   };

//   // Đóng modal sửa
//   const closeEditModal = () => {
//     setEditingCustomer(null);
//     setIsEditOpen(false);
//   };

//   // Xử lý khi lưu chỉnh sửa
//   const handleSaveEdit = async (updatedCustomer) => {
//     try {
//       const res = await fetch(`http://localhost:3000/customers/${updatedCustomer.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedCustomer),
//       });

//       if (!res.ok) {
//         throw new Error("Cập nhật thất bại");
//       }

//       const updated = await res.json();
//       // Cập nhật danh sách khách hàng
//       setOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order.id === updated.id ? updated : order
//         )
//       );
//       closeEditModal();
//     } catch (error) {
//       console.error("Lỗi khi cập nhật khách hàng:", error);
//       alert("Cập nhật thất bại");
//     }
//   };

//   const handleDeleteCustomer = (id) => {
//     // setCustomers(prev => prev.filter(c => c.id !== id));

//     fetch(`http://localhost:3000/customers/${id}`, {
//       method: 'DELETE'
//     });
//   };
//   // Mở và đóng modal thêm khách hàng
//   const openAddModal = () => setIsAddOpen(true);
//   const closeAddModal = () => setIsAddOpen(false);

//   // Xử lý khi lưu khách hàng mới
//   const handleSaveAdd = async (newCustomer) => {
//     try {
//       if (!newCustomer.avatar) {
//         newCustomer.avatar = "/images/Avatar.png";
//       }
//       const res = await fetch("http://localhost:3000/customers", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newCustomer),
//       });

//       if (!res.ok) throw new Error("Thêm thất bại");

//       const added = await res.json();
//       setOrders((prev) => [...prev, added]); //Thêm vào danh sách
//       closeAddModal();
//     } catch (error) {
//       console.error("Lỗi khi thêm khách hàng:", error);
//       alert("Thêm khách hàng thất bại");
//     }
//   };

//   // Format giá trị đơn hàng sang định dạng USD
//   const formatCurrency = (usd) =>
//     Number(usd).toLocaleString("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     });

//   // Format ngày tháng từ định dạng ISO sang dd/mm/yyyy
//   const formatDate = (isoDate) => {
//     const date = new Date(isoDate);
//     return date.toLocaleDateString("en-GB");
//   };


//   return (
//     <div className="px-4 py-8">
//       {/* Tiêu đề và các nút Import/Export */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <FileText className="text-red-700" size={24} />
//           <h2 className="text-2xl font-bold text-gray-800">Detailed Report</h2>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={openAddModal}
//             className="flex items-center gap-1 px-3 py-1 border rounded text-sm text-white bg-blue-600 hover:bg-blue-700"
//           >
//             <Download size={16} />
//             Import
//           </button>
//           <button className="flex items-center gap-1 px-3 py-1 border rounded text-sm text-gray-700 hover:bg-gray-100">
//             <Upload size={16} />
//             Export
//           </button>
//         </div>
//       </div>

//       {/* Bảng dữ liệu khách hàng */}
//       <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
//         <thead className="bg-gray-100 text-left text-sm font-medium text-gray-600">
//           <tr>
//             <th className="p-3">
//               <input
//                 type="checkbox"
//                 onChange={handleSelectAll}
//                 checked={
//                   paginatedOrders.length > 0 &&
//                   paginatedOrders.every((o) => selectedIds.includes(o.id))
//                 }
//               />
//             </th>
//             <th className="p-3">CUSTOMER NAME</th>
//             <th className="p-3">COMPANY</th>
//             <th className="p-3">ORDER VALUE</th>
//             <th className="p-3">ORDER DATE</th>
//             <th className="p-3 text-center">STATUS</th>
//             <th className="p-3 text-center"></th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* Hiển thị từng dòng dữ liệu */}
//           {paginatedOrders.map((order) => (
//             <tr key={order.id} className="border-t hover:bg-gray-50 transition">
//               <td className="p-3">
//                 {/* Checkbox từng dòng */}
//                 <input
//                   type="checkbox"
//                   checked={selectedIds.includes(order.id)}
//                   onChange={() => handleSelectOne(order.id)}
//                 />
//               </td>
//               {/* Avatar và họ tên */}
//               <td className="p-3 flex items-center gap-3">
//                 <img
//                   src={order.avatar || "/images/Avatar.png"}
//                   alt={order.customerName}
//                   className="w-8 h-8 rounded-full object-cover"
//                 />
//                 <span>{order.customerName}</span>
//               </td>

//               <td className="p-3 text-sm text-left">{order.company}</td>
//               <td className="p-3 text-sm text-left">{formatCurrency(order.value)}</td>
//               <td className="p-3 text-sm text-left">{formatDate(order.date)}</td>
//               <td className="p-3">
//                 {/* Hiển thị trạng thái với màu sắc tương ứng */}
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(order.status)}`}
//                 >
//                   {order.status}
//                 </span>
//               </td>
//               <td className="p-3 text-center">
//                 {/* Button mở modal chỉnh sửa */}
//                 <button
//                   className="text-gray-500 hover:text-blue-500"
//                   onClick={() => openEditModal(order)}
//                 >
//                   <Pencil size={16} />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="flex justify-between items-center mt-4 text-sm">
//         <span>{orders.length} results</span>
//         <div className="flex gap-2">
//           {/* Chỉ mục trang */}
//           {Array.from({ length: totalPages }, (_, i) => i + 1)
//             .filter((pageNum) =>
//               pageNum === 1 ||
//               pageNum === totalPages ||
//               Math.abs(pageNum - page) <= 1
//             )
//             .reduce((acc, curr, idx, arr) => {
//               if (idx > 0 && curr - arr[idx - 1] > 1) {
//                 acc.push("ellipsis");
//               }
//               acc.push(curr);
//               return acc;
//             }, [])
//             .map((item, i) =>
//               item === "ellipsis" ? (
//                 <span key={i} className="w-8 h-8 flex items-center justify-center">...</span>
//               ) : (
//                 <button
//                   key={i}
//                   onClick={() => setPage(item)}
//                   className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition 
//           ${page === item
//                       ? "bg-rose-500 text-white font-bold"
//                       : "bg-rose-200 text-white hover:bg-rose-400"
//                     }`}
//                 >
//                   {item}
//                 </button>
//               )
//             )}

//         </div>
//       </div>
//       {/* Hiển thị modal chỉnh sửa nếu đang mở */}
//       {isEditOpen && (
//         <EditModal
//           customer={editingCustomer}
//           onClose={closeEditModal}
//           onSave={handleSaveEdit}
//           onDelete={handleDeleteCustomer}
//         />
//       )}
//       {/* Hiển thị modal thêm mới nếu đang mở */}
//       {isAddOpen && (
//         <AddModal
//           onClose={closeAddModal}
//           onSave={handleSaveAdd}
//         />
//       )}
//     </div>
//   );
// };

// export default DataTable;

import React, { useState } from "react";
import { FileText, Upload, Download, Pencil } from "lucide-react";
import EditModal from "./EditModal";
import AddModal from "./AddModal";

const pageSize = 6;

// Dữ liệu cứng cho khách hàng
const customerData = [
  {
    id: 1,
    customerName: "Elizabeth Lee",
    company: "AvatarSystems",
    value: 359,
    date: "2023-07-10",
    status: "Completed",
  },
  {
    id: 2,
    customerName: "Carlos Garcia",
    company: "SmoozeShift",
    value: 747,
    date: "2023-07-24",
    status: "New",
  },
  {
    id: 3,
    customerName: "Elizabeth Bailey",
    company: "Prime Time Telecom",
    value: 564,
    date: "2023-08-08",
    status: "In-progress",
  },
  {
    id: 4,
    customerName: "Ryan Brown",
    company: "OmniTech Corporation",
    value: 541,
    date: "2023-08-31",
    status: "In-progress",
  },
  {
    id: 5,
    customerName: "Ryan Young",
    company: "DataStream Inc.",
    value: 769,
    date: "2023-05-01",
    status: "Completed",
  },
  {
    id: 6,
    customerName: "Hailey Adams",
    company: "FlowRush",
    value: 922,
    date: "2023-06-10",
    status: "Completed",
  },
  {
    id: 7,
    customerName: "Nguyen Ngoc Hien",
    company: "Isuxu",
    value: 5000,
    date: "2023-06-10",
    status: "Completed",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-500";
    case "New":
      return "bg-blue-500";
    case "In-progress":
      return "bg-yellow-500";
    default:
      return "bg-gray-400";
  }
};

const DataTable = () => {
  const [orders, setOrders] = useState(customerData); // Khởi tạo dữ liệu cứng
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const totalPages = Math.ceil(orders.length / pageSize);
  const paginatedOrders = orders.slice((page - 1) * pageSize, page * pageSize);

  const handleSelectAll = (e) => {
    const pageIds = paginatedOrders.map((o) => o.id);
    if (e.target.checked) {
      setSelectedIds([...new Set([...selectedIds, ...pageIds])]);
    } else {
      setSelectedIds(selectedIds.filter((id) => !pageIds.includes(id)));
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setEditingCustomer(null);
    setIsEditOpen(false);
  };

  const handleSaveEdit = (updatedCustomer) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedCustomer.id ? updatedCustomer : order
      )
    );
    closeEditModal();
  };

  const handleDeleteCustomer = (id) => {
    setOrders((prev) => prev.filter((customer) => customer.id !== id));
  };

  const openAddModal = () => setIsAddOpen(true);
  const closeAddModal = () => setIsAddOpen(false);

  const handleSaveAdd = (newCustomer) => {
    setOrders((prev) => [...prev, newCustomer]);
    closeAddModal();
  };

  const formatCurrency = (usd) =>
    Number(usd).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <div className="px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="text-red-700" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Detailed Report</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openAddModal}
            className="flex items-center gap-1 px-3 py-1 border rounded text-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Download size={16} />
            Import
          </button>
          <button className="flex items-center gap-1 px-3 py-1 border rounded text-sm text-gray-700 hover:bg-gray-100">
            <Upload size={16} />
            Export
          </button>
        </div>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm font-medium text-gray-600">
          <tr>
            <th className="p-3">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  paginatedOrders.length > 0 &&
                  paginatedOrders.every((o) => selectedIds.includes(o.id))
                }
              />
            </th>
            <th className="p-3">CUSTOMER NAME</th>
            <th className="p-3">COMPANY</th>
            <th className="p-3">ORDER VALUE</th>
            <th className="p-3">ORDER DATE</th>
            <th className="p-3 text-center">STATUS</th>
            <th className="p-3 text-center"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <tr key={order.id} className="border-t hover:bg-gray-50 transition">
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(order.id)}
                  onChange={() => handleSelectOne(order.id)}
                />
              </td>
              <td className="p-3 flex items-center gap-3">
                <img
                  src={order.avatar || "/images/Avatar.png"}
                  alt={order.customerName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>{order.customerName}</span>
              </td>
              <td className="p-3 text-sm text-left">{order.company}</td>
              <td className="p-3 text-sm text-left">{formatCurrency(order.value)}</td>
              <td className="p-3 text-sm text-left">{formatDate(order.date)}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(order.status)}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-3 text-center">
                <button
                  className="text-gray-500 hover:text-blue-500"
                  onClick={() => openEditModal(order)}
                >
                  <Pencil size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 text-sm">
        <span>{orders.length} results</span>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((pageNum) =>
              pageNum === 1 ||
              pageNum === totalPages ||
              Math.abs(pageNum - page) <= 1
            )
            .reduce((acc, curr, idx, arr) => {
              if (idx > 0 && curr - arr[idx - 1] > 1) {
                acc.push("ellipsis");
              }
              acc.push(curr);
              return acc;
            }, [])
            .map((item, i) =>
              item === "ellipsis" ? (
                <span key={i} className="w-8 h-8 flex items-center justify-center">...</span>
              ) : (
                <button
                  key={i}
                  onClick={() => setPage(item)}
                  className={`w-8 h-8 flex items-center justify-center border ${
                    item === page ? "bg-blue-600 text-white" : "text-gray-700"
                  }`}
                >
                  {item}
                </button>
              )
            )}
        </div>
      </div>

      {isEditOpen && (
        <EditModal
          customer={editingCustomer}
          onClose={closeEditModal}
          onSave={handleSaveEdit}
        />
      )}

      {isAddOpen && (
        <AddModal
          onClose={closeAddModal}
          onSave={handleSaveAdd}
        />
      )}
    </div>
  );
};

export default DataTable;
