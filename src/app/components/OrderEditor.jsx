import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById, updateOrderById, createOrder } from '../data/order';
import { getClientById } from '../data/client';
import * as action from "../constants/actionTypes";
import * as pages from "../../constants/pages";
import config from "../../config";
import IconButton from "@mui/material/IconButton";
import "../css/OrderEditor.css"
import EditIcon from '@mui/icons-material/Edit';
import { useIntl } from 'react-intl';

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
    const { formatMessage } = useIntl();

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
        if (!form.clientId) errors.clientId = formatMessage({ id: "error.clientId.required" });
        if (!form.product) errors.product = formatMessage({ id: "error.product.required" });
        if (!form.quantity) errors.quantity = formatMessage({ id: "error.quantity.required" });
        if (isNaN(form.quantity) || form.quantity <= 0) errors.quantity = formatMessage({ id: "error.quantity.positive" });
        if (!form.total) errors.total = formatMessage({ id: "error.total.required" });
        if (isNaN(form.total) || form.total < 0) errors.total = formatMessage({ id: "error.total.nonNegative" });
        if (!form.date) errors.date = formatMessage({ id: "error.date.required" });
        if (!form.status) errors.status = formatMessage({ id: "error.status.required" });
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
        <div className="order-editor-container">
            {(isCreateMode || isEditMode) ? (
                <form className="form-container" onSubmit={handleSubmit}>
                    <h2>{isCreateMode ? formatMessage({ id: "title.createOrder" }) : formatMessage({ id: "title.editOrder" }, { name: client?.name })}</h2>
                    <div className="form-group">
                        <label className="form-label">{formatMessage({ id: "label.clientId" })}:</label>
                        <input
                            type="number"
                            name="clientId"
                            value={form.clientId}
                            onChange={handleChange}
                            required
                            readOnly={!isEditMode && !isCreateMode}
                            className="form-input"
                        />
                        {errors.clientId && <div className="error-message">{errors.clientId}</div>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">{formatMessage({ id: "label.product" })}:</label>
                        <input
                            type="text"
                            name="product"
                            value={form.product}
                            onChange={handleChange}
                            required
                            readOnly={!isEditMode && !isCreateMode}
                            className="form-input"
                        />
                        {errors.product && <div className="error-message">{errors.product}</div>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">{formatMessage({ id: "label.quantity" })}:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={form.quantity}
                            onChange={handleChange}
                            required
                            readOnly={!isEditMode && !isCreateMode}
                            className="form-input"
                        />
                        {errors.quantity && <div className="error-message">{errors.quantity}</div>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">{formatMessage({ id: "label.total" })}:</label>
                        <input
                            type="number"
                            name="total"
                            value={form.total}
                            onChange={handleChange}
                            required
                            readOnly={!isEditMode && !isCreateMode}
                            className="form-input"
                        />
                        {errors.total && <div className="error-message">{errors.total}</div>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">{formatMessage({ id: "label.date" })}:</label>
                        <input
                            type="date"
                            name="date"
                            value={form.date}
                            onChange={handleChange}
                            required
                            readOnly={!isEditMode && !isCreateMode}
                            className="form-input"
                        />
                        {errors.date && <div className="error-message">{errors.date}</div>}
                    </div>
                    <div className="form-group">
                        <label className="form-label">{formatMessage({ id: "label.status" })}:</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            required
                            readOnly={!isEditMode && !isCreateMode}
                            className="form-input"
                        >
                            <option value="PENDING">{formatMessage({ id: "status.pending" })}</option>
                            <option value="COMPLETED">{formatMessage({ id: "status.completed" })}</option>
                            <option value="CANCELLED">{formatMessage({ id: "status.cancelled" })}</option>
                        </select>
                        {errors.status && <div className="error-message">{errors.status}</div>}
                    </div>
                    <button type="submit" className="button button-primary">{formatMessage({ id: "button.save" })}</button>
                    <button type="button" onClick={handleCancel} className="button button-secondary">{formatMessage({ id: "button.cancel" })}</button>
                </form>
            ) : (
                <div className="order-details-container">
                    <div className="row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <h2>{formatMessage({ id: "title.orderDetails" }, { name: client?.name })}</h2>
                        <IconButton
                            onClick={() => navigate(`${config.UI_URL_PREFIX}/${pages.orderEditor}/${action.EDIT}/${order.id}`)}
                            style={{ marginLeft: "auto" }}>
                            <EditIcon />
                        </IconButton>
                    </div>

                    <p><strong>{formatMessage({ id: "label.clientId" })}:</strong> {order.clientId}</p>
                    <p><strong>{formatMessage({ id: "label.product" })}:</strong> {order.product}</p>
                    <p><strong>{formatMessage({ id: "label.quantity" })}:</strong> {order.quantity}</p>
                    <p><strong>{formatMessage({ id: "label.total" })}:</strong> ${order.total}</p>
                    <p><strong>{formatMessage({ id: "label.date" })}:</strong> {order.date}</p>
                    <p><strong>{formatMessage({ id: "label.status" })}:</strong> {order.status}</p>

                    <button onClick={goBackHandler} className="back-button">{formatMessage({ id: "button.back" })}</button>
                </div>
            )}
        </div>
    );
}

export default OrderEditor;

