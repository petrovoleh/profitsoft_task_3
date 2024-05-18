import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById, updateOrderById, createOrder } from '../data/order';
import { getClientById } from '../data/client';
import * as action from "../constants/actionTypes";
import * as pages from "../../constants/pages";
import config from "../../config";
import IconButton from "@mui/material/IconButton";

import EditIcon from '@mui/icons-material/Edit';

const emptyOrder = {
    clientId: '',
    product: '',
    quantity: '',
    total: '',
    date: '',
    status: 'PENDING'
};

function OrderEditor() {
    const { id, mode } = useParams();
    const navigate = useNavigate();

    const isCreateMode = mode === action.CREATE;
    const isEditMode = mode === action.EDIT;
    const [order, setOrder] = useState(isCreateMode ? emptyOrder : null);
    const [client, setClient] = useState(null);
    const [form, setForm] = useState(emptyOrder);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isCreateMode) {
            const orderData = getOrderById(Number(id));
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
    }, [id, isCreateMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const goBackHandler = () => {
        navigate(`${config.UI_URL_PREFIX}/${pages.orderListView}`);
    };

    const handleCancel = () => {
        if (order?.id !== undefined) {
            navigate(`${config.UI_URL_PREFIX}/${pages.orderEditor}/${action.VIEW}/${order?.id}`);
        } else {
            goBackHandler();
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!form.clientId) errors.clientId = 'Client ID is required';
        if (!form.product) errors.product = 'Product is required';
        if (!form.quantity) errors.quantity = 'Quantity is required';
        if (isNaN(form.quantity) || form.quantity <= 0) errors.quantity = 'Quantity must be a positive number';
        if (!form.total) errors.total = 'Total is required';
        if (isNaN(form.total) || form.total < 0) errors.total = 'Total must be a non-negative number';
        if (!form.date) errors.date = 'Date is required';
        if (!form.status) errors.status = 'Status is required';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const updatedOrder = {
            ...order,
            clientId: Number(form.clientId),
            product: form.product,
            quantity: Number(form.quantity),
            total: Number(form.total),
            date: form.date,
            status: form.status
        };
        let newId;
        if (isCreateMode) {
            newId = Number(createOrder(updatedOrder));
        } else {
            if(updateOrderById(updatedOrder))
                setOrder(updatedOrder)
        }

        navigate(`${config.UI_URL_PREFIX}/${pages.orderEditor}/${action.VIEW}/${newId || updatedOrder.id}`);
    };

    if (!isCreateMode && (!order || !client)) {
        return <div>Loading...</div>;
    }
    return (
        <div>

            {(isCreateMode || isEditMode) ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2>{isCreateMode ? 'Create Order' : `Edit order ${client?.name}`}</h2>
                        <label>Client ID:</label>
                        <input
                            type="number"
                            name="clientId"
                            value={form.clientId}
                            onChange={handleChange}
                            required
                            readOnly={!isEditMode && !isCreateMode}
                        />
                        {errors.clientId && <div style={{color: 'red'}}>{errors.clientId}</div>}
                    </div>
                    <div>
                        <label>Product:</label>
                        <input
                            type="text"
                            name="product"
                            value={form.product}
                            onChange={handleChange}
                            required
                            readOnly={!isEditMode && !isCreateMode}
                        />
                        {errors.product && <div style={{ color: 'red' }}>{errors.product}</div>}
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            required
                            readOnly={!isEditMode && !isCreateMode}
                        />
                        {errors.quantity && <div style={{ color: 'red' }}>{errors.quantity}</div>}
                    </div>
                    <div>
                        <label>Total:</label>
                        <input
                            type="number"
                            name="total"
                            value={form.total}
                            onChange={handleChange}
                            required
                            readOnly={!isEditMode && !isCreateMode}
                        />
                        {errors.total && <div style={{ color: 'red' }}>{errors.total}</div>}
                    </div>
                    <div>
                        <label>Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                            readOnly={!isEditMode && !isCreateMode}
                        />
                        {errors.date && <div style={{ color: 'red' }}>{errors.date}</div>}
                    </div>
                    <div>
                        <label>Status:</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            required
                            readOnly={!isEditMode && !isCreateMode}
                        >
                            <option value="PENDING">PENDING</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="CANCELLED">CANCELLED</option>
                        </select>
                        {errors.status && <div style={{ color: 'red' }}>{errors.status}</div>}
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </form>
            ) : (

                <div>
                    <div className="row"
                         style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <h2>{`Order Details for ${client?.name}`}</h2>
                        <IconButton
                            onClick={() => navigate(`${config.UI_URL_PREFIX}/${pages.orderEditor}/${action.EDIT}/${order.id}`)}
                            style={{marginLeft: "auto"}}>
                            <EditIcon/>
                        </IconButton>
                    </div>

                    <p><strong>Client ID:</strong> {order.clientId}</p>
                    <p><strong>Product:</strong> {order.product}</p>
                    <p><strong>Quantity:</strong> {order.quantity}</p>
                    <p><strong>Total:</strong> ${order.total}</p>
                    <p><strong>Date:</strong> {order.date}</p>
                    <p><strong>Status:</strong> {order.status}</p>

                    <button onClick={goBackHandler}>Back</button>
                </div>
            )}
        </div>
    );
}

export default OrderEditor;
