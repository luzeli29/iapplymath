import DevErr from "@utils/debug/devErr";
import DevLog from "@utils/debug/devLog";
import loadJSONFromUrl from "@utils/staticData/loadJSONFromUrl";


const loadLevels = async () => {
    let levels = await loadJSONFromUrl('utils/game/quiz/levels/levels.json')

    if(!levels) {
        DevErr('No levels returned when trying to load them...')
        return null
    }

    levels = levels.level

    DevLog('-----Loaded Levels-----')
    DevLog(levels)
    DevLog('------------------------')

    return levels
}

export default loadLevels 