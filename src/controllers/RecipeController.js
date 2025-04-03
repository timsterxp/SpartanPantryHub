import RecipeModel from "../models/RecipeModel";

const RecipeController = {
    sendRecipeToAPI: async (rawText) => {
        const url = "pantryhub.duckdns.org"

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: rawText }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); // Response from the API
            return RecipeModel.parseRecipe(data.recipeText); // Process the response
        } catch (error) {
            console.error("Error sending recipe:", error);
            return { ingredients: "Error fetching ingredients.", instructions: "Error fetching instructions." };
        }
    },
};

export default RecipeController;