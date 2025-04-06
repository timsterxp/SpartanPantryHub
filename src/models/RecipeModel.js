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


        const ingredientsSection = recipeText.match(/Ingredients:[\s\S]*?Instructions:/i);
        const ingredients = ingredientsSection
            ? ingredientsSection[0]
                .replace(/Ingredients:/i, '')             // Remove the 'Ingredients:' label
                .replace(/Instructions:/i, '')           // Remove the 'Instructions:' label
                .split("\n")                             // Split by newlines
                .map(line => line.trim())                // Trim each line
                .filter(line => line.length > 0)         // Ensure no empty lines remain
            : [];

        const instructionsSection = recipeText.split("Instructions:")[1];  // Split after 'Instructions:'
        const instructions = instructionsSection
            ? instructionsSection
                .split("\n")                             // Split instructions by lines
                .map(line => line.trim())                // Trim extra whitespace
                .filter(line => line.length > 0)         // Ensure no empty lines remain
            : [];


        return {
            recipeName,
            ingredients,
            instructions,
        };
    }
};
export default RecipeModel;