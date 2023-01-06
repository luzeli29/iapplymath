import React, { useState,createContext, useContext ,useEffect} from 'react';

//creating a context with useContext react hook
const Context = createContext();

export default function ContextWrapper({ children }) {
  //creating the context states
  //lang is the current langage needed to show
  const [lang, setLang] = useState("en");

  const [userID, setUserID] = useState();

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
    const avatarIDLocal = window.sessionStorage.getItem('AVATAR_ID');
    if ( avatarIDLocal === null) {
      window.sessionStorage.setItem('AVATAR_ID','')
      setAvatarID("")
    } else {
      setAvatarID(window.sessionStorage.getItem('AVATAR_ID'))
    }

    const userIDLocal = window.sessionStorage.getItem('USER_ID');
    if (userIDLocal) {
      console.log('UserID is not null')
      setUserID(userIDLocal)
    }
  });

  const [order, setOrder] = useState({
    dishes: {
        entree: "",
        drink: "",
        desert: "",
    },
    total: 0,
  })

  //avatar keeps track of what avatar to show
  const [avatarID, setAvatarID] = useState("1");
  //questionNum remebers which question number a user was on even if there is a lang switch
  const [questionNum, setQuestionNum] = useState(0);
  //this is what is stored in the context
  let value = {
      state: {
          lang: lang,
          questionNum: questionNum,
          avatarID:avatarID,
          order:order,
          userID: userID,
      },
      setLang: (newLang) => {
        window.sessionStorage.setItem('LANG_STATE',newLang)
        setLang(newLang)
      },
      setAvatarID: (newAvatarID) => {
        window.sessionStorage.setItem('AVATAR_ID',newAvatarID)
        setAvatarID(newAvatarID)
      },
      setQuestionNum: (newNum) => setQuestionNum(newNum),
      setOrder: (newOrder) => setOrder(newOrder),
      setUserID: (userID) => {
        window.sessionStorage.setItem('USER_ID',userID)
        setUserID(userID)
      },
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
  

