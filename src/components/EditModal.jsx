import React, { useState, useEffect } from "react";

const EditModal = ({ customer, onClose, onSave }) => {
    // State lưu trữ thông tin khách hàng đang được chỉnh sửa
    const [formData, setFormData] = useState({
        customerName: "",
        company: "",
        value: "",
        date: "",
        status: "",
    });

    // useEffect - Khi prop customer thay đổi, cập nhật state formData tương ứng
    useEffect(() => {
        if (customer) {
            setFormData(customer);
        }
    }, [customer]);

    // Hàm xử lý thay đổi input/select - Cập nhật giá trị vào formData dựa theo tên trường
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Hàm xử lý khi người dùng bấm "Cập nhật" - Chuyển giá trị đơn hàng về kiểu số và gửi dữ liệu cập nhật
    const handleSave = () => {
        const updatedData = {
            ...formData,
            value: Number(formData.value),
        };
        onSave(updatedData);
        onClose();
    };

    // Nếu không có khách hàng nào được chọn, không hiển thị modal
    if (!customer) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Chỉnh sửa thông tin</h2>

                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium">Tên khách hàng</label>
                        <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Công ty</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Giá trị đơn</label>
                        <input
                            type="number"
                            name="value"
                            value={formData.value}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Ngày đặt hàng</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Trạng thái</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="New">New</option>
                            <option value="In-progress">In-progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>
                {/* Action */}
                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
