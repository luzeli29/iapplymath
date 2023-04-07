import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const { jsonId, folderId } = req.query

    if(jsonId == undefined || folderId == undefined) {
        return res.status(400).json("error")
    }


    //TODO : Make the path to the static data dynamic
    const jsonPath = path.join(process.cwd(), 'utils/staticData/json/' + folderId + '/' + jsonId + ".json");

    try{
        const fileContents = await fs.readFile(jsonPath, 'utf8');
        return res.status(200).json(fileContents);
    } catch (e) {
        return res.status(400).json("error")
    }
}