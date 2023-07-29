import loadJSONFromUrl from "@utils/staticData/loadJSONFromUrl";
import mergeObjectsIntoObjectByKeys from "@utils/staticData/mergeObjectsIntoObjectByKeys"
import DevLog from "@utils/debug/devLog";

const loadSports = async () => {

    let sportsJSON = await loadJSONFromUrl('utils/game/stadium/sportData/sports.json')
    
    const sports = sportsJSON.sport
    DevLog('-----Loaded Sports-----')
    DevLog(sports)
    return sports
}

export default loadSports