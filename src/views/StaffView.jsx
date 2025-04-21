import React, {useEffect, useState} from 'react';
import './StaffView.css';

const StaffView = () => {
    const [roleRequests, setRoleRequests] = useState([]);

    const [orders, setOrders] = useState([
        {
            id: 1,
            user: 'Charlie',
            items: [
                { name: 'Milk', quantity: 2 },
                { name: 'Cereal: Frosted Flakes ', quantity: 1 }
            ]
        },
        {
            id: 2,
            user: 'Dana',
            items: [
                { name: 'Radish', quantity: 12 },
                { name: 'RTE', quantity: 1 }
            ]
        }
    ]);


    const handleConfirmRoleRequest = (id,email,role) => {
       // add code to change in database

        // This code just filters out whatever id was clicked but as this is dummy code, refreshing will put it back
        setRoleRequests(prev => prev.filter(req => req.id!==id));

    };

    const handleDenyRoleRequest = (id,email) => {
        // add code to change in database

        setRoleRequests(prev => prev.filter(req => req.id!==id));
    };

    const handleConfirmOrder = (id) => {
        // add code to change order status to ready
        // Note that code down there needs to change from using dummy order ids to using order ids in database



        setOrders(prev => prev.filter(req => req.id!==id));
    };

    useEffect(()=>{
        fetch('http://localhost:5000/api/retrieve-request').then(res => res.json()).then((data) => setRoleRequests(data)).catch((err) => console.log(err));
    })
    return (
        <div className="staff-view">
            <div className="section">
                <h2>Role Requests</h2>
                <h6>*Important*. Before confirming students, check that they have completed the online survey.</h6>
                <table className="role-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Current Role</th>
                        <th>Requested Role</th>
                        <th>Student ID / Extra Info</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {roleRequests.map((req) => (
                        <tr key={req.id}>
                            <td>{req.name}</td>
                            <td>{req.email}</td>
                            <td>{req.currentRole}</td>
                            <td>{req.role}</td>
                            <td>

                                  {req.text}

                            </td>
                            <td>
                                <div className="action-btn">
                                    <button className="accept" onClick={() => handleConfirmRoleRequest(req.id, req.email, req.newRole)}>
                                        Accept
                                    </button>

                                    <button className="deny" onClick={() => handleDenyRoleRequest(req.id, req.email)}>
                                        Deny
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="section">
                <h2>Orders Requiring Action</h2>
                <h6>*Warning* You cannot undo an order. Ensure all items are accounted before confirming an order.</h6>
                <ul className="orders-list">
                    {orders.map((order) => (
                        <li key={order.id} className="order-item">
                            <div className="order-info">
                                <strong>{order.user}</strong>
                                <ul className="item-list">
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} (x{item.quantity})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => handleConfirmOrder(order.id)}>Confirm</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StaffView;