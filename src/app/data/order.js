const orders = [
    // Orders for John Doe
const orders = [
    // Orders for John Doe
    { id: 1, clientId: 1, product: "Laptop", quantity: 1, total: 1200 },
    { id: 2, clientId: 1, product: "Headphones", quantity: 2, total: 100 },
    // Orders for Jane Smith
    { id: 3, clientId: 2, product: "Smartphone", quantity: 1, total: 800 },
    { id: 4, clientId: 2, product: "Tablet", quantity: 1, total: 400 },
    // Orders for David Johnson
    { id: 5, clientId: 3, product: "Monitor", quantity: 1, total: 300 },
    { id: 6, clientId: 3, product: "Keyboard", quantity: 1, total: 50 },
    // Orders for Mary Brown
    { id: 7, clientId: 4, product: "Smartwatch", quantity: 1, total: 150 },
    { id: 8, clientId: 4, product: "Mouse", quantity: 2, total: 30 },
    // Orders for Michael Wilson
    { id: 9, clientId: 5, product: "Camera", quantity: 1, total: 500 },
    { id: 10, clientId: 5, product: "Printer", quantity: 1, total: 200 },
    // Orders for Lisa Jones
    { id: 11, clientId: 6, product: "Speaker", quantity: 2, total: 100 },
    { id: 12, clientId: 6, product: "External Hard Drive", quantity: 1, total: 80 },
    // Orders for Robert Taylor
    { id: 13, clientId: 7, product: "Gaming Console", quantity: 1, total: 400 },
    { id: 14, clientId: 7, product: "VR Headset", quantity: 1, total: 300 },
    // Orders for Jennifer Martinez
    { id: 15, clientId: 8, product: "Fitness Tracker", quantity: 1, total: 80 },
    { id: 16, clientId: 8, product: "Wireless Earbuds", quantity: 1, total: 50 },
    // Orders for William Anderson
    { id: 17, clientId: 9, product: "Smart Thermostat", quantity: 1, total: 120 },
    { id: 18, clientId: 9, product: "Security Camera", quantity: 2, total: 200 },
    // Orders for Patricia Thomas
    { id: 19, clientId: 10, product: "Smart Home Hub", quantity: 1, total: 180 },
    { id: 20, clientId: 10, product: "Smart Light Bulbs", quantity: 3, total: 60 },
    // Orders for Richard Jackson
    { id: 21, clientId: 11, product: "Table Lamp", quantity: 1, total: 40 },
    { id: 22, clientId: 11, product: "Desk Organizer", quantity: 1, total: 20 },
    // Orders for Jessica White
    { id: 23, clientId: 12, product: "Electric Toothbrush", quantity: 1, total: 50 },
    { id: 24, clientId: 12, product: "Water Flosser", quantity: 1, total: 30 },
    // Orders for Daniel Harris
    { id: 25, clientId: 13, product: "Coffee Maker", quantity: 1, total: 60 },
    { id: 26, clientId: 13, product: "Toaster", quantity: 1, total: 40 },
    // Orders for Susan Clark
    { id: 27, clientId: 14, product: "Blender", quantity: 1, total: 70 },
    { id: 28, clientId: 14, product: "Food Processor", quantity: 1, total: 90 },
    // Orders for Paul Rodriguez
    { id: 29, clientId: 15, product: "Vacuum Cleaner", quantity: 1, total: 100 },
    { id: 30, clientId: 15, product: "Steam Iron", quantity: 1, total: 50 },
    // Orders for Karen Lewis
    { id: 31, clientId: 16, product: "Air Purifier", quantity: 1, total: 150 },
    { id: 32, clientId: 16, product: "Humidifier", quantity: 1, total: 80 },
    // Orders for Mark Walker
    { id: 33, clientId: 17, product: "Portable Fan", quantity: 1, total: 30 },
    { id: 34, clientId: 17, product: "Electric Blanket", quantity: 1, total: 70 },
    // Orders for Betty Hall
    { id: 35, clientId: 18, product: "Wall Clock", quantity: 1, total: 20 },
    { id: 36, clientId: 18, product: "Picture Frame", quantity: 1, total: 15 },
    // Orders for Steven Young
    { id: 37, clientId: 19, product: "Alarm Clock", quantity: 1, total: 25 },
    { id: 38, clientId: 19, product: "Calendar", quantity: 1, total: 25 },

    // Orders for Margaret King
    { id: 39, clientId: 20, product: "Desk Lamp", quantity: 1, total: 35 },
    { id: 40, clientId: 20, product: "Bookshelf", quantity: 1, total: 60 }
];

export function getAllOrders() {
    return [...orders];
}

export function getOrdersByClient(name) {
    return orders.filter(order => order.clientId === name);
}
