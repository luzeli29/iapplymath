import GetBaseUrl from "@utils/api/getBaseUrl"
import mergeObjectsIntoObjectByKeys from "../mergeObjectsIntoObjectByKeys"
import loadIngredients from "./loadIngredients"
import loadServingTypes from "./loadServingTypes"

const baseUrl = GetBaseUrl()
const foodDataEndpoint = baseUrl + '/api/staticData/json/foodData/'

export default async function LoadRecipes() {

    const recipesRes = await fetch(foodDataEndpoint + 'recipes')
    const recipesDataJSON = await recipesRes.json()
    let recipes  = JSON.parse(recipesDataJSON).recipe

    const ingredients = await loadIngredients()
    const servingTypes = await loadServingTypes()
    //TODO: Validate data

    mergeObjectsIntoObjectByKeys(recipes,{...ingredients,...servingTypes})

    return recipes
}
