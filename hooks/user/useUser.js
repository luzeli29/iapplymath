import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import log from '@utils/debug/log';

export default function useUser() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const generalUserEndpoint = '/api/user/userData/'
  const avatarIdEndpoint = '/api/user/userData/avatarId'
  const petIdEndpoint = '/api/user/userData/petId'
  const generalSessionEndpoint = '/api/user/sessionData/'

  useEffect(() => {
    updateUserFromCookie()
    setLoading(false)
  }, []);

  function updateUserFromCookie() {

    const storedUserData = Cookies.get('user');

    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    } else {
      setUser()
    }
    
  }

  async function setUserCookie(data) {
    if(!data) {
      setError('"data" was null when setting user cookie.')
    }
    try{
      await Cookies.set('user', JSON.stringify(data), { expires: 7 });
      updateUserFromCookie()
      return true
    } catch (e) {
      setError("Error when clearing user cookie.")
      clearUserCookie()
      return false
    }
  }

  async function clearUserCookie() {
    try{
      await Cookies.remove('user');
      updateUserFromCookie()
      return true
    } catch (e) {
      setError("Error when clearing user cookie.")
      return false
    }
  }

  async function login(username) {
    log("Logging in...")
    setLoading(true)
    const storedUserData = Cookies.get('user');

    if(storedUserData) {
      setError('A user was already found to be logged in.')
      return false
    }
  
    const endpoint = generalUserEndpoint + username

    const getOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    let response = await fetch(endpoint, getOptions)
    if(!response) {
      setError('"response" came back null when trying to login.')
      return false
    }
    let result = await response.json()
    if(!result) {
      setError('"result" came back null when trying to login.')
      return false
    }
    if(result.code != 200 && result.code != 404) {
      console.log(result.message)
      setError(result.message)
      return false
    }

    //We create user
    if(result.code == 404) {
      result = await createUser(username)
      if(!result) {
        setError('"result" came back null when trying to login.')
        return false
      }
    }

    const cleanUserData = cleanUserApiResult(username, result.data)
    setUserCookie(cleanUserData)
    //TODO: Start session for user
    const sessionStarted = await startSession(username)
    setLoading(false)
    return true
  }

  async function createUser(username) {
    const endpoint = generalUserEndpoint + username

    console.log("User was not found in database, creating new users.")
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    let response = await fetch(endpoint, postOptions)
    if(!response) throw new Error("Response came back null when trying to create new user in login.")
    let result = await response.json()
    if(!result) throw new Error("Result came back null when trying to create new user in login.")

    if(result.code == 200) {
      return result
    } else {
      console.log("Error when creating new user. " + result.message)
      setError("Error when creating new user. " + result.message)
    }
  }

  function offlineLogin(username) {
    log("Logging in offline mode...")

    const offlineUser = {
        username: username,
        secureUsername: "offline",
        userId:  "offline",
        avatarId: "",
        petId: "",
        isOffline: true
    }
    try {
      setUserCookie(offlineUser)
      setLoading(false)
      return true
    } catch (e) {
      setError('Error when trying to login offline.')
      setLoading(false)
      return false
    }
  }

  function cleanUserApiResult(username, result) {
    if(!result) {
      setError('Result is empty in function cleanUserApiResult.')
      return {}
    }
    if(!result.username) {
      setError('Result username is empty in function cleanUserApiResult.')
      return {}
    }
    
    let petId,avatarId,userId,secureUsername
  
    if(!result._id) {
      userId = ""
    } else {
      userId = result._id
    }
  
    if(!result.username) {
      secureUsername = ""
    } else {
      secureUsername = result.username
    }
  
    if(result.avatar_id === undefined) {
      avatarId = ""
    } else {
      avatarId = result.avatar_id
    }
  
    if(result.pet_id === undefined) {
      petId = ""
    } else {
      petId = result.pet_id
    }
  
    const cleanedResult = {
      username: username,
      secureUsername: secureUsername,
      userId:  userId,
      avatarId: avatarId,
      petId: petId
    }
  
    return cleanedResult
  }

  async function logout() {
    log("Logging out...")
    //TODO: End session for user
    await endSession(user.username)

    await clearUserCookie()
  }

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
      setError("Error when starting session.")
      return false
    }
  }

  async function endSession(username) {
    if(!user) {
      setError('User is not logged in')
      return false
    }
    if(user.isOffline) {
      return true
    }
    if(!username) {
      setError('"username" is null when trying to start session.')
      return false
    }
    const endpoint = generalSessionEndpoint + username
    const options = {
      method: 'PUT',
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
        setError('Error when ending session.')
        return false
      }
    } catch (e) {
      setError("Error when ending session.")
      return false
    }
  }

  async function setPetId(petId) {
    setLoading(true)
    if(petId === undefined) {
      setError('"petId" was null')
      return
    }
    if(!user) {
      setError('User is not logged in')
      return
    }
    if(!user.secureUsername) {
      setError('User has not "secureUsername" stored.')
      return
    }
    try{
      log('Setting "petId" to ' + petId)
      
      if(user.isOffline) {
        const newUser = user
        newUser.petId = petId
        setUserCookie(newUser)
        setLoading(false)
        return true
      }

      const data = {
        username: user.secureUsername,
        petId: petId
      }

      const JSONdata = JSON.stringify(data)

      const endpoint = petIdEndpoint

      const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
      }

      let response = await fetch(endpoint, options)
      if(!response) throw new Error("Response came back null when trying to login.")
      let result = await response.json()
      if(!result) throw new Error("Result came back null when trying to login.")
      
      if(result.code != 200) {
        setError(result.message)
        setAvatarId(null)
        return false
      }
      const cleanUserData = cleanUserApiResult(user.username, result.data)
      setUserCookie(cleanUserData)
      setLoading(false)
      return true
    } catch (e) {
      setError('Error occured when trying to update "avatarId". ' + e.message)
      setLoading(false)
      return false
    }
    
  }

  async function setAvatarId(avatarId) {
    setLoading(true)
    if(avatarId === undefined) {
      setError('"avatarId" was null')
      return
    }
    if(!user) {
      setError('User is not logged in')
      return
    }
    if(!user.secureUsername) {
      setError('User has not "secureUsername" stored.')
      return
    }
    try{
      log('Setting "avatarId" to ' + avatarId)

      if(user.isOffline) {
        const newUser = user
        newUser.avatarId = avatarId
        setUserCookie(newUser)
        setLoading(false)
        return true
      }

      const data = {
        username: user.secureUsername,
        avatarId: avatarId
      }

      const JSONdata = JSON.stringify(data)

      const endpoint = avatarIdEndpoint

      const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
      }

      let response = await fetch(endpoint, options)
      if(!response) throw new Error("Response came back null when trying to login.")
      let result = await response.json()
      if(!result) throw new Error("Result came back null when trying to login.")
      
      if(result.code != 200) {
        setError(result.message)
        setAvatarId(null)
        return false
      }
      const cleanUserData = cleanUserApiResult(user.username, result.data)
      setUserCookie(cleanUserData)
      setLoading(false)
      return true
    } catch (e) {
      setError('Error occured when trying to update "avatarId". ' + e.message)
      setLoading(false)
      return false
    }
  }

  return {
    user: user,
    loading: loading,
    error: error,
    login,
    logout,
    setAvatarId,
    setPetId,
    offlineLogin,
  };
};