const clients = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com"
    },
    {
        id: 3,
        name: "David Johnson",
        email: "david@example.com"
    },
    {
        id: 4,
        name: "Mary Brown",
        email: "mary@example.com"
    },
    {
        id: 5,
        name: "Michael Wilson",
        email: "michael@example.com"
    },
    {
        id: 6,
        name: "Lisa Jones",
        email: "lisa@example.com"
    },
    {
        id: 7,
        name: "Robert Taylor",
        email: "robert@example.com"
    },
    {
        id: 8,
        name: "Jennifer Martinez",
        email: "jennifer@example.com"
    },
    {
        id: 9,
        name: "William Anderson",
        email: "william@example.com"
    },
    {
        id: 10,
        name: "Patricia Thomas",
        email: "patricia@example.com"
    },
    {
        id: 11,
        name: "Richard Jackson",
        email: "richard@example.com"
    },
    {
        id: 12,
        name: "Jessica White",
        email: "jessica@example.com"
    },
    {
        id: 13,
        name: "Daniel Harris",
        email: "daniel@example.com"
    },
    {
        id: 14,
        name: "Susan Clark",
        email: "susan@example.com"
    },
    {
        id: 15,
        name: "Paul Rodriguez",
        email: "paul@example.com"
    },
    {
        id: 16,
        name: "Karen Lewis",
        email: "karen@example.com"
    },
    {
        id: 17,
        name: "Mark Walker",
        email: "mark@example.com"
    },
    {
        id: 18,
        name: "Betty Hall",
        email: "betty@example.com"
    },
    {
        id: 19,
        name: "Steven Young",
        email: "steven@example.com"
    },
    {
        id: 20,
        name: "Margaret King",
        email: "margaret@example.com"
    }
];

export function getAllClients() {
    return [...clients];
}

export function getClientById(id) {
    return clients.find(client => client.id === id) || null;
}
