import GetBaseUrl from "@utils/api/getBaseUrl"
import { promises as fs } from 'fs';
import path from 'path';

export default async function loadServingTypes() {

    const servingTypesFileContents =  path.join(process.cwd(), 'utils/staticData/json/foodData/servingTypes.json');
    const servingTypesDataJSON = await fs.readFile(servingTypesFileContents, 'utf8');
    const servingTypes = JSON.parse(servingTypesDataJSON)

    return servingTypes
}