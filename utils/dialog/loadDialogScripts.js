import DevErr from '@utils/debug/devErr';
import DevLog from '@utils/debug/devLog';
import loadJSONFromUrl from '@utils/staticData/loadJSONFromUrl';
import mergeObjectsIntoObjectByKeys from '@utils/staticData/mergeObjectsIntoObjectByKeys';

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

    let groceryStoreDS = await loadJSONFromUrl('utils/game/groceryStore/dialog/groceryStoreScripts.json')
    if(groceryStoreDS) {
        groceryStoreDS = groceryStoreDS.dialogScript
    } else {
        DevErr('No grocery store dialog scripts loaded...')
    }


    let stadiumDS = await loadJSONFromUrl('utils/game/stadium/dialog/stadiumDialogScripts.json')
    if(stadiumDS) {
        stadiumDS = stadiumDS.dialogScript
    } else {
        DevErr('No stadium dialog scripts loaded...')
    }

    let courtDS = await loadJSONFromUrl('utils/game/court/dialog/courtDialogScripts.json')
    if(courtDS) {
        courtDS = courtDS.dialogScript
    } else {
        DevErr('No court dialog scripts loaded...')
    }
    
    //Make sure to add dialog after loading it...
    const dialogScripts = { ...generalDS,
                            ...ayuDS,
                            ...auntHouseDS,
                            ...restaurantDS,
                            ...schoolDS,
                            ...groceryStoreDS,
                            ...stadiumDS,
                            ...courtDS
                        }


    const stageData = await loadJSONFromUrl('utils/dialog/stageData/stages.json')
    mergeObjectsIntoObjectByKeys(dialogScripts,stageData)

    DevLog('-----Loaded Dialog Scripts-----')



    return dialogScripts
}