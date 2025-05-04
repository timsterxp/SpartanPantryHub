import React, {useEffect, useState} from 'react';
import './OrdersView.css';
import {getUser} from "../models/UserModel";

const user = getUser();

const OrdersView = () => {
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    // Orders needs to be retrieved from DB, most likely by email
    const [orders, setOrders]  = useState( []);

    const toggleExpand = (id) => {
        setExpandedOrderId(expandedOrderId === id ? null : id);
    };

    useEffect(() => {
        fetch('http://localhost:5000/api/order/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userID: user.text
            })
        })
            .then(res => res.json())
            .then((data) => {
                console.log("Raw data from backend:", data);

                const formatted = data.map(order => ({
                    id: order._id, // rename _id to id
                    items: order.items,
                    userName: order.userName,
                    userID: order.userID,
                    status: order.status,
                    datePlaced: order.datePlaced || 'N/A', // add fallback or generate if missing
                    notes: order.notes,
                }));
                setOrders(formatted);
            })
            .catch(err => console.log("Error fetching orders:", err));
    }, []);
    return (
        <div className="orders-view">
            <h2>My Orders</h2>
            <ul className="orders-list">
                {orders.map((order) => (
                    <li key={order.id} className="order-card">
                        <div className="order-summary" onClick={() => toggleExpand(order.id)}>
                            <div><strong>Date:</strong> {order.datePlaced}</div>
                            <div className={`status ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                {order.status}
                            </div>
                        </div>

                        {expandedOrderId === order.id && (
                            <>
                                <ul className="order-items">
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} (x{item.quantity})
                                        </li>
                                    ))}
                                </ul>


                                {order.status.toLowerCase() === 'cancelled' && order.notes && (
                                    <div className="cancellation-notes">
                                        <strong>Cancellation Reason:</strong> {order.notes}
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersView;