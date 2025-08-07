// Defines the structure for a menu item object.
interface MenuItem {
    id: number;
    name: string;
    price: number;
    category: string;
}

// Defines the structure for an item in the shopping cart, extending MenuItem with quantity.
interface CartItem extends MenuItem {
    quantity: number;
}

// Optional: Defines the structure for order data that might be submitted.
interface OrderData {
    items: CartItem[];
    total: number;
    orderId?: string | number; // Optional, might be added after submission
    timestamp?: string;      // Optional, for recording order time
}

// Defines possible statuses for an order.
enum OrderStatus {
    Pending = "PENDING",
    Processing = "PROCESSING",
    Shipped = "SHIPPED",
    Delivered = "DELIVERED",
    Cancelled = "CANCELLED"
}

// This export {} can be useful in some TypeScript setups to ensure the file is treated as a module,
// especially if you have "isolatedModules": true in tsconfig.json.
// For this lab's purpose (JSDoc referencing), it might not be strictly necessary
// if editor tooling resolves types globally or from the project context.
export {};
