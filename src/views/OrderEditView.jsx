// page for order
import React, { useState } from 'react';

const OrderEdit = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "Alice",
      items: [
        { name: "Apple", quantity: 2 },
        { name: "Banana", quantity: 3 },
      ]
    },
    {
      id: 2,
      customerName: "Bob",
      items: [
        { name: "Orange", quantity: 1 },
        { name: "Grapes", quantity: 2 },
      ]
    }
  ]);

  // Handle input changes for editing
  const handleChange = (orderId, itemIndex, field, value) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const updatedItems = order.items.map((item, index) => {
          if (index === itemIndex) {
            return { ...item, [field]: field === 'quantity' ? Number(value) : value };
          }
          return item;
        });
        return { ...order, items: updatedItems };
      }
      return order;
    });

    setOrders(updatedOrders);
  };

  return (
    <div className="order-view">
      <h1>Order List</h1>
      {orders.map((order) => (
        <div key={order.id} className="order-card" style={styles.card}>
          <h2>Order #{order.id}</h2>
          <p><strong>Customer:</strong> {order.customerName}</p>
          <h3>Items:</h3>
          {order.items.map((item, index) => (
            <div key={index} style={styles.itemRow}>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleChange(order.id, index, 'name', e.target.value)}
                style={styles.input}
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleChange(order.id, index, 'quantity', e.target.value)}
                style={styles.input}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Basic styling
const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#f9f9f9'
  },
  itemRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '8px'
  },
  input: {
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  }
};
export default OrderEdit;