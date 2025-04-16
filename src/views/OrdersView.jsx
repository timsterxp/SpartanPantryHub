import React, { useState } from 'react';
import './OrdersView.css';

const OrdersView = () => {
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    // Orders needs to be retrieved from DB, most likely by email
    const orders = [
        {
            id: 1,
            datePlaced: '2025-04-10',
            status: 'Placed',
            items: [
                { name: 'Oatmilk', quantity: 1 },
                { name: 'Corn', quantity: 2 },
            ],
        },
        {
            id: 2,
            datePlaced: '2025-04-07',
            status: 'Ready',
            items: [
                { name: 'Cereal', quantity: 1 },
                { name: 'Milk', quantity: 2 },
            ],
        },
        {
            id: 3,
            datePlaced: '2025-04-05',
            status: 'Picked Up',
            items: [
                { name: 'Beef Stew', quantity: 3 },
                { name: 'RTE', quantity: 1 },
            ],
        },
    ];

    const toggleExpand = (id) => {
        setExpandedOrderId(expandedOrderId === id ? null : id);
    };

    return (
        <div className="orders-view">
            <h2>My Orders</h2>
            <ul className="orders-list">
                {orders.map((order) => (
                    <li key={order.id} className="order-card">
                        <div className="order-summary" onClick={() => toggleExpand(order.id)}>
                            <div><strong>Date:</strong> {order.datePlaced}</div>
                            <div className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
                                {order.status}
                            </div>
                        </div>

                        {expandedOrderId === order.id && (
                            <ul className="order-items">
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        {item.name} (x{item.quantity})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersView;