import React, {useEffect, useState} from 'react';
import './StaffView.css';
import { isValidDateValue } from '@testing-library/user-event/dist/utils';

const StaffView = () => {
    const [roleRequests, setRoleRequests] = useState([]);
    const [item_name, setitem_name] = useState('');
    const [item_url, setitem_url] = useState('');
    const [item_quantity, setitem_quantity] = useState('');
    const [item_category, setitem_category] = useState('');
    const [item_calories, setitem_calories] = useState('');
    const [item_protein, setitem_protein] = useState('');
    const [InventoryItem, setInventoryItem] = useState([]);
    const [inventorymenu, setinventorymenu] = useState('');
    const [orders, setOrders] = useState([]);
    const [readyForPickUp, setReadyForPickUp] = useState([]);
    const [updatePage, setUpdatePage] = useState(false);
    const [showReasonBoxId, setShowReasonBoxId] = useState(null);
    const [cancelReason, setCancelReason] = useState('');
    const [inventory, setInventory] = useState([]);
    const [selectedItemName, setSelectedItemName] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        imageurl: '',
        quantity: '',
        category: '',
        calories: '',
        protein: ''
    });


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
    //handles when the adding button
    const handleAddItem = async () => {
        //resets the input boxes
        setitem_name(""); setitem_url(""); setitem_quantity(""); setitem_calories(""); setitem_protein("");
        //check if the items variables were there
        console.log(item_name, item_url, item_quantity, item_category, item_calories, item_protein)
        //tells the users what item was added
        alert("You added " + item_name + " to the inventory list")
        //connecting to the api to tell it add a new item
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
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const updateInventoryItem = async () => {
        if (!selectedItemName) {
            alert("Please select an item");
            return;
        }
        const payload = {
            name: selectedItemName,
            ...formData
        };
        console.log(payload);
        try {
            const res = await fetch("http://localhost:5000/api/inventory/update", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( payload)
            });

            const result = await res.json();
            if (result.success) {
                alert("Item updated successfully!");
                setFormData({ imageurl: '', quantity: '', category: '', calories: '', protein: '' });
            } else {
                alert("Failed to update item.");
            }
        } catch (err) {
            console.error('Update error:', err);
            alert("Error updating item.");
        }
    };
     //handles updating an item.
     const handleupdateItem = async () => {
        //resets the input boxes
        setitem_name(""); setitem_url(""); setitem_quantity(""); setitem_calories(""); setitem_protein("");
        //check if the items variables were there
        console.log(item_name, item_url, item_quantity, item_category, item_calories, item_protein)
        //tells the users what item was added
        alert("You updated " + item_name + " to the inventory list")
        //tell api to update a certain item
         try {
             const res = await fetch("http://localhost:5000/api/inventory-update/send", {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                 },
                 body: JSON.stringify({name: item_name, imageUrl: item_url, quantity: item_quantity, category: item_category, calories: item_calories, protein: item_protein}),
             }); 
         } catch (error){
             console.log(error);
         }
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
        fetch('http://localhost:5000/api/retrieve-inventory')
            .then(res => res.json())
            .then(data => setInventory(data))
            .catch((err) => console.log(err));

        const item = inventory.find(i => i.name === selectedItemName);
        if (item) {
            setFormData({ ...item });
        }
    }, [updatePage]);
    useEffect(() => {
        const item = inventory.find(i => i.name === selectedItemName);
        if (item) {
            setFormData({ ...item }); // includes item.name
        }
    }, [selectedItemName, inventory]);
    //retrieves the inventory
    useEffect(()=>{
        fetch('http://localhost:5000/api/retrieve-inventory').then(res => res.json()).then((data) => setInventoryItem(data)).catch((err) => console.log(err));
    });

    const handlefillin = (e) =>{
        const item_name = e.target.value;
        const itemindex = InventoryItem.findIndex((item) => item.name === item_name);
        console.log(item_name, item_url, item_quantity, item_category, item_calories, item_protein)
        setitem_name(item_name);
        setitem_url(InventoryItem[itemindex].imageUrl);
        setitem_quantity(InventoryItem[itemindex].quantity);
        setitem_category(InventoryItem[itemindex].category);
        setitem_calories(InventoryItem[itemindex].calories);
        setitem_protein(InventoryItem[itemindex].protein);
    }
    //orders the inventory in alphabetical
    InventoryItem.sort((a,b) => a.name.localeCompare(b.name))
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
            <select value={inventorymenu} className='inventorymenu' 
            onChange={(e) => setinventorymenu(e.target.value)}>
                 <option value="">Select inventory options</option>
                 <option value="add_item">add item to inventory</option>
                 <option value="update_item">update inventory item</option>
            </select>
            {inventorymenu ==='add_item' && (
                <div className="inventorysection">
                <h2>Add item to Inventory</h2>
                <p><span style ={{fontWeight: 'bold'}}> Warning: there are no input validations </span></p>
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
                                    type="text"
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
                                    type="text"
                                    placeholder="Item Calories"
                                    value={item_calories}
                                    onChange={(e) => setitem_calories(e.target.value)}
                                /></td>
                        <td><input
                                    type="text"
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
                <div>
                <h2>Edit Inventory Item</h2>
                <h4 style={{textAlign:'center'}}>(You may leave fields blank to keep the previous value)</h4>
                <select value={selectedItemName} onChange={e => setSelectedItemName(e.target.value)}>
                    <option value="">-- Select Item --</option>
                    {inventory.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>

                <div>
                    <p> <input type="text" name="imageurl" placeholder="Image URL" value={formData.imageurl} onChange={handleChange} /></p>
                    <p> <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange}  /></p>
                        <p><input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} /></p>
                            <p> <input type="number" name="calories" placeholder="Calories" value={formData.calories} onChange={handleChange}  /></p>
                                <p><input type="number" name="protein" placeholder="Protein" value={formData.protein} onChange={handleChange}  /></p>
                </div>

                <button onClick={updateInventoryItem}>Update Item</button>
            </div>
            </div>
            

            
            )}
            {inventorymenu ==='update_item' &&(
                <div className="inventorysection">
                <h2>Edit item to Inventory</h2>
                <p><span style ={{fontWeight: 'bold'}}> Warning: there are no input validations </span></p>
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
                        <td> 
                            <select 
                            value={item_name} className = "name_dropdown" 
                            onChange={handlefillin}>
                                <option value="">select a item</option>
                                {InventoryItem.map(item => (
                                    <option>{item.name}</option>
                                ))}
                            </select>

                        </td>
                        <td><input
                                    type="text"
                                    placeholder="Item Url"
                                    value={item_url}
                                    onChange={(e) => setitem_url(e.target.value)}
                                /></td>
                        <td><input
                                    type="text"
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
                                    type="text"
                                    placeholder="Item Calories"
                                    value={item_calories}
                                    onChange={(e) => setitem_calories(e.target.value)}
                                /></td>
                        <td><input
                                    type="text"
                                    placeholder="Item Protein"
                                    value={item_protein}
                                    onChange={(e) => setitem_protein(e.target.value)}
                                /></td>
                        <td>
                        <div className="action-btn">
                            <button className="accept" onClick={handleupdateItem}> 
                                Update item
                            </button>
                        </div>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            )}
            
        </div>

    );
};

export default StaffView;