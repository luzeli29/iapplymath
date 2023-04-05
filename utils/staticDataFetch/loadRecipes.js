import GetBaseUrl from "@utils/api/getBaseUrl"

const baseUrl = GetBaseUrl()
const foodDataEndpoint = baseUrl + '/api/staticData/json/foodData/'

export default async function LoadRecipes() {

    let recipes ={
        test: "test"
    }

    const recipesRes = await fetch(foodDataEndpoint + 'recipes')
    const recipesDataJSON = await recipesRes.json()
    const recipesData = JSON.parse(recipesDataJSON)

    const ingredientsRes = await fetch(foodDataEndpoint + 'ingredients')
    const ingredientsDataJSON = await ingredientsRes.json()
    const ingredientsData = JSON.parse(ingredientsDataJSON)
    let ingredients = ingredientsData.ingredients

    const servingTypesRes = await fetch(foodDataEndpoint + 'servingTypes')
    const servingTypesDataJSON = await servingTypesRes.json()
    const servingTypesData = JSON.parse(servingTypesDataJSON)
    const servingTypes = servingTypesData.servingTypes


    //console.log(ingredientsData)
    //console.log(servingTypesData)

    //TODO: Validate data

    recipes = recipesData.recipes
    recipes = fillInServingType(recipes,servingTypes)

    ingredients = fillIngredientsServingType(ingredients,servingTypes)
    recipes = fillInIngridients(recipes,ingredients)

    return recipes
}

function fillInServingType(recipes,servingTypes) {
    Object.keys(recipes).forEach(function(recipeKey) {
        const recipe = recipes[recipeKey]
        if(recipe.servingTypeCode != undefined) {
            const servingTypeCode = recipe.servingTypeCode
            const servingType = servingTypes[servingTypeCode]
            recipes[recipeKey].servingType = servingType
        } else {
            const servingType = servingTypes.self
            recipes[recipeKey].servingType = servingType
        }
    });
    return recipes
}

function fillInIngridients(recipes,ingredients) {
    Object.keys(recipes).forEach(function(recipeKey) {
        const recipe = recipes[recipeKey]
        recipe.ingredients.forEach((ingredientObj,index) => {
            const ingCode = ingredientObj.ingredientCode
            const ingredient = ingredients[ingCode]
            recipe.ingredients[index].ingredient = ingredient
        })
    });
    return recipes
}

function fillIngredientsServingType(ingredients,servingTypes) {
    Object.keys(ingredients).forEach(function(ingredientKey) {
        const ingredient = ingredients[ingredientKey]
        if(ingredient.servingTypeCode != undefined) {
            const servingTypeCode = ingredient.servingTypeCode
            const servingType = servingTypes[servingTypeCode]
            ingredients[ingredientKey].servingType = servingType
        } else {
            const servingType = servingTypes.self
            ingredients[ingredientKey].servingType = servingType
        }
    });
    return ingredients
}

