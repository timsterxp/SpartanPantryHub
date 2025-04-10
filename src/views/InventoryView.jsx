// add UI code for viewing inventory


import React from 'react';
const InventoryView = () => {
    const inventory = 
        [
            {name: 'Cucumber', quantity: 1, img:'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg', },
            {name: 'Turnip', quantity: 4, img:'https://images.pexels.com/photos/16069702/pexels-photo-16069702/free-photo-of-a-close-up-of-turnips.jpeg'},
            {name: 'Banana', quantity: 5, img: 'https://images.pexels.com/photos/2875814/pexels-photo-2875814.jpeg' },
            {name: 'Radish', quantity: 5, img: 'https://images.pexels.com/photos/7262982/pexels-photo-7262982.jpeg' },
            {name: 'Radish', quantity: 5, img: 'https://images.pexels.com/photos/7262982/pexels-photo-7262982.jpeg' },
            {name: 'Radish', quantity: 5, img: 'https://images.pexels.com/photos/7262982/pexels-photo-7262982.jpeg' },
            {name: 'Radish', quantity: 5, img: 'https://images.pexels.com/photos/7262982/pexels-photo-7262982.jpeg' },
            {name: 'Radish', quantity: 5, img: 'https://images.pexels.com/photos/7262982/pexels-photo-7262982.jpeg' },
            {name: 'Radish', quantity: 5, img: 'https://images.pexels.com/photos/7262982/pexels-photo-7262982.jpeg' },
        ]; 
    inventory.sort((a,b) => a.name.localeCompare(b.name))
    return (
    
    <div className = "inventory">
        <ul style={{ listStyleType: "none", display:'grid', gridTemplateColumns: "repeat(3,1fr" }}> {inventory.map((food, index) => <li key={index}>
            <img className = "inventory-image" src = {food.img} alt = "fuck you"></img> 
            <p className = "inventory-text">{food.name} </p>
            <p className = "inventory-text1">Quantity: {food.quantity}</p> 
            </li>)}</ul>
    </div>);
};

export default InventoryView;