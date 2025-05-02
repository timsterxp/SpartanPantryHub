// add code for viewing / adding recipes here


import React, {useEffect} from 'react';
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
        const [recipe, setRecipe] = useState({
            recipeName:"",
            ingredients: [],
            instructions: [],
        })

        const [officalRecipe, setOfficialRecipe] = useState(  []);

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
        setRecipe (response);
    };

    useEffect(()=>{
        fetch('http://localhost:5000/api/retrieve-recipe').then(res => res.json()).then((data) => setOfficialRecipe(data)).catch((err) => console.log(err));
    });

    const renderList = (items) => {
        return items.map((item, index) => (
            <p key={index} >
                {item}
            </p>
        ));
    };

    const renderRecipeList = (str) => {
        const items = str.split(/\d+\.\s/).filter(item => item.trim() !== '');
        return (
            <ul>
                {items.map((item, idx) => (
                    <li key={idx}>{item.trim()}</li>
                ))}
            </ul>
        );
    };

    const renderOrderedList = (str) => {
        const items = str.split(/\d+\.\s/).filter(item => item.trim() !== '');
        return (
            <ol>
                {items.map((item, idx) => (
                    <li key={idx}>{item.trim()}</li>
                ))}
            </ol>
        );
    };

    return (
        <div className={`recipe-container ${expanded !== null ? 'expanded-card' : ''}`}>
            <h1 className="recipe-title">Recipes</h1>

            <div className="recipe-grid">
                {officalRecipe.map((recipe) => (
                    <div
                        key={recipe._id}
                        className={`recipe-card ${expanded === recipe._id ? 'expanded' : ''}`}
                        onClick={() => toggleExpand(recipe._id)}
                    >
                        <h2 className="recipe-name">{recipe.recipeName}</h2>

                        {expanded === recipe._id && (
                            <div className="recipe-details">
                                <h3>Ingredients:</h3>

                                {renderRecipeList(recipe.Ingredients)}


                                <h3>Instructions:</h3>

                                {renderOrderedList(recipe.Instructions)}

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
                placeholder="Enter ingredients"
            />
            <p style={{paddingBottom: '1px'}}></p>
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