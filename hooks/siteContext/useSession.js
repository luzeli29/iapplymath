import React, { useState, useEffect } from 'react'

export default function useSession() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    const generalSessionEndpoint = '/api/user/sessionData/'

    useEffect(() => {
        setLoading(false)
    }, []);

    async function startSession(username) {
        if(!username) {
            setError('"username" is null when trying to start session.')
            return false
        }

        const endpoint = generalSessionEndpoint + username

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }

        try {

          const response = await fetch(endpoint, options)
          const result = await response.json()
          
          if (result.code === 200) {
            return true
          } else {
            setError('Could not create session.')
            return false
          }

        } catch (e) {
          setError("Error when starting session." + e.message)
          return false
        }
    }
    
    async function endSession(username) {
        setLoading(true)

        if(!username) {
            setError('"username" is null when trying to start session.')
            return false
        }

        const bodyObject = {
            end_date: Date.now(),
        }

        return await putSession(username,bodyObject)
    }

    async function incrementAyu(username) {
      if(!username) {
        setError('"userdata" was null in putSession')
        return false
      }
      const bodyObject = {
        times_talked_to_ayu: "inc"
      }
      return await putSession(username,bodyObject)

    }

    async function putSession(username,bodyObject) {
        if(!username) {
            setError('"userdata" was null in putSession')
            return false
        }
        const JSONdata = JSON.stringify(bodyObject)

        const endpoint = generalSessionEndpoint + username
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSONdata,
        }
        try {
      
          const response = await fetch(endpoint, options)
          const result = await response.json()
          
          if (result.code === 200) {
            return true
          } else {
            setError('Error when ending session.')
            return false
          }
        } catch (e) {
          setError("Error when ending session.")
          return false
        }
    }

    const session = {
        sessionLoading: loading,
        sessionError: error,
        startSession: startSession,
        endSession: endSession,
        putSession: putSession,
        incrementAyu: incrementAyu,
    }

    return ({
        session: session,
    })
}