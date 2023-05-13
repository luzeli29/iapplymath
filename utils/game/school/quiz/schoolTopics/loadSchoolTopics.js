import { promises as fs } from 'fs';
import path from 'path';

const LoadSchoolTopics = async () => {

    const FileContents =  path.join(process.cwd(), 'utils/game/school/quiz/schoolTopics/schoolTopics.json');
    const DataJSON = await fs.readFile(FileContents, 'utf8');
    const schoolTopics  = JSON.parse(DataJSON).schoolTopic

    return schoolTopics
}

export default LoadSchoolTopics