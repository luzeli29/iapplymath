import React, { useState,createContext, useContext ,useEffect} from 'react';

//creating a context with useContext react hook
const Context = createContext();

export default function ContextWrapper({ children }) {
  //creating the context states
  //lang is the current langage needed to show
  const [lang, setLang] = useState("en");

  const [userId, setUserId] = useState();
  const [mapLocation, setMapLocation] = useState("Base");
  const [userLongId, setUserLongId] = useState();
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

    const userIdLocal = window.sessionStorage.getItem('USER_ID');
    if (userIdLocal) {
      setUserId(userIdLocal)
    }

    const userLongIdLocal = window.sessionStorage.getItem('USER_LONG_ID');
    if (userLongIdLocal) {
      setUserLongId(userLongIdLocal)
    }
  });

  const clearData = () => {
    setUserId("");
    window.sessionStorage.removeItem('USER_ID')

    setLang("en");
    window.sessionStorage.removeItem('LANG_STATE')
    
    setAvatarId("")
    setAvatarId(window.sessionStorage.getItem('AVATAR_ID'))

    setUserLongId("");
    window.sessionStorage.removeItem('USER_LONG_ID')
  }

  //avatar keeps track of what avatar to show
  const [avatarId, setAvatarId] = useState("1");
  //questionNum remebers which question number a user was on even if there is a lang switch
  const [questionNum, setQuestionNum] = useState(0);
  //this is what is stored in the context
  let value = {
      state: {
          lang: lang,
          questionNum: questionNum,
          avatarId:avatarId,
          userId: userId,
          userLongId: userLongId,
          order: order,
          mapLocation: mapLocation,
      },
      setLang: (newLang) => {
        window.sessionStorage.setItem('LANG_STATE',newLang)
        setLang(newLang)
      },
      setAvatarId: (newAvatarId) => {
        window.sessionStorage.setItem('AVATAR_ID',newAvatarId)
        setAvatarId(newAvatarId)
      },
      setQuestionNum: (newNum) => setQuestionNum(newNum),
      setOrder: (newOrder) => setOrder(newOrder),
      setUserId: (userId) => {
        window.sessionStorage.setItem('USER_ID',userId)
        setUserId(userId)
      },
      setUserLongId: (userLongId) => {
        window.sessionStorage.setItem('USER_LONG_ID',userLongId)
        setUserLongId(userLongId)
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
  

