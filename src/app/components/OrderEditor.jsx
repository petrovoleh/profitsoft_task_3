import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById, updateOrderById, createOrder } from '../data/order.js';
import { getClientById } from '../data/client.js';
import * as action from "../constants/actionTypes";
import * as pages from "../../constants/pages";
import config from "../../config";

const emptyOrder = {
    clientId: '',
    product: '',
    quantity: '',
    total: '',
    date: '',
    status: 'PENDING'
};

function OrderEditor() {
    const { orderId, mode } = useParams();
    const navigate = useNavigate();

    const isCreateMode = mode === action.CREATE;
    const isEditMode = mode === action.EDIT;
    const [order, setOrder] = useState(isCreateMode ? emptyOrder : null);
    const [client, setClient] = useState(null);
    const [form, setForm] = useState(emptyOrder);
    const getInputProperties = () => (isEditMode || isCreateMode) ? { readOnly: false } : { readOnly: true };

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

        navigate(`${config.UI_URL_PREFIX}/${pages.orderEditor}/${action.VIEW}/${order.id}`);
    };

    if (!isCreateMode && (!order || !client)) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{isCreateMode ? 'Create Order' : `Order Details for ${client.name}`}</h2>
            {isCreateMode || isEditMode ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Client ID:</label>
                        <input
                            type="number"
                            name="clientId"
                            value={form.clientId}
                            onChange={handleChange}
                            required
                            {...getInputProperties()} // Apply input properties here
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
                            {...getInputProperties()} // Apply input properties here
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
                            {...getInputProperties()} // Apply input properties here
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
                            {...getInputProperties()} // Apply input properties here
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
                            {...getInputProperties()} // Apply input properties here
                        />
                    </div>
                    <div>
                        <label>Status:</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            required
                            {...getInputProperties()} // Apply input properties here
                        >
                            <option value="PENDING">PENDING</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                        </select>
                    </div>
                    <button type="submit">Save</button>
                </form>
            ) : (
                <div>
                    <p><strong>Client ID:</strong> {order.clientId}</p>
                    <p><strong>Product:</strong> {order.product}</p>
                    <p><strong>Quantity:</strong> {order.quantity}</p>
                    <p><strong>Total:</strong> ${order.total}</p>
                    <p><strong>Date:</strong> {order.date}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <button onClick={() => navigate(`${config.UI_URL_PREFIX}/${pages.orderEditor}/${action.EDIT}/${order.id}`)}>Edit</button>
                </div>
            )}
        </div>
    );
}

export default OrderEditor;
