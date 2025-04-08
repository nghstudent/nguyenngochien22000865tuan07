import React, { useState } from "react";
import { FileText, Upload, Download, Pencil } from "lucide-react";

const orders = [
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
const pageSize = 6;

const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

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
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(orders.length / pageSize);
  const paginatedOrders = orders.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

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

  const formatCurrency = (usd) =>
    usd.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="px-4 py-8">
      {/* Tiêu đề và hành động */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="text-red-700" size={24} />
          <h2 className="text-2xl font-bold text-gray-800">Detailed Report</h2>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1 border rounded text-sm text-gray-700 hover:bg-gray-100">
            <Upload size={16} />
            Import
          </button>
          <button className="flex items-center gap-1 px-3 py-1 border rounded text-sm text-gray-700 hover:bg-gray-100">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Bảng */}
      <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm font-medium text-gray-600">
          <tr>
            <th className="p-3">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={paginatedOrders.every((o) =>
                  selectedIds.includes(o.id)
                )}
              />
            </th>
            <th className="p-3">Customer Name</th>
            <th className="p-3">Company</th>
            <th className="p-3">Order Value</th>
            <th className="p-3">Order Date</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Action</th>
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
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                  {getInitials(order.customerName)}
                </div>
                <span>{order.customerName}</span>
              </td>
              <td className="p-3 text-sm">{order.company}</td>
              <td className="p-3 text-sm">{formatCurrency(order.value)}</td>
              <td className="p-3 text-sm">{order.date}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs text-white ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="p-3 text-center">
                <button className="text-gray-500 hover:text-blue-500">
                  <Pencil size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <span>{orders.length} results</span>
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition 
                ${page === i + 1
                  ? "bg-rose-500 text-white font-bold"
                  : "bg-rose-200 text-white hover:bg-rose-400"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTable;