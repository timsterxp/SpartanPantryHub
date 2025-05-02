// add UI code for viewing inventory
import React, {useEffect, useId, useState} from 'react';
import './InventoryView.css';


const InventoryView = () => {
    const [expandedItem, setExpandedItem] = useState(null);
    const [InventoryItem, setInventoryItem] = useState([]);
    
    const handleToggle = (id) => {
        setExpandedItem(prev => (prev === id ? null : id));
    };
     useEffect(()=>{
            fetch('http://localhost:5000/api/retrieve-inventory').then(res => res.json()).then((data) => setInventoryItem(data)).catch((err) => console.log(err));
        });
  
    InventoryItem.sort((a,b) => a.name.localeCompare(b.name))
    return (
        <div className="inventory-grid">
            {InventoryItem.map(item => (
                <div
                    key={item._id.toString()}
                    className={`item-card-inventory ${expandedItem === item.id ? 'expanded' : ''}`}
                    onClick={() => handleToggle(item.id)}
                >
                    <img src={item.imageUrl} alt={item.name} className="item-image" />
                    <h3 className="item-name">{item.name}</h3>
                    <p><strong>Quantity:</strong> {item.quantity}</p>

                    {expandedItem === item.id && (
                        <div className="item-details">
                            <p><strong>Calories:</strong> {item.calories} </p>
                            <p><strong>Protein:</strong> {item.protein} g</p>
                            <p><strong>Category:</strong> {item.category}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default InventoryView;