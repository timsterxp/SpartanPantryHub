
import React, {useEffect, useId, useRef, useState} from 'react';
import './InventoryView.css';

/**
 * InventoryView focuses on providing the user the pantry stock and an option to add to cart
 * @returns {JSX.Element}
 * @constructor
 */
const InventoryView = () => {
    const [expandedItem, setExpandedItem] = useState(null);
    const [InventoryItem, setInventoryItem] = useState([]);
// handles the expanding of the item cards
    const handleToggle = (id) => {
        setExpandedItem(prev => (prev === id ? null : id));
    };

    const handleAddItem = (item) => {

        // Get the existing cart from localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check for existing item by name
        const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);

        if (existingItemIndex >= 0) {
            // Item exists: increment quantity
            cart[existingItemIndex].quantity += 1;
        } else {
            // New item: add with quantity 1
            cart.push({...item, quantity: 1});
        }

        // Save updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added " + item.name);
    };
    useEffect(() => {
        fetch('http://localhost:5000/api/retrieve-inventory').then(res => res.json()).then((data) => setInventoryItem(data)).catch((err) => console.log(err));
    });

    InventoryItem.sort((a, b) => a.name.localeCompare(b.name))
    return (
        <div className="inventory-grid">
            {InventoryItem.map(item => ( //map each element in the inventoryitem array and displays it
                <div
                    key={item._id.toString()}
                    className={`item-card-inventory ${expandedItem === item.id ? 'expanded' : ''}`}
                    onClick={() => handleToggle(item.id)}
                >
                    <img src={item.imageUrl} alt={item.name} className="item-image"/>
                    <h3 className="item-name">{item.name}</h3>
                    <p><strong>Quantity:</strong> {item.quantity}</p>

                    {expandedItem === item.id && (
                        <div className="item-details">
                            <p><strong>Calories:</strong> {item.calories} </p>
                            <p><strong>Protein:</strong> {item.protein} g</p>
                            <p><strong>Category:</strong> {item.category}</p>
                            <button className="add-to-cart" onClick={() => handleAddItem(item)}>
                                Add to Cart
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default InventoryView;