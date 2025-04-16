// add code for viewing checkout screen


import React, {useState} from 'react';
import './CheckoutView.css'

//dummyitems
const cartItems = [
    { id: 1, name: "Milk", category: "perishable", quantity: 1 },
    { id: 2, name: "Apple", category: "perishable", quantity: 1 },
    { id: 3, name: "Canned Beans", category: "non-perishable", quantity: 2 },
    { id: 4, name: "Pasta", category: "non-perishable", quantity: 3 },
    { id: 5, name: "Rice", category: "non-perishable", quantity: 2 },
];

const DummyCheckout = () => {
    // use state for the cart items
    const [cart, setCart] = useState(cartItems);
    const [errorMessage, setErrorMessage] = useState("");

    // filter cart items by category
    const perishables = cart.filter((item) => item.category === "perishable");
    const nonPerishables = cart.filter((item) => item.category === "non-perishable");

    // Calculate total non-perishable quantity
    const totalNonPerishableQty = nonPerishables.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Determine if non-perishable limit is exceeded (limit: 6)
    const nonPerishableLimit = 6;
    const canPlaceOrder = totalNonPerishableQty <= nonPerishableLimit;
    const isAboveLimit = totalNonPerishableQty > nonPerishableLimit;

    // decrease the quantity of the specified item
    const handleDecrease = (id) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0) // remove items with 0 quantity
        );
    };

    // increase the quantity of the specified item
    const handleIncrease = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // handle place order, checking the non-perishable limit
    const handlePlaceOrder = () => {
        if (!canPlaceOrder) {
            setErrorMessage("Non-perishable item limit exceeded (max 6 items).");
            return;
        }
        setErrorMessage("");
        // Proceed with placing the order
        alert("Order placed!");

        //add order to database, and set cart to empty
        const emptyCart = []
        setCart(emptyCart)
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>

            <div className="category-section">
                <h3>Perishables (Unlimited)</h3>
                <div className="item-grid">
                    {perishables.map((item) => (
                        <div key={item.id} className="item-card">
              <span>
                {item.name} (x{item.quantity})
              </span>
                            <div className="quantity-controls">
                                <button
                                    className="reduce-btn"
                                    onClick={() => handleDecrease(item.id)}
                                >
                                    &ndash;
                                </button>
                                <button
                                    className="increase-btn"
                                    onClick={() => handleIncrease(item.id)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="category-section">
                <h3>Non-Perishables (Limit: 6)</h3>
                <div className="item-grid">
                    {nonPerishables.map((item) => (
                        <div key={item.id} className="item-card">
              <span>
                {item.name} (x{item.quantity})
              </span>
                            <div className="quantity-controls">
                                <button
                                    className="reduce-btn"
                                    onClick={() => handleDecrease(item.id)}
                                >
                                    &ndash;
                                </button>
                                <button
                                    className="increase-btn"
                                    onClick={() => handleIncrease(item.id)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <p className={canPlaceOrder ? "limit-ok" : "limit-warning"}>
                    Total: {totalNonPerishableQty}/{nonPerishableLimit}
                </p>
            </div>

            {isAboveLimit && (
                <p className="warning-message">
                    Warning: Non-perishable items exceed the limit of {nonPerishableLimit}.
                </p>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={!canPlaceOrder}
            >
                Place Order
            </button>
        </div>
    );
};

export default DummyCheckout;