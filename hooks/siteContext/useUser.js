import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import DevLog from '@utils/debug/devLog';
import useSession from './useSession';
import useSettings from './useSettings';

export default function useUser() {
  const [userdata, setUserdata] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  const {settings} = useSettings();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const {session} = useSession(userdata)

  const generalUserEndpoint = '/api/user/userData/'
  const avatarIdEndpoint = '/api/user/userData/avatarId'
  const petIdEndpoint = '/api/user/userData/petId'

  useEffect(() => {
    updateUserFromCookie()
    setLoading(false)
  }, []);

  function updateUserFromCookie() {

    const storedUserData = Cookies.get('user');

    if (storedUserData) {
      setUserdata(JSON.parse(storedUserData));
      setLoggedIn(true)
    } else {
      setUserdata()
    }
    
  }

  async function setUserCookie(data) {
    if(!data) {
      setError('"data" was null when setting user cookie.')
    }
    try{
      await Cookies.set('user', JSON.stringify(data), { expires: 1 });
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
    DevLog("Logging in...")
    setLoading(true)
    const storedUserData = Cookies.get('user');

    if(storedUserData) {
      setError('A user was already found to be logged in.')
      setLoading(false)
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
      setLoading(false)
      return false
    }
    let result = await response.json()
    if(!result) {
      setError('"result" came back null when trying to login.')
      setLoading(false)
      return false
    }
    if(result.code != 200) {
      setError(result.message)
      setLoading(false)
      return false
    }

    const cleanUserData = cleanUserApiResult(username, result.data)
    setUserCookie(cleanUserData)
    //TODO: Start session for user
    const sessionStarted = await session.startSession(username)
    setLoading(false)
    setError(false)
    setLoggedIn(true)
    return true
  }

  async function createUser(username) {
    setLoading(true)
    setError(false)
    const endpoint = generalUserEndpoint + username

    const getOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    let response = await fetch(endpoint, getOptions)
    if(!response) {
      setError('"response" came back null when trying to create account.')
      setLoading(false)
      return false
    }
    let result = await response.json()
    if(!result) {
      setError('"result" came back null when trying to create account.')
      setLoading(false)
      return false
    }

    if(result.code == 200) {
      setError("Could not create user since user already exists.")
      setLoading(false)
      return false
    }
    if(result.code != 404) {
      setError("Could not create user.")
      setLoading(false)
      return false
    }

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    response = await fetch(endpoint, postOptions)
    if(!response) throw new Error("Response came back null when trying to create new user in login.")
    result = await response.json()
    if(!result) throw new Error("Result came back null when trying to create new user in login.")

    if(result.code == 200) {
      setLoading(false)
      setError(false)
      return result
    } else {
      setError("Error when creating new user. " + result.message)
    }
  }

  function offlineLogin(username) {
    setError()
    DevLog("Logging in offline mode...")

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
      setLoggedIn(true)
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
    DevLog("Logging out...")

    if(userdata.isOffline) {
      await clearUserCookie()
      setLoading(false)
      setError(false)
      return true
    }

    await session.endSession(userdata.username)
    settings.clearSettingsCookie()
    await clearUserCookie()
    setLoggedIn(false)
    return true
  }

  async function setPetId(petId) {
    setError()
    setLoading(true)
    if(petId === undefined) {
      setError('"petId" was null')
      return
    }
    if(!userdata) {
      setError('User is not logged in')
      return
    }
    if(!userdata.secureUsername) {
      setError('User has not "secureUsername" stored.')
      return
    }
    try{
      DevLog('Setting "petId" to ' + petId)
      
      if(userdata.isOffline) {
        const newUser = user
        newUser.petId = petId
        setUserCookie(newUser)
        setLoading(false)
        return true
      }

      const data = {
        username: userdata.secureUsername,
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
      const cleanUserData = cleanUserApiResult(userdata.username, result.data)
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
    setError()
    setLoading(true)
    if(avatarId === undefined) {
      setError('"avatarId" was null')
      return
    }
    if(!userdata) {
      setError('User is not logged in')
      return
    }
    if(!userdata.secureUsername) {
      setError('User has not "secureUsername" stored.')
      return
    }
    try{
      DevLog('Setting "avatarId" to ' + avatarId)

      if(userdata.isOffline) {
        const newUser = user
        newUser.avatarId = avatarId
        setUserCookie(newUser)
        setLoading(false)
        return true
      }

      const data = {
        username: userdata.secureUsername,
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
      const cleanUserData = cleanUserApiResult(userdata.username, result.data)
      setUserCookie(cleanUserData)
      setLoading(false)
      return true
    } catch (e) {
      setError('Error occured when trying to update "avatarId". ' + e.message)
      setLoading(false)
      return false
    }
  }

  async function incrementAyu() {
    const bodyObject = {
      times_talked_to_ayu: "inc"
    }

    putSession(bodyObject)

    return true
  }

  async function putSession(bodyObject) {
    setError()
    if(!session) {
      setError('"session" is null. Can not increment Ayu.')
      return false;
    }
    if(!userdata) {
      setError('"userdata" is null. Can not increment Ayu.')
      return false
    }
    if(userdata.isOffline) {
      return true
    }
    if(!userdata.username) {
      setError('"username" is null. Can not increment Ayu.')
      return false
    }

    await session.putSession(userdata.username,bodyObject)

    return true
  }

  const hasAvatar = () => {
    if(userdata.avatarId !== "") {
      return true;
    }

    return false;
  }

  const user = {
    loggedIn: loggedIn,
    loading: loading,
    error: error,
    data: userdata,
    hasAvatar:hasAvatar,
    login: login,
    offlineLogin: offlineLogin,
    logout: logout,
    createUser: createUser,
    setAvatarId: setAvatarId,
    setPetId: setPetId,
    putSession: putSession,
  }
  
  return {
    user: user,
    settings: settings,
  };
};