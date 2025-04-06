import RecipeModel from "../models/RecipeModel";

const RecipeController = {
    sendRecipeToAPI: async (rawText) => {
        const url = process.env.REACT_APP_BACKEND_URL;
        rawText += "Give me a recipe with the following ingredients: "
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "prompt": rawText }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); // Response from the API
            const dataToCheck = data.response;
          //  return dataToCheck;
            return RecipeModel.parseRecipe(dataToCheck); // Process the response
        } catch (error) {
            console.error("Error sending recipe:", error);
            return { ingredients: "Error fetching ingredients.", instructions: "Error fetching instructions." };
        }
    },
};

export default RecipeController;