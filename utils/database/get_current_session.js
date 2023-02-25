import { throwError } from "@common_imports";

export default async function GetCurrentSessionIndex(username) {
    //TODO: CHANGE THIS TO NOT STATIC
    const endpoint = 'http://localhost:3000/api/session/' + username

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const response = await fetch(endpoint, options)
    const result = await response.json()
    
    if (result.code === 200) {
      const sessions = result.data.sessions

      //TODO: add logic to finding multiple open sessions and handling them
      const index = sessions.length - 1

      return index;
    } else {
      throwError("Could not create session. " + result.message)
      return null
    }}