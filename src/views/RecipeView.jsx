// add code for viewing / adding recipes here


import React from 'react';
import {useState} from "react";
import RecipeController from "../controllers/RecipeController";
import "./RecipeView.css";

// Move the below code elsewhere later. Set up dummy cards.

const recipes = [
    {
        id: 1,
        name: "Random Spaghetti",
        ingredients: ["Spaghetti", "Tomato", "Ground Beef", "Onion", "Garlic"],
        instructions: "Random instructions.",
    },
    {
        id: 2,
        name: "Avocado Toast",
        ingredients: ["Bread", "Avocado", "Salt", "Lemon"],
        instructions: "Toast ... mash... combine",
    },
    // Add more recipes as needed
];

const RecipeCard = ({ recipe, isExpanded, onClick }) => (
    <div
        className={`recipe-card ${isExpanded ? 'expanded' : ''}`}
        onClick={onClick}
    >
        <h2 className="recipe-title">{recipe.name}</h2>

        {isExpanded && (
            <div className="recipe-details">
                <h3>Ingredients:</h3>
                <ul>
                    {recipe.ingredients.map((ing, idx) => (
                        <li key={idx}>{ing}</li>
                    ))}
                </ul>
                <h3>Instructions:</h3>
                <p>{recipe.instructions}</p>
            </div>
        )}
    </div>
);

const RecipeView = () => {
        const [inputValue, setInputValue] = useState("");
        const [responseMessage, setResponseMessage] = useState("");
        const [recipe, setRecipe] = useState({
            recipeName:"",
            ingredients: [],
            instructions: [],
        })
        const [expandedId, setExpandedId] = useState(null);
    const handleCardClick = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

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
            <h2>Edit me in RecipeView
                {recipes.map((recipe) => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        isExpanded={expandedId === recipe.id}
                        onClick={() => handleCardClick(recipe.id)}
                    />
                ))}</h2>
            <h2>Want to generate a whole new recipe? Input your ingredient items below!</h2>
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