import React, {useEffect, useState} from 'react';
import './StaffView.css';
import {isValidDateValue} from '@testing-library/user-event/dist/utils';
import {getUser} from "../models/UserModel";
import {Link} from "react-router-dom";

/*
StaffView will provide Staff members multiple options:
- Accept/Deny pantry users
- Set an order as ready to pick up/Confirm a pick up
- Add an item to inventory
- Edit an item in inventory
- Log an inperson transaction
 */
const StaffView = () => {
    const [roleRequests, setRoleRequests] = useState([]);
    const [item_name, setitem_name] = useState('');
    const [item_url, setitem_url] = useState('');
    const [item_quantity, setitem_quantity] = useState('');
    const [item_category, setitem_category] = useState('');
    const [item_calories, setitem_calories] = useState('');
    const [item_protein, setitem_protein] = useState('');
    const [InventoryItem, setInventoryItem] = useState([]);
    const [orders, setOrders] = useState([]);
    const [readyForPickUp, setReadyForPickUp] = useState([]);
    const [updatePage, setUpdatePage] = useState(false);
    const [showReasonBoxId, setShowReasonBoxId] = useState(null);
    const [cancelReason, setCancelReason] = useState('');
    const [inventory, setInventory] = useState([]);
    const [selectedItemName, setSelectedItemName] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        quantity: '',
        category: '',
        calories: '',
        protein: ''
    });

    const user = getUser();


    //If confirming, change their role
    const handleConfirmRoleRequest = async (id, email, role, text) => {
        // add code to change in database
        setRoleRequests(prev => prev.filter(req => req.email !== email));
        try {
            const res = await fetch("http://localhost:5000/api/role-change/confirm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email, role: role, text: text}),
            });


        } catch (error) {
            console.log(error);
        }

        setUpdatePage(prev => !prev);


    };

    //If deny, cancel their request
    const handleDenyRoleRequest = async (id, email) => {
        // add code to change in database
        setRoleRequests(prev => prev.filter(req => req.email !== email));
        try {
            const res = await fetch("http://localhost:5000/api/role-change/deny", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email}),
            });


        } catch (error) {
            console.log(error);
        }
        setUpdatePage(prev => !prev);

    };

    /**
     * Confirm an order
     * @param id- Order ID to confirm
     * @returns {Promise<void>}
     */
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
        } catch (error) {
            console.log(error);
        }

        setOrders(prev => prev.filter(req => req.id !== id));
        setUpdatePage(prev => !prev);
    };
    /**
     * If problem with order, append it with reason
     * @param id - Order ID
     * @param text - Denial Reason
     * @returns {Promise<void>}
     */
    const problemWithOrder = async (id, text) => {


        setOrders(prev => prev.filter(req => req._id.toString() !== id));
        try {
            const res = await fetch("http://localhost:5000/api/order/problem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({_id: id, notes: text}),
            });
        } catch (error) {
            console.log(error);
        }


        setUpdatePage(prev => !prev);
    };

    /**
     * Set order as picked up
     * @param id- Order to change
     * @returns {Promise<void>}
     */
    const handlePickUpOrder = async (id) => {
        setReadyForPickUp(prev => prev.filter(req => req._id.toString() !== id));
        try {
            const res = await fetch("http://localhost:5000/api/order/complete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({_id: id}),
            });
        } catch (error) {
            console.log(error);
        }

        setUpdatePage(prev => !prev);

    };

    //Add Item Button is clicked
    const handleAddItem = async () => {
        //resets the input boxes
        setitem_name("");
        setitem_url("");
        setitem_quantity("");
        setitem_calories("");
        setitem_protein("");
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
                body: JSON.stringify({
                    name: item_name,
                    imageUrl: item_url,
                    quantity: item_quantity,
                    category: item_category,
                    calories: item_calories,
                    protein: item_protein
                }),
            });
        } catch (error) {
            console.log(error);
        }
        window.location.reload();
    };
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
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
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });

            const result = await res.json();
            if (result.success) {
                alert("Item updated successfully!");
                setFormData({imageUrl: '', quantity: '', category: '', calories: '', protein: ''});
            } else {
                alert("Failed to update item.");
            }
        } catch (err) {
            console.error('Update error:', err);
            alert("Error updating item.");
        }
    };

    const [studentID, setStudentID] = useState('');
    const handleStudentIDChange = (e) => {
        setStudentID(e.target.value);
    };

    const [quantity, setQuantity] = useState('');
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }

    /**
     * Utilizes local cart to log in-person transactions
     * @param item - Item added
     * @param quantity - Quantity of item
     */
    function addLocalCart(item, quantity) {
        // Get cart from localStorage or initialize empty array
        let myCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if item already exists in the cart
        const existingIndex = myCart.findIndex(cartItem => cartItem.item === item);

        if (existingIndex !== -1) {
            // Update quantity if item already exists
            myCart[existingIndex].quantity += quantity;
        } else {
            // Add new item
            myCart.push({item, quantity});
        }

        // Save updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(myCart));
        window.location.reload();
    }

    const [studentName, setStudentName] = useState('');
    const handleStudentName = (e) => {
        setStudentName(e.target.value);
    }

    /**
     * Slight change to original; will utilize an input student name instead of current user name for in-person transaction done by staff
     * @param studentName - Student name to log order
     * @param studentID - Student ID to log order
     * @returns {Promise<void>}
     */
    const sendCartToDatabase = async (studentName, studentID) => {
        const cartData = JSON.parse(localStorage.getItem('cart'));
        // Retrieve user information from localStorage
        const userName = studentName;
        const userID = studentID;

        const payload = {
            items: cartData,  // Items in the cart (name and quantity)
            userName: userName,  // User's name
            userID: userID,  // User's ID
        };

        try {
            const response = await fetch("http://localhost:5000/api/create-order/inperson", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
        } catch (error) {
            console.error("Error sending cart to database:", error);
        }
        localStorage.removeItem('cart');
        setCart([]);
    };

    const [cart, setCart] = useState([]);

    // Fetch cart from localStorage when the component mounts

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart from localStorage
        setCart(storedCart); // Update state with the cart data
    }, []);

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
            setFormData({...item});
        }
    }, [updatePage]);
    useEffect(() => {
        const item = inventory.find(i => i.name === selectedItemName);
        if (item) {
            setFormData({...item}); // includes item.name
        }
    }, [selectedItemName, inventory]);
    //retrieves the inventory
    useEffect(() => {
        fetch('http://localhost:5000/api/retrieve-inventory').then(res => res.json()).then((data) => setInventoryItem(data)).catch((err) => console.log(err));
    });

    //orders the inventory in alphabetical
    InventoryItem.sort((a, b) => a.name.localeCompare(b.name))
    inventory.sort((a, b) => a.name.localeCompare(b.name))
    return (
        <div className="staff-view">
            { user.role === 'Staff' ? (
            <>
            <div className="section">
                <h2>Role Requests</h2>
                <p><span style={{fontWeight: 'bold', textDecoration: 'underline'}}> *Important*. Before confirming students, check that they have completed the online survey. </span>
                </p>
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

                                    <button className="accept"
                                            onClick={() => {
                                                handleConfirmRoleRequest(req.id, req.email, req.role, req.text);
                                                alert("You have set " + req.name + " as a " + req.role);
                                            }}>
                                        Accept
                                    </button>

                                    <button className="deny" onClick={() => {
                                        handleDenyRoleRequest(req.id, req.email);
                                            alert("You have denied the request for " + req.role);
                                    }}>
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
                            <button onClick={() => {
                                handleConfirmOrder(order._id);
                                    alert("You have confirmed " + order.userName + "'s order is ready for pickup.");
                            }}>Ready for Pick Up
                            </button>
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
                                        alert("You have cancelled " + order.userName + "'s order due to "+ cancelReason);
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
                            <button onClick={() => {handlePickUpOrder(order._id);
                            alert("You have confirmed pick up of " + order.userName + "'s order.");}}>Completed</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="inventorysection-add">
                <h2>Add item to Inventory</h2>
                <p><span style={{fontWeight: 'bold'}}> Warning: there are no input validations </span></p>
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
                        <td><input
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
                            type="number"
                            placeholder="Item Quantity"
                            value={item_quantity}
                            onChange={(e) => setitem_quantity(parseInt(e.target.value))}
                        /></td>
                        <td>
                            <div>
                                <select
                                    value={item_category} className="category"
                                    onChange={(e) => setitem_category(e.target.value)}>
                                    <option value="">select a category</option>
                                    <option value="perishable">perishable</option>
                                    <option value="non-perishable">non-perishable</option>
                                </select>
                            </div>
                        </td>
                        <td><input
                            type="number"
                            placeholder="Item Calories"
                            value={item_calories}
                            onChange={(e) => setitem_calories(parseInt(e.target.value))}
                        /></td>
                        <td><input
                            type="number"
                            placeholder="Item Protein"
                            value={item_protein}
                            onChange={(e) => setitem_protein(parseFloat(e.target.value))}
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
            <div className="inventorysection">
                <h2>Edit item to Inventory</h2>
                <h4 style={{textAlign: 'center'}}>(You may leave fields blank to keep the previous value)</h4>
                <table className="inventory-add-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>ImageUrl</th>
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
                                value={selectedItemName} onChange={e => setSelectedItemName(e.target.value)}>
                                <option value="">-- Select Item --</option>
                                {inventory.map((item, index) => (
                                    <option key={index} value={item.name}>{item.name}</option>
                                ))}
                            </select>

                        </td>
                        <td>
                            <input type="text" name="imageurl" placeholder="Image URL" value={formData.imageUrl}
                                   onChange={handleChange}
                            /></td>
                        <td>
                            <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity}
                                   onChange={handleChange}
                            /></td>
                        <td>
                            <input type="text" name="category" placeholder="Category" value={formData.category}
                                   onChange={handleChange}/>
                        </td>
                        <td>
                            <input type="number" name="calories" placeholder="Calories" value={formData.calories}
                                   onChange={handleChange}
                            /></td>
                        <td>
                            <input type="text" name="protein" placeholder="Protein" value={formData.protein}
                                   onChange={handleChange}
                            /></td>
                        <td>
                            <div className="action-btn">
                                <button className="accept" onClick={updateInventoryItem}>
                                    Update item
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <p style={{paddingBottom: '20px'}}></p>


            {/* Section that allows you to log an in-person transaction*/}
            <div>
                <h2>Log an in-person transaction</h2>
                <h3>Add items to a cart and place it under a student's ID</h3>
                <p></p>

                <select value={selectedItemName} onChange={e => setSelectedItemName(e.target.value)}>
                    <option value="">-- Select Item --</option>
                    {inventory.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}

                </select>
                <p></p>
                <label>

                    <input
                        type="text"
                        value={quantity}
                        onChange={handleQuantityChange}
                        placeholder="quantity"
                    />
                </label>
                <p></p>
                <button className="accept" onClick={() => addLocalCart(selectedItemName, quantity)}>Add Item</button>
                <p></p>
                <h2>Cart Items</h2>
                {cart.length === 0 ? (
                    <p>The Cart Is Empty</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <td>{item.item}</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
                <p style={{paddingBottom: '20px'}}></p>
                <p style={{fontWeight: 'bold'}}>Warning. Place a students name and ID after you have finished creating
                    their cart to prevent accidental orders. </p>
                <label>
                    Student Name:
                    <input
                        type="text"
                        value={studentName}
                        onChange={handleStudentName}
                        placeholder="Enter Student Name"
                    />
                </label>
                <p></p>
                <label>
                    Student ID:
                    <input
                        type="text"
                        value={studentID}
                        onChange={handleStudentIDChange}
                        placeholder="Enter Student ID"
                    />
                </label>
                <p></p>
                <button className="accept" onClick={() => {sendCartToDatabase(studentName, studentID);
                alert("You have logged a transaction for " + studentName);}}>Confirm Student's
                    Items
                </button>
            </div>

            </>
            ) : (
                <Link to='/'>
                    <p>This is a restricted area for staff only. Please log into your staff account.</p>
                </Link>

                )}

        </div>

    );
};

export default StaffView;