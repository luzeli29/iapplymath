
export default function CreateParamString(paramObj) {
    let paramStr = '?'

    for(let paramKey of Object.keys(paramObj)){
        paramStr += paramKey + '=' + paramObj[paramKey] + '&'
    }
    return paramStr
}
