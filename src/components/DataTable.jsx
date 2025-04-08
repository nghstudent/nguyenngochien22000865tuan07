import React, { useState, useEffect } from "react";
import { FileText, Upload, Download, Pencil } from "lucide-react";
import EditModal from "./EditModal";
import AddModal from "./AddModal";

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
  const [orders, setOrders] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/customers")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Lỗi khi load dữ liệu:", error));
  }, []);

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

  const handleSaveEdit = async (updatedCustomer) => {
    try {
      const res = await fetch(`http://localhost:3000/customers/${updatedCustomer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCustomer),
      });

      if (!res.ok) {
        throw new Error("Cập nhật thất bại");
      }

      const updated = await res.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updated.id ? updated : order
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Lỗi khi cập nhật khách hàng:", error);
      alert("Cập nhật thất bại");
    }
  };

  const openAddModal = () => setIsAddOpen(true);
  const closeAddModal = () => setIsAddOpen(false);

  const handleSaveAdd = async (newCustomer) => {
    try {
      const res = await fetch("http://localhost:3000/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });

      if (!res.ok) throw new Error("Thêm thất bại");

      const added = await res.json();
      setOrders((prev) => [...prev, added]);
      closeAddModal();
    } catch (error) {
      console.error("Lỗi khi thêm khách hàng:", error);
      alert("Thêm khách hàng thất bại");
    }
  };

  const formatCurrency = (usd) =>
    usd.toLocaleString("en-US", { style: "currency", currency: "USD" });

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
