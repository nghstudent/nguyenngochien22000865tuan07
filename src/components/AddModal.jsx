import React, { useState } from 'react';
import { X } from 'lucide-react';

const AddModal = ({ onClose, onSave }) => {
    // State để lưu trữ dữ liệu của form
    const [formData, setFormData] = useState({
        customerName: '',
        company: '',
        value: '',
        date: '',
        status: 'New',
    });

    // Hàm xử lý khi người dùng thay đổi giá trị trong input/select
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    //Hàm xử lý khi người dùng click nút "Lưu"
    const handleSave = () => {
        if (!formData.customerName || !formData.company || !formData.value || !formData.date) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        // const dataWithAvatar = {
        //     ...formData,
        //     avatar: "/images/Avatar.png",
        // };
        // onSave(dataWithAvatar); 
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Thêm khách hàng</h2>
                    <button onClick={onClose}>
                        <X className="text-gray-500 hover:text-black" />
                    </button>
                </div>
                <div className="text-sm text-gray-600 mb-4 space-y-1">
                    {formData.customerName && <p><strong>Khách hàng:</strong> {formData.customerName}</p>}
                    {formData.company && <p><strong>Công ty:</strong> {formData.company}</p>}
                    {formData.value && <p><strong>Giá trị đơn:</strong> {Number(formData.value).toLocaleString()} đ</p>}
                    {formData.date && <p><strong>Ngày đặt hàng:</strong> {formData.date}</p>}
                    {formData.status && <p><strong>Trạng thái:</strong> {formData.status}</p>}
                </div>
                <div className="space-y-3">
                    <input
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="Tên khách hàng"
                        className="w-full border rounded p-2"
                    />
                    <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Công ty"
                        className="w-full border rounded p-2"
                    />
                    <input
                        name="value"
                        type="number"
                        value={formData.value}
                        onChange={handleChange}
                        placeholder="Giá trị đơn hàng"
                        className="w-full border rounded p-2"
                    />
                    <input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="New">New</option>
                        <option value="In-progress">In-progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Lưu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddModal;
