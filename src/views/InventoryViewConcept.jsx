// add UI code for viewing inventory


import React, {useState} from 'react';
import './InventoryView.css';


const InventoryView = () => {
    const [expandedItem, setExpandedItem] = useState(null);

    const handleToggle = (id) => {
        setExpandedItem(prev => (prev === id ? null : id));
    };

    const inventoryItems = [
        {
            id: 1,
            name: "Peanut Butter",
            imageUrl: "/peanutbutter.png",
            quantity: 12,
            category: "non-perishable",
            nutrition: {
                calories: 190,
                protein: 8,
            },
        },
        {
            id: 2,
            name: "Apple",
            imageUrl: "/apple.png",
            quantity: 30,
            category: "perishable",
            nutrition: {
                calories: 95,
                protein: 0.5,
            },
        },
        // more items...
    ];

    return (
        <div className="inventory-grid">
            {inventoryItems.map(item => (
                <div
                    key={item.id}
                    className={`item-card ${expandedItem === item.id ? 'expanded' : ''}`}
                    onClick={() => handleToggle(item.id)}
                >
                    <img src={item.imageUrl} alt={item.name} className="item-image" />
                    <h3 className="item-name">{item.name}</h3>

                    {expandedItem === item.id && (
                        <div className="item-details">
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                            <p><strong>Calories:</strong> {item.nutrition.calories} kcal</p>
                            <p><strong>Protein:</strong> {item.nutrition.protein} g</p>
                            <p><strong>Category:</strong> {item.category}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default InventoryView;