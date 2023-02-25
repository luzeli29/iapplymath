import React, { useState,createContext, useContext ,useEffect} from 'react';

//creating a context with useContext react hook
const Context = createContext();

export default function ContextWrapper({ children }) {
  //creating the context states
  //lang is the current langage needed to show
  const [lang, setLang] = useState("en");

  const [username, setUsername] = useState();
  const [sessionId, setSessionId] = useState();

  const [mapLocation, setMapLocation] = useState("Base");
  const [userId, setUserId] = useState();
  const [order, setOrder] = useState();

  useEffect(() => {
    //init lang on refresh
    const langState = window.sessionStorage.getItem('LANG_STATE');
    if ( langState === null) {
      window.sessionStorage.setItem('LANG_STATE','en')
      setLang("en")
    } else {
      setLang(window.sessionStorage.getItem('LANG_STATE'))
    }

    //init avatar on refresh
    const avatarIdLocal = window.sessionStorage.getItem('AVATAR_ID');
    if ( avatarIdLocal === null) {
      window.sessionStorage.setItem('AVATAR_ID','')
      setAvatarId("")
    } else {
      setAvatarId(window.sessionStorage.getItem('AVATAR_ID'))
    }

    const petIdLocal = window.sessionStorage.getItem('PET_ID');
    if ( petIdLocal === null) {
      window.sessionStorage.setItem('PET_ID','')
      setPetId("")
    } else {
      setPetId(window.sessionStorage.getItem('PET_ID'))
    }

    const usernameLocal = window.sessionStorage.getItem('USERNAME');
    if (usernameLocal) {
      setUsername(usernameLocal)
    }

    const userIdLocal = window.sessionStorage.getItem('USER_ID');
    if (userIdLocal) {
      setUserId(userIdLocal)
    }

    const sessionIdLocal = window.sessionStorage.getItem('SESSION_ID');
    if (sessionIdLocal) {
      setSessionId(sessionIdLocal)
    }

  });

  const clearData = () => {
    setUsername("");
    window.sessionStorage.removeItem('USERNAME')

    setLang("en");
    window.sessionStorage.removeItem('LANG_STATE')
    
    setAvatarId("")
    setAvatarId(window.sessionStorage.getItem('AVATAR_ID'))

    setPetId("")
    setPetId(window.sessionStorage.getItem('PET_ID'))

    setUserId("");
    window.sessionStorage.removeItem('USER_ID')

    setSessionId('')
    window.sessionStorage.removeItem('SESSION_ID')

  }

  //avatar keeps track of what avatar to show
  const [avatarId, setAvatarId] = useState("1");
  const [petId, setPetId] = useState("1");
  //questionNum remebers which question number a user was on even if there is a lang switch
  const [questionNum, setQuestionNum] = useState(0);
  //this is what is stored in the context
  let value = {
      state: {
          lang: lang,
          questionNum: questionNum,
          avatarId:avatarId,
          petId: petId,
          userId: userId,
          username: username,
          order: order,
          mapLocation: mapLocation,
          sessionId: sessionId,
      },
      setLang: (newLang) => {
        window.sessionStorage.setItem('LANG_STATE',newLang)
        setLang(newLang)
      },
      setAvatarId: (newAvatarId) => {
        window.sessionStorage.setItem('AVATAR_ID',newAvatarId)
        setAvatarId(newAvatarId)
      },
      setPetId: (newPetId) => {
        window.sessionStorage.setItem('PET_ID',newPetId)
        setPetId(newPetId)
      },
      setQuestionNum: (newNum) => setQuestionNum(newNum),
      setOrder: (newOrder) => setOrder(newOrder),
      setUsername: (username) => {
        window.sessionStorage.setItem('USERNAME',username)
        setUsername(username)
      },
      setUserId: (userId) => {
        window.sessionStorage.setItem('USER_ID',userId)
        setUserId(userId)
      },
      setSessionId: (sessionId) => {
        window.sessionStorage.setItem('SESSION_ID',sessionId)
        setSessionId(sessionId)
      },
      setMapLocation: (newMapLocation) => setMapLocation(newMapLocation),
      clearData: () => clearData(),
      setOrder: (newOrder) => setOrder(newOrder),
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}
  
//function to call context
export function useWrapperContext() {
    return useContext(Context);
}