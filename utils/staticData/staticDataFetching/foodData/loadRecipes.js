import mergeObjectsIntoObjectByKeys from "../mergeObjectsIntoObjectByKeys"
import loadIngredients from "./loadIngredients"
import loadServingTypes from "./loadServingTypes"
import { promises as fs } from 'fs';
import path from 'path';

export default async function LoadRecipes() {

    const recipesFileContents =  path.join(process.cwd(), 'utils/staticData/json/foodData/recipes.json');
    const recipesDataJSON = await fs.readFile(recipesFileContents, 'utf8');
    let recipes  = JSON.parse(recipesDataJSON).recipe

    const ingredients = await loadIngredients()
    const servingTypes = await loadServingTypes()
    //TODO: Validate data

    mergeObjectsIntoObjectByKeys(recipes,{...ingredients,...servingTypes})

    return recipes
}
