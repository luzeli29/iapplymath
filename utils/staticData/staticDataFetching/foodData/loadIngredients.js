import GetBaseUrl from "@utils/api/getBaseUrl"
import { promises as fs } from 'fs';
import path from 'path';

export default async function loadIngredients() {
    const ingredientsFileContent =  path.join(process.cwd(), 'utils/staticData/json/foodData/ingredients.json');
    const ingredientsDataJSON = await fs.readFile(ingredientsFileContent, 'utf8');
    const ingredients = JSON.parse(ingredientsDataJSON)

    return ingredients
}