import { promises as fs } from 'fs';
import path from 'path';
import loadJSONFromUrl from '../staticData/loadJSONFromUrl';
import DevLog from '@utils/debug/devLog';
import DevErr from '@utils/debug/devErr';

const loadLocations = async () => {

    let locations = await loadJSONFromUrl('utils/game/locations.json')

    if(!locations) {
        DevErr('No locations returned when trying to load them...')
        return {}
    }
    
    locations = locations.location

    DevLog('-----Loaded Locations-----')
    DevLog(locations)
    DevLog('------------------------')

    return locations
}

export default loadLocations;