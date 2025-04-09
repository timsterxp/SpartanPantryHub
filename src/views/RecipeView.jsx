// add code for viewing / adding recipes here


import React from 'react';
import {useState} from "react";
import RecipeController from "../controllers/RecipeController";

const RecipeView = () => {
        const [inputValue, setInputValue] = useState("");
        const [responseMessage, setResponseMessage] = useState("");
        const [recipe, setRecipe] = useState({
            recipeName:"",
            ingredients: [],
            instructions: [],
        })

        const handleChange = (event) => {
            setInputValue(event.target.value);
        };

    const handleConfirm = async () => {
        if (!inputValue) return;

        const response = await RecipeController.sendRecipeToAPI(inputValue);

        //Note that server response is just me checking to see what my backend is sending. Do not use serverResponse anywhere
        if (response) {
            setResponseMessage(`Server Response: ${JSON.stringify(response)}`);
            setRecipe(response);
        } else {
            setResponseMessage("Failed to send ingredient list to the server.");
        }

     //   setInputValue(""); // Clear input after sending
    };

    const renderList = (items) => {
        return items.map((item, index) => (
            <p key={index} >
                {item}
            </p>
        ));
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
            <h2>{recipe.recipeName}</h2>
            <h2>Ingredients:</h2>
            {renderList(recipe.ingredients)}
            <h2>Instructions:</h2>
            {renderList(recipe.instructions)}
        </div>
    );
};

export default RecipeView;