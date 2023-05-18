import loadJSONFromUrl from "@utils/staticData/loadJSONFromUrl";
import mergeObjectsIntoObjectByKeys from "@utils/staticData/mergeObjectsIntoObjectByKeys"
import DevLog from "@utils/debug/devLog";

const loadRecipes = async () => {

    let recipes = await loadJSONFromUrl('utils/game/auntHouse/recipeData/recipes.json')
    recipes = recipes.recipe
    const ingredients = await loadJSONFromUrl('utils/game/auntHouse/recipeData/ingredients.json')
    const servingTypes = await loadJSONFromUrl('utils/game/auntHouse/recipeData/servingTypes.json')

    mergeObjectsIntoObjectByKeys(recipes,{...ingredients,...servingTypes})

    DevLog('-----Loaded Recipes-----')
    DevLog(recipes)
    DevLog('------------------------')

    return recipes
}

export default loadRecipes;