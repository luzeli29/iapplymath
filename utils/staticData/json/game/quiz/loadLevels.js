import { promises as fs } from 'fs';
import path from 'path';

export default async function LoadLevels() {

    const levelsFileContents =  path.join(process.cwd(), 'utils/staticData/json/game/quiz/levels.json');
    const levelsDataJSON = await fs.readFile(levelsFileContents, 'utf8');
    let levels  = JSON.parse(levelsDataJSON).level

    return levels
}
