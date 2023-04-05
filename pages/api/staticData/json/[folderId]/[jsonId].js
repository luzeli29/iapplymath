import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const { jsonId, folderId } = req.query

    if(jsonId == undefined || folderId == undefined) {
        return res.status(400).json("error")
    }
    const jsonPath = path.join(process.cwd(), 'public/json/' + folderId + '/' + jsonId + ".json");

    try{
        const fileContents = await fs.readFile(jsonPath, 'utf8');
        return res.status(200).json(fileContents);
    } catch (e) {
        return res.status(400).json("error")
    }
}