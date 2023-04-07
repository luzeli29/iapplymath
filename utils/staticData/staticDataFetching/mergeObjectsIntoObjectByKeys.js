import { err, log } from "@utils/debug/log"

export default function mergeObjectsIntoObjectByKeys(objectMergeTo, objectsMergeFrom) {
    const keyMap = new Map();

    for (const [key, value] of Object.entries(objectsMergeFrom)) {
        if(keyMap.get(key)) {
            err('Same key already found in "mergeObjectsIntoObjectByKeys()", overriding previous value.')
        }
        keyMap.set(key,value)
    }

    function mergeIfValid(objectMergeTo, givenKey) {
        const objectForMerge = keyMap.get(givenKey)

        if(objectForMerge != undefined) {
            const givenValue = objectMergeTo[givenKey]            
            const valueToMerge = objectForMerge[givenValue]

            if(valueToMerge == undefined) {
                objectMergeTo[givenKey] = null
            } else {
                objectMergeTo[givenKey] = valueToMerge
            }
        }
    }

    //TODO: Check if array or smt
    mergeObject(objectMergeTo,mergeIfValid)
}

function mergeObject(objectMergeTo, mergeIfValid) {
    for (const [key, value] of Object.entries(objectMergeTo)) {
        //console.log(`${key}: ${typeof(value)}`);

        switch (typeof(value)) {
            case 'object':
                mergeObject(value,mergeIfValid)
                break;
            case 'undefined':
                break;
            default:
                mergeIfValid(objectMergeTo,key)
        }
    }

}