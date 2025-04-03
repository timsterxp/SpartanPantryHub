const RecipeModel = {
    parseRecipe: (rawText) => {
        // Because I'm currently not forcing openAI to cut instructions. we do the parsing here

        const splitIndex = rawText.indexOf("Instructions:");
        if (splitIndex === -1) {
            return { ingredients: rawText.trim(), instructions: "No instructions found. Please try another recipe" };
        }
        const ingredients = rawText.substring(0, splitIndex).trim();
        const instructions = rawText.substring(splitIndex + "Instructions:".length).trim();
        return { ingredients, instructions };
    },
};

export default RecipeModel;