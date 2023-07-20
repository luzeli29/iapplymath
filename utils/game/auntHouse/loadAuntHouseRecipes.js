import loadJSONFromUrl from "@utils/staticData/loadJSONFromUrl";
import mergeObjectsIntoObjectByKeys from "@utils/staticData/mergeObjectsIntoObjectByKeys"
import DevLog from "@utils/debug/devLog";

const loadAuntHouseRecipes = async () => {

    let recipes = await loadJSONFromUrl('utils/game/recipes/recipeData/recipes.json')
    recipes = recipes.recipe
    
    //Filter to only AH Recipes
    Object.keys(recipes).forEach(key => {
        if (!recipes[key].showInAuntHouse) delete recipes[key];
    });

    console.log(Object.entries(recipes))
    const ingredients = await loadJSONFromUrl('utils/game/recipes/recipeData/ingredients.json')
    const servingTypes = await loadJSONFromUrl('utils/game/recipes/recipeData/servingTypes.json')

    mergeObjectsIntoObjectByKeys(recipes,{...ingredients,...servingTypes})

    DevLog('-----Loaded Recipes-----')

    return recipes
}

export default loadAuntHouseRecipes;