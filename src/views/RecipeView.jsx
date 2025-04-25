// add code for viewing / adding recipes here


import React from 'react';
import {useState} from "react";
import RecipeController from "../controllers/RecipeController";
import "./RecipeView.css";

// Move the below code elsewhere later. Set up dummy cards.

const recipes = [
    {
        id: 1,
        name: 'Spaghetti Carbonara',
        ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan Cheese', 'Black Pepper'],
        instructions: [
            'Boil pasta until al dente.',
            'Cook pancetta until crispy.',
            'Mix eggs and cheese in a bowl.',
            'Combine all ingredients and stir over low heat.'
        ]
    },
    {
        id: 2,
        name: 'Chicken Alfredo',
        ingredients: ['Fettuccine', 'Chicken Breast', 'Heavy Cream', 'Butter', 'Parmesan'],
        instructions: [
            'Cook pasta.',
            'Sauté chicken until golden.',
            'Simmer cream and butter, add cheese.',
            'Combine everything together.'
        ]
    },
    {
        id: 3,
        name: 'Beef Tacos',
        ingredients: ['Ground Beef', 'Taco Shells', 'Lettuce', 'Cheddar', 'Salsa'],
        instructions: [
            'Cook beef with seasoning.',
            'Assemble in taco shells with toppings.'
        ]
    }
    // Add more recipes as needed
];


const RecipeView = () => {
        const [inputValue, setInputValue] = useState("");
        const [responseMessage, setResponseMessage] = useState("");
        const [recipe, setRecipe] = useState({
            recipeName:"",
            ingredients: [],
            instructions: [],
        })
    const [searchQuery, setSearchQuery] = useState('');
    const [expanded, setExpanded] = useState(null);
    const [clickedButton, setClickedButton] = useState(false);

    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleExpand = (id) => {
        setExpanded(prev => (prev === id ? null : id));
    };

        const handleChange = (event) => {
            setInputValue(event.target.value);
        };

    const handleConfirm = async () => {
        if (!inputValue) return;
        setClickedButton(true);
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
        <div className={`recipe-container ${expanded !== null ? 'expanded-card' : ''}`}>
            <h1 className="recipe-title">Recipes</h1>

            <div className="recipe-grid">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.id}
                        className={`recipe-card ${expanded === recipe.id ? 'expanded' : ''}`}
                        onClick={() => toggleExpand(recipe.id)}
                    >
                        <h2 className="recipe-name">{recipe.name}</h2>

                        {expanded === recipe.id && (
                            <div className="recipe-details">
                                <h3>Ingredients:</h3>
                                <ul>
                                    {recipe.ingredients.map((item, idx) => (
                                        <li key={idx}>{item}</li>
                                    ))}
                                </ul>

                                <h3>Instructions:</h3>
                                <ol>
                                    {recipe.instructions.map((step, idx) => (
                                        <li key={idx}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        )}
                    </div>
                ))}

                {filteredRecipes.length === 0 && (
                    <p className="no-results">No recipes match your search.</p>
                )}
            </div>
            <h2> Can't find a recipe you like? Generate one here with your ingredients! Note that it'll take a few seconds to generate! </h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter inventory item"
            />
            <button onClick={handleConfirm}>Confirm</button>
            {clickedButton &&
                <div>
                    <h2>{recipe.recipeName}</h2>
                <h2>Ingredients:</h2>
            {renderList(recipe.ingredients)}
                <h2>Instructions:</h2>
            {renderList(recipe.instructions)}
                </div>


            }

        </div>


    );
};

export default RecipeView;