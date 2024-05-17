import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById, updateOrderById, createOrder } from '../data/order.js';
import { getClientById } from '../data/client.js';

const emptyOrder = {
    clientId: '',
    product: '',
    quantity: '',
    total: '',
    date: '',
    status: 'PENDING'
};

function OrderEditor({ mode }) {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const isCreateMode = mode === 'CREATE';
    const [order, setOrder] = useState(isCreateMode ? emptyOrder : null);
    const [client, setClient] = useState(null);
    const [form, setForm] = useState(emptyOrder);

    useEffect(() => {
        if (!isCreateMode) {
            const orderData = getOrderById(Number(orderId));
            if (orderData) {
                setOrder(orderData);
                setForm({
                    clientId: orderData.clientId,
                    product: orderData.product,
                    quantity: orderData.quantity,
                    total: orderData.total,
                    date: orderData.date,
                    status: orderData.status
                });
                const clientData = getClientById(orderData.clientId);
                setClient(clientData);
            }
        }
    }, [orderId, isCreateMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedOrder = {
            ...order,
            clientId: form.clientId,
            product: form.product,
            quantity: form.quantity,
            total: form.total,
            date: form.date,
            status: form.status
        };

        if (isCreateMode) {
            createOrder(updatedOrder);
        } else {
            updateOrderById(updatedOrder);
        }

        navigate('/orders');
    };

    if (!isCreateMode && (!order || !client)) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{isCreateMode ? 'Create Order' : `Edit Order for ${client.name}`}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Client ID:</label>
                    <input
                        type="number"
                        name="clientId"
                        value={form.clientId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Product:</label>
                    <input
                        type="text"
                        name="product"
                        value={form.product}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                        type="number"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Total:</label>
                    <input
                        type="number"
                        name="total"
                        value={form.total}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="PENDING">PENDING</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                    </select>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default OrderEditor;
