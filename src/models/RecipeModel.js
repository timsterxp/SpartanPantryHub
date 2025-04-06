// The RecipeModel will help parse the response from the backend server (Controller provides it).
// OpenAI is currently giving responses in the format of Recipe Name, Ingredients and Instructions which is parsed to look nice


const RecipeModel = {
    parseRecipe: (recipeText) => {
        if (!recipeText) {
            return {
                recipeName: "No recipe found.",
                ingredients: ["No ingredients found."],
                instructions: ["No instructions found."]
            };
        }

        recipeText = recipeText.replace(/\*\*/g, ""); //Remove all bolding that OpenAI provides
        const recipeName = recipeText.split("\n")[0]; // Get the first line as the recipe name
        console.log(recipeName);

        const ingredientsSection = recipeText.match(/Ingredients:[\s\S]*?Instructions:/i);
        const ingredients = ingredientsSection
            ? ingredientsSection[0]
                .replace(/Ingredients:/i, '')
                .split("\n")
                .map(line => line.trim())
                .filter(line => line && line !== "Ingredients:")
            : [];

        const instructionsSection = recipeText.split("Instructions:")[1];
        const instructions = instructionsSection
            ? instructionsSection.split("\n").map(line => line.trim()).filter(line => line)
            : [];

        return {
            recipeName,
            ingredients,
            instructions,
        };
    }
};
export default RecipeModel;