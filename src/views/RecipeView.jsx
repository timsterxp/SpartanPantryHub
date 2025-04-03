// add code for viewing / adding recipes here


import React from 'react';
import {useState} from "react";
import RecipeController from "../controllers/RecipeController";

const RecipeView = () => {
        const [inputValue, setInputValue] = useState("");
        const [responseMessage, setResponseMessage] = useState("");

        const handleChange = (event) => {
            setInputValue(event.target.value);
        };

    const handleConfirm = async () => {
        if (!inputValue) return;

        const response = await RecipeController.sendRecipeToAPI(inputValue);

        if (response) {
            setResponseMessage(`Server Response: ${JSON.stringify(response)}`);
        } else {
            setResponseMessage("Failed to send ingredient list to the server.");
        }

        setInputValue(""); // Clear input after sending
    };

    return (
        <div>
            <h2>Edit me in RecipeView</h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter inventory item"
            />
            <button onClick={handleConfirm}>Confirm</button>
            {responseMessage.ingredients && <p>{responseMessage.instructions}</p>}
        </div>
    );
};

export default RecipeView;