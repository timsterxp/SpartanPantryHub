// add code for viewing checkout screen


import React from 'react';
import './CheckoutView.css'

//dummyitems
const inventoryItems = [
    { id: 1, name: "Milk", category: "perishable" },
    { id: 2, name: "Apple", category: "perishable" },
    { id: 3, name: "Canned Beans", category: "non-perishable" },
    { id: 4, name: "Pasta", category: "non-perishable" },
    { id: 5, name: "Rice", category: "non-perishable" },
];
const dummyQuantities = {
    1: 2,
    2: 1,
    3: 1,
    4: 3,
    5: 2,
};

const DummyCheckout = () => {
    const perishables = inventoryItems.filter(item => item.category === 'perishable');
    const nonPerishables = inventoryItems.filter(item => item.category === 'non-perishable');

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>

            <div className="category-section">
                <h3>Perishables (Unlimited)</h3>
                <div className="item-grid">
                    {perishables.map(item => (
                        <div key={item.id} className="item-card">
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>

            <div className="category-section">
                <h3>Non-Perishables (Limit: 6)</h3>
                <div className="item-grid">
                    {nonPerishables.map(item => (
                        <div key={item.id} className="item-card">
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default DummyCheckout;