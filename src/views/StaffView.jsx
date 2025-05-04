import React, {useEffect, useState} from 'react';
import './StaffView.css';

const StaffView = () => {
    const [roleRequests, setRoleRequests] = useState([]);
    const [item_name, setitem_name] = useState('');
    const [item_url, setitem_url] = useState('');
    const [item_quantity, setitem_quantity] = useState('');
    const [item_category, setitem_category] = useState('');
    const [item_calories, setitem_calories] = useState('');
    const [item_protein, setitem_protein] = useState('');
    const [orders, setOrders] = useState([]);
    const [readyForPickUp, setReadyForPickUp] = useState([]);
    const [updatePage, setUpdatePage] = useState(false);
    const [showReasonBoxId, setShowReasonBoxId] = useState(null);
    const [cancelReason, setCancelReason] = useState('');


    const handleConfirmRoleRequest = async (id,email,role,text) => {
       // add code to change in database
        try {
            const res = await fetch("http://localhost:5000/api/role-change/confirm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email, role:role, text:text}),
            });


        } catch (error){
            console.log(error);
        }
        setRoleRequests( prev => prev.filter(req => req.email!==email));
        setUpdatePage(prev=> !prev);
        window.location.reload();

    };

    const handleDenyRoleRequest = async (id,email) => {
        // add code to change in database
        try {
            const res = await fetch("http://localhost:5000/api/role-change/deny", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email}),
            });


        } catch (error){
            console.log(error);
        }
        setRoleRequests( prev => prev.filter(req => req.email!==email));
        setUpdatePage(prev=> !prev);
        window.location.reload();
    };

    const handleConfirmOrder = async (id) => {
        // add code to change order status to ready
        try {
            const res = await fetch("http://localhost:5000/api/order/ready", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({_id: id}),
            });
        } catch (error){
            console.log(error);
        }

        setOrders(prev => prev.filter(req => req.id!==id));
        setUpdatePage(prev => !prev);
        window.location.reload();
    };

    const problemWithOrder = async (id, text) => {
        // add code to change order status to ready
        try {
            const res = await fetch("http://localhost:5000/api/order/problem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({_id: id, notes: text}),
            });
        } catch (error){
            console.log(error);
        }

        setOrders(prev => prev.filter(req => req.id!==id));
        setUpdatePage(prev => !prev);
        window.location.reload();
    };

    const handlePickUpOrder = async (id) => {
        console.log(id);
        try {
            const res = await fetch("http://localhost:5000/api/order/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({_id:id}),
            });
        } catch (error){
            console.log(error);
        }

        setOrders(prev => prev.filter(req => req.id!==id));
        setUpdatePage(prev => !prev);
        window.location.reload();
    };


    const handleAddItem = async () => {
        //resets the input boxes
        setitem_name(""); setitem_url(""); setitem_quantity(""); setitem_calories(""); setitem_protein("");
        //check if the items variables were there
        console.log(item_name, item_url, item_quantity, item_category, item_calories, item_protein)
         try {
             const res = await fetch("http://localhost:5000/api/inventory-add/send", {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify({name: item_name, imageUrl: item_url, quantity: item_quantity, category: item_category, calories: item_calories, protein: item_protein}),
             }); 
         } catch (error){
             console.log(error);
         }
        window.location.reload();
     };

    useEffect(() => {
        fetch('http://localhost:5000/api/retrieve-request')
            .then(res => res.json())
            .then((data) => setRoleRequests(data))
            .catch((err) => console.log(err));

        fetch('http://localhost:5000/api/retrieve-orders')
            .then(res => res.json())
            .then((data) => {
                const placedOrders = data.filter(order => order.status === "placed");
                const readyForPickupOrders = data.filter(order => order.status === "Ready for pickup");
                setOrders(placedOrders);
                setReadyForPickUp(readyForPickupOrders);

            })
            .catch((err) => console.log(err));
    }, [updatePage]);
    return (
        <div className="staff-view">
            <div className="section">
                <h2>Role Requests</h2>
                <p><span style ={{fontWeight: 'bold', textDecoration: 'underline' }}> *Important*. Before confirming students, check that they have completed the online survey. </span></p>
                <table className="role-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
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
                            <td>{req.role}</td>
                            <td>

                                  {req.text}

                            </td>
                            <td>
                                <div className="action-btn">

                                        <button className="accept" onClick={() => handleConfirmRoleRequest(req.id, req.email, req.role,req.text)}>
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
                <h2>Set Orders As Ready To Pickup</h2>
                <h6>*Warning* You cannot undo an order. Ensure all items are accounted before confirming an order.</h6>
                <ul className="orders-list">
                    {orders.map((order) => (
                        <li key={order.id} className="order-item">
                            <div className="order-info">
                                <strong>{order.userName} | {order.userID}</strong>
                                <ul className="item-list">
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} (x{item.quantity})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => handleConfirmOrder(order._id)}>Ready for Pick Up</button>
                            <button onClick={() => setShowReasonBoxId(order._id)}>Cancel Order</button>
                            {showReasonBoxId === order._id && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Enter reason for cancellation"
                                        value={cancelReason}
                                        onChange={(e) => setCancelReason(e.target.value)}
                                    />
                                    <button onClick={() => {
                                        problemWithOrder(order._id, cancelReason);
                                        setShowReasonBoxId(null);
                                        setCancelReason('');
                                    }}>
                                        Submit
                                    </button>
                                    <button onClick={() => setShowReasonBoxId(null)}>Cancel</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="section">
                <h2>Confirm Pick-Up</h2>
                <h6>*Warning* You cannot undo a pick up. Ensure the student has provided an ID.</h6>
                <ul className="orders-list">
                    {readyForPickUp.map((order) => (
                        <li key={readyForPickUp.id} className="order-item">
                            <div className="order-info">
                                <strong>{order.userName} | {order.userID}</strong>
                                <ul className="item-list">
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} (x{item.quantity})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button onClick={() => handlePickUpOrder(order._id)}>Completed</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="section">
                <h2>Add item to Inventory</h2>
                <p><span style ={{fontWeight: 'bold'}}> Warning: Don't spam the confirm button. And there are no validations </span></p>
                <table className="inventory-add-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>imageUrl</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Calories</th>
                        <th>Protein</th>
                        <th>Confirm</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td> <input
                                    type="text"
                                    placeholder="Item Name"
                                    value={item_name}
                                    onChange={(e) => setitem_name(e.target.value)}
                                /></td>
                        <td><input
                                    type="text"
                                    placeholder="Item Url"
                                    value={item_url}
                                    onChange={(e) => setitem_url(e.target.value)}
                                /></td>
                        <td><input
                                    type="Int32"
                                    placeholder="Item Quantity"
                                    value={item_quantity}
                                    onChange={(e) => setitem_quantity(e.target.value)}
                                /></td>
                        <td>
                            <div>
                                <select 
                                value={item_category}  className="category"
                                onChange={(e) => setitem_category(e.target.value)}>
                                    <option value="">select a category</option>
                                    <option value="perishable">perishable</option>
                                    <option value="non-perishable">non-perishable</option>
                                </select>
                            </div>
                        </td>
                        <td><input
                                    type="Int32"
                                    placeholder="Item Calories"
                                    value={item_calories}
                                    onChange={(e) => setitem_calories(e.target.value)}
                                /></td>
                        <td><input
                                    type="Double"
                                    placeholder="Item Protein"
                                    value={item_protein}
                                    onChange={(e) => setitem_protein(e.target.value)}
                                /></td>
                        <td>
                        <div className="action-btn">
                            <button className="accept" onClick={handleAddItem}> 
                                Add item
                            </button>
                        </div>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffView;