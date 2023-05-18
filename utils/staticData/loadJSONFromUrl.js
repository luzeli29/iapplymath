import DevErr from '@utils/debug/devErr';
import { promises as fs } from 'fs';
import path from 'path';

const loadJSONFromUrl = async (url) => {

    let loadedData = {}

    if(!url) {
        DevErr('Bad "url" given to loadJSONFromUrl()')
        return loadedData;
    }

    //Get File Content
    let fileContent;
    try {
        fileContent =  path.join(process.cwd(), url);
    } catch (e) {
        DevErr('Error trying to get file content from url: "' + url + '". Error message was...' + e)
        return loadedData;
    }

    //Read File Content
    let fileJSONData
    try {
        fileJSONData = await fs.readFile(fileContent, 'utf8');
    } catch (e) {
        DevErr('Error trying to get read file content from url: "' + url + '". Error message was...' + e)
        return loadedData;
    }

    //Parse JSON Content to JS
    try {
        loadedData = JSON.parse(fileJSONData)
    } catch (e) {
        DevErr('Error trying to parse JSON content from url: "' + url + '". Error message was...' + e)
        return loadedData;
    }

    return loadedData
}

export default loadJSONFromUrl;