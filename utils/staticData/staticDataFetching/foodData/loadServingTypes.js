import GetBaseUrl from "@utils/api/getBaseUrl"

const baseUrl = GetBaseUrl()
const foodDataEndpoint = baseUrl + '/api/staticData/json/foodData/'

export default async function loadServingTypes() {
    const servingTypesRes = await fetch(foodDataEndpoint + 'servingTypes')
    const servingTypesDataJSON = await servingTypesRes.json()
    const servingTypes = JSON.parse(servingTypesDataJSON)

    return servingTypes
}