import React, { useState,createContext, useContext ,useEffect} from 'react';

//creating a context with useContext react hook
const Context = createContext();

export default function ContextWrapper({ children }) {
  //creating the context states
  //lang is the current langage needed to show
  const [lang, setLang] = useState("es");

  useEffect(() => {
    //init lang on refresh
    const langState = window.localStorage.getItem('LANG_STATE');
    if ( langState === null) {
      window.localStorage.setItem('LANG_STATE','en')
      setLang("en")
    } else {
      setLang(window.localStorage.getItem('LANG_STATE'))
    }

    //init avatar on refresh
    const avatarState = window.localStorage.getItem('AVATAR_STATE');
    if ( avatarState === null) {
      window.localStorage.setItem('AVATAR_STATE','1')
      setAvatar("1")
    } else {
      setAvatar(window.localStorage.getItem('AVATAR_STATE'))
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
  const [avatar, setAvatar] = useState("1");
  //questionNum remebers which question number a user was on even if there is a lang switch
  const [questionNum, setQuestionNum] = useState(0);
  //this is what is stored in the context
  let value = {
      state: {
          lang: lang,
          questionNum: questionNum,
          avatar:avatar,
          order:order,
      },
      setLang: (newLang) => {
        window.localStorage.setItem('LANG_STATE',newLang)
        setLang(newLang)
      },
      setAvatar: (newAvatar) => {
        window.localStorage.setItem('AVATAR_STATE',newAvatar)
        setAvatar(newAvatar)
      },
      setQuestionNum: (newNum) => setQuestionNum(newNum),
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
  

