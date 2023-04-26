import { promises as fs } from 'fs';
import path from 'path';

export default async function LoadLocations() {

    const FileContents =  path.join(process.cwd(), 'utils/staticData/json/game/locations.json');
    const DataJSON = await fs.readFile(FileContents, 'utf8');
    const locations  = JSON.parse(DataJSON).location

    return locations
}
