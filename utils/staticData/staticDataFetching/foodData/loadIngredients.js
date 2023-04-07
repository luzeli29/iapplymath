import GetBaseUrl from "@utils/api/getBaseUrl"

const baseUrl = GetBaseUrl()
const foodDataEndpoint = baseUrl + '/api/staticData/json/foodData/'

export default async function loadIngredients() {
    const ingredientsRes = await fetch(foodDataEndpoint + 'ingredients')
    const ingredientsDataJSON = await ingredientsRes.json()
    const ingredients = JSON.parse(ingredientsDataJSON)

    return ingredients
}