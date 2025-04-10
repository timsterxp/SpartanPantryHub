// add UI code for viewing inventory


import React, {useId, useState} from 'react';
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
        {
            id: 3,
            name: "Cucumber",
            imageUrl: "https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg",
            quantity: 19,
            category: "perishable",
            nutrition: {
                calories: 45,
                protein: 0.7,
            },
        },
        {
            id: 4,
            name: "Turnip",
            imageUrl: "https://images.pexels.com/photos/16069702/pexels-photo-16069702/free-photo-of-a-close-up-of-turnips.jpeg",
            quantity: 21,
            category: "perishable",
            nutrition: {
                calories: 34,
                protein: 1.1,
            }, 
        },
        {
            id: 5,
            name: "Banana",
            imageUrl: "https://images.pexels.com/photos/2875814/pexels-photo-2875814.jpeg",
            quantity: 16,
            category: "perishable",
            nutrition: {
                calories: 105,
                protein: 1.3,
            },  
        },
        {
            id: 6,
            name: "Radish",
            imageUrl: "https://images.pexels.com/photos/7262982/pexels-photo-7262982.jpeg",
            quantity: 36,
            category: "perishable",
            nutrition: {
                calories: 1,
                protein: 0.1,
            },  
        },
        {
            id: 7,
            name: "Oranges",
            imageUrl: "https://images.pexels.com/photos/51958/oranges-fruit-vitamins-healthy-eating-51958.jpeg",
            quantity: 25,
            category: "perishable",
            nutrition: {
                calories: 45,
                protein: 0.9,
            },  
        },
        // more items...
    ];
    inventoryItems.sort((a,b) => a.name.localeCompare(b.name))
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
                    <p><strong>Quantity:</strong> {item.quantity}</p>

                    {expandedItem === item.id && (
                        <div className="item-details">
                            <p><strong>Calories:</strong> {item.nutrition.calories} </p>
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