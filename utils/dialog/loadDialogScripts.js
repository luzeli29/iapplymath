import DevErr from '@utils/debug/devErr';
import DevLog from '@utils/debug/devLog';
import loadJSONFromUrl from '@utils/staticData/loadJSONFromUrl';
import mergeObjectsIntoObjectByKeys from '@utils/staticData/mergeObjectsIntoObjectByKeys';
import { promises as fs } from 'fs';
import path from 'path';

export default async function loadDialogScripts() {

    let generalDS = await loadJSONFromUrl('utils/dialog/generalDialogScripts.json')
    if(generalDS) {
        generalDS = generalDS.dialogScript
    } else {
        DevErr('No general dialog scripts loaded...')
    }

    let ayuDS = await loadJSONFromUrl('utils/ayu/dialog/ayuDialogScripts.json')
    if(ayuDS) {
        ayuDS = ayuDS.dialogScript
    } else {
        DevErr('No ayu dialog scripts loaded...')
    }

    let auntHouseDS = await loadJSONFromUrl('utils/game/auntHouse/dialog/auntHouseDialogScripts.json')
    if(auntHouseDS) {
        auntHouseDS = auntHouseDS.dialogScript
    } else {
        DevErr('No aunt house dialog scripts loaded...')
    }

    let restaurantDS = await loadJSONFromUrl('utils/game/school/dialog/schoolDialogScripts.json')
    if(restaurantDS) {
        restaurantDS = restaurantDS.dialogScript
    } else {
        DevErr('No restaurant dialog scripts loaded...')
    }

    let schoolDS = await loadJSONFromUrl('utils/game/restaurant/dialog/restaurantDialogScripts.json')
    if(schoolDS) {
        schoolDS = schoolDS.dialogScript
    } else {
        DevErr('No school dialog scripts loaded...')
    }
    
    //Make sure to add dialog after loading it...
    const dialogScripts = { ...generalDS,
                            ...ayuDS,
                            ...auntHouseDS,
                            ...restaurantDS,
                            ...schoolDS
                        }


    const stageData = await loadJSONFromUrl('utils/dialog/stageData/stages.json')
    mergeObjectsIntoObjectByKeys(dialogScripts,stageData)

    DevLog('-----Loaded Dialog Scripts-----')



    return dialogScripts
}