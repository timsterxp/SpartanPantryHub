// add code for viewing checkout screen


import React, {useEffect, useState} from 'react';
import './CheckoutView.css'
import {getUser} from "../models/UserModel";

const user = getUser();

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
    const [updateCart, setUpdateCart] = useState(false);

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
    const handleDecrease = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);

        if (cart[existingItemIndex].quantity > 1) {

            cart[existingItemIndex].quantity -= 1;
        }
        if (cart[existingItemIndex].quantity === 1) {

           cart.splice(existingItemIndex, 1);
        }

        // Save updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        setCart(cart);
        setUpdateCart(prev => !prev);
    };

    // increase the quantity of the specified item
    const handleIncrease = (item) => {
        const existingItemIndex = cart.findIndex(cartItem => cartItem.name === item.name);

            cart[existingItemIndex].quantity += 1;

        // Save updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        setCart(cart);
        setUpdateCart(prev => !prev);
    };

    const prepareCartForDatabase = () => {
        const cartData = cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
        }));
        return cartData;
    };

    const sendCartToDatabase = async () => {
        const cartData = prepareCartForDatabase();  // Get the prepared cart data

        // Retrieve user information from localStorage
        const userName = user.name;
        const userID = user.text;

        const payload = {
            items: cartData,  // Items in the cart (name and quantity)
            userName: userName,  // User's name
            userID: userID,  // User's ID
        };

        try {
            const response = await fetch("http://localhost:5000/api/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (result.ok){
                alert("Your order has been placed successfully");
            }else {
                alert(result.error);
            }
        } catch (error) {
            console.error("Error sending cart to database:", error);
        }
    };

    // handle place order, checking the non-perishable limit
    const handlePlaceOrder = () => {
        const updateUser = JSON.parse(localStorage.getItem("user"));
        if (!canPlaceOrder) {
            setErrorMessage("Non-perishable item limit exceeded (max 6 items).");
            return;
        }

        if (updateUser.visits===0){
            setErrorMessage("You have used up your visits for the week");
            return;
        }
        setErrorMessage("");
        // Proceed with placing the order
        sendCartToDatabase();
        alert("Order placed!");

        updateUser.visits -=1;
        localStorage.setItem("user", JSON.stringify(updateUser));

        //add order to database, and set cart to empty
        const emptyCart = []
        setCart(emptyCart)
        localStorage.removeItem("cart");
    };



    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, [updateCart]);


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
                                    onClick={() => handleDecrease(item)}
                                >
                                    &ndash;
                                </button>
                                <button
                                    className="increase-btn"
                                    onClick={() => handleIncrease(item)}
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