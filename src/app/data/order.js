import {getClientById} from "./client";

const orders = [
    { id: 1, clientId: 1, product: "Laptop", quantity: 1, total: 1200, date: "2023-05-01", status: "COMPLETED" },
    { id: 2, clientId: 1, product: "Headphones", quantity: 2, total: 100, date: "2023-05-03", status: "PENDING" },
    { id: 3, clientId: 2, product: "Smartphone", quantity: 1, total: 800, date: "2023-05-02", status: "CANCELLED" },
    { id: 4, clientId: 2, product: "Tablet", quantity: 1, total: 400, date: "2023-05-04", status: "COMPLETED" },
    { id: 5, clientId: 3, product: "Monitor", quantity: 1, total: 300, date: "2023-05-05", status: "PENDING" },
    { id: 6, clientId: 3, product: "Keyboard", quantity: 1, total: 50, date: "2023-05-06", status: "COMPLETED" },
    { id: 7, clientId: 4, product: "Smartwatch", quantity: 1, total: 150, date: "2023-05-07", status: "CANCELLED" },
    { id: 8, clientId: 4, product: "Mouse", quantity: 2, total: 30, date: "2023-05-08", status: "PENDING" },
    { id: 9, clientId: 5, product: "Camera", quantity: 1, total: 500, date: "2023-05-09", status: "COMPLETED" },
    { id: 10, clientId: 5, product: "Printer", quantity: 1, total: 200, date: "2023-05-10", status: "PENDING" },
    { id: 11, clientId: 6, product: "Speaker", quantity: 2, total: 100, date: "2023-05-11", status: "CANCELLED" },
    { id: 12, clientId: 6, product: "External Hard Drive", quantity: 1, total: 80, date: "2023-05-12", status: "COMPLETED" },
    { id: 13, clientId: 7, product: "Gaming Console", quantity: 1, total: 400, date: "2023-05-13", status: "PENDING" },
    { id: 14, clientId: 7, product: "VR Headset", quantity: 1, total: 300, date: "2023-05-14", status: "CANCELLED" },
    { id: 15, clientId: 8, product: "Fitness Tracker", quantity: 1, total: 80, date: "2023-05-15", status: "COMPLETED" },
    { id: 16, clientId: 8, product: "Wireless Earbuds", quantity: 1, total: 50, date: "2023-05-16", status: "PENDING" },
    { id: 17, clientId: 9, product: "Smart Thermostat", quantity: 1, total: 120, date: "2023-05-17", status: "COMPLETED" },
    { id: 18, clientId: 9, product: "Security Camera", quantity: 2, total: 200, date: "2023-05-18", status: "CANCELLED" },
    { id: 19, clientId: 10, product: "Smart Home Hub", quantity: 1, total: 180, date: "2023-05-19", status: "PENDING" },
    { id: 20, clientId: 10, product: "Smart Light Bulbs", quantity: 3, total: 60, date: "2023-05-20", status: "COMPLETED" },
    { id: 21, clientId: 11, product: "Table Lamp", quantity: 1, total: 40, date: "2023-05-21", status: "CANCELLED" },
    { id: 22, clientId: 11, product: "Desk Organizer", quantity: 1, total: 20, date: "2023-05-22", status: "PENDING" },
    { id: 23, clientId: 12, product: "Electric Toothbrush", quantity: 1, total: 50, date: "2023-05-23", status: "COMPLETED" },
    { id: 24, clientId: 12, product: "Water Flosser", quantity: 1, total: 30, date: "2023-05-24", status: "CANCELLED" },
    { id: 25, clientId: 13, product: "Coffee Maker", quantity: 1, total: 60, date: "2023-05-25", status: "PENDING" },
    { id: 26, clientId: 13, product: "Toaster", quantity: 1, total: 40, date: "2023-05-26", status: "COMPLETED" },
    { id: 27, clientId: 14, product: "Blender", quantity: 1, total: 70, date: "2023-05-27", status: "CANCELLED" },
    { id: 28, clientId: 14, product: "Food Processor", quantity: 1, total: 90, date: "2023-05-28", status: "PENDING" },
    { id: 29, clientId: 15, product: "Vacuum Cleaner", quantity: 1, total: 100, date: "2023-05-29", status: "COMPLETED" },
    { id: 30, clientId: 15, product: "Steam Iron", quantity: 1, total: 50, date: "2023-05-30", status: "CANCELLED" },
    { id: 31, clientId: 16, product: "Air Purifier", quantity: 1, total: 150, date: "2023-05-31", status: "PENDING" },
    { id: 32, clientId: 16, product: "Humidifier", quantity: 1, total: 80, date: "2023-06-01", status: "COMPLETED" },
    { id: 33, clientId: 17, product: "Portable Fan", quantity: 1, total: 30, date: "2023-06-02", status: "CANCELLED" },
    { id: 34, clientId: 17, product: "Electric Blanket", quantity: 1, total: 70, date: "2023-06-03", status: "PENDING" },
    { id: 35, clientId: 18, product: "Wall Clock", quantity: 1, total: 20, date: "2023-06-04", status: "COMPLETED" },
    { id: 36, clientId: 18, product: "Picture Frame", quantity: 1, total: 15, date: "2023-06-05", status: "CANCELLED" },
    { id: 37, clientId: 19, product: "Alarm Clock", quantity: 1, total: 25, date: "2023-06-06", status: "PENDING" },
    { id: 38, clientId: 19, product: "Calendar", quantity: 1, total: 25, date: "2023-06-07", status: "COMPLETED" },
    { id: 39, clientId: 20, product: "Desk Lamp", quantity: 1, total: 35, date: "2023-06-08", status: "CANCELLED" },
    { id: 40, clientId: 20, product: "Bookshelf", quantity: 1, total: 60, date: "2023-06-09", status: "PENDING" },
];

export function getAllOrders(filter = {}) {
    const { status, dateStart, dateEnd } = filter;
    return orders.filter(order => {
        if (status && order.status !== status) {
            return false;
        }
        if (dateStart && new Date(order.date) < new Date(dateStart)) {
            return false;
        }
        if (dateEnd && new Date(order.date) > new Date(dateEnd)) {
            return false;
        }
        return true;
    });
}

export function getOrdersByClient(id) {
    return orders.filter(order => order.clientId === id);
}

export function getOrderById(id) {
    const index = getOrderIndex(id);
    if (index === -1) {
        return null;
    }
    return orders[index];
}

export function createOrder(order) {
    const newOrder = { ...order, id: orders.length + 1 };
    orders.push(newOrder);
    return newOrder;
}

export function deleteOrderById(id) {
    const index = getOrderIndex(id);
    if (index === -1) {
        return false;
    }
    orders.splice(index, 1);
    return true;
}
export function getClientByOrderId(id) {
    const index = getOrderIndex(id);
    if (index === -1) {
        return null;
    }
    const order = orders[index];
    return getClientById(order.clientId) || null;
}


function getOrderIndex(id) {
    return orders.findIndex(element => element.id === id);
}


export function getOrderData(filter) {
    if (typeof filter === "undefined") {
        return [...orders];
    }
    const orderList = orders.filter((order) => orderFits(order, filter));
    return [...orderList];
}
function orderFits(order, filter) {
    return (
        orderStatusFits(order, filter.status) &&
        orderDateFits(order, filter.dateStart, filter.dateEnd)
    );
}

function orderStatusFits(order, status) {
    if (!status) return true;
    return order.status === status;
}

function orderDateFits(order, dateStart, dateEnd) {
    const orderDate = new Date(order.date);
    if (dateStart && orderDate < new Date(dateStart)) return false;
    return !(dateEnd && orderDate > new Date(dateEnd));

}
export function updateOrderById(updatedOrder) {
    const index = orders.findIndex(order => order.id === updatedOrder.id);
    if (index !== -1) {
        orders[index] = updatedOrder;
        return true;
    }
    return false;
}

