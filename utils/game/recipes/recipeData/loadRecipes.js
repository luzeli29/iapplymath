import loadJSONFromUrl from "@utils/staticData/loadJSONFromUrl";
import mergeObjectsIntoObjectByKeys from "@utils/staticData/mergeObjectsIntoObjectByKeys"
import DevLog from "@utils/debug/devLog";

const loadRecipes = async (locationCode, level) => {

    let recipes = await loadJSONFromUrl('utils/game/recipes/recipeData/recipes.json')
    recipes = recipes.recipe
    //Filter to only AH Recipes
    if(locationCode) {
        Object.keys(recipes).forEach(key => {
            if (!recipes[key].locations.includes(locationCode)) delete recipes[key];
        });
    }

    if(level > 0) {
        Object.keys(recipes).forEach(key => {
            if (recipes[key].level != level) delete recipes[key];
        });
    }
   
    const ingredients = await loadJSONFromUrl('utils/game/recipes/recipeData/ingredients.json')
    const servingTypes = await loadJSONFromUrl('utils/game/recipes/recipeData/servingTypes.json')
    const containers = await loadJSONFromUrl('utils/game/recipes/recipeData/containers.json')
    mergeObjectsIntoObjectByKeys(ingredients,{...containers})
    mergeObjectsIntoObjectByKeys(recipes,{...ingredients,...servingTypes})

    DevLog('-----Loaded Recipes-----')

    return recipes
}

export default loadRecipes