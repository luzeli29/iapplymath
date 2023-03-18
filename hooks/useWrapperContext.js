import React, { useState,createContext, useContext ,useEffect} from 'react';

//creating a context with useContext react hook
const Context = createContext();

export default function ContextWrapper({ children }) {
  //creating the context states
  //lang is the current langage needed to show
  const [lang, setLang] = useState("en");
  const [mapLocation, setMapLocation] = useState("Base");
  const [order, setOrder] = useState();
  const [mute, setMute] = useState("No");
  const [background, setBackgroundColor] = useState();
  useEffect(() => {
    //init lang on refresh
    const langState = window.sessionStorage.getItem('LANG_STATE');
    if ( langState === null) {
      window.sessionStorage.setItem('LANG_STATE','en')
      setLang("en")
    } else {
      setLang(window.sessionStorage.getItem('LANG_STATE'))
    }

    const backgroundLocal = window.sessionStorage.getItem('BACKGROUND');
    if (backgroundLocal) {
      setBackgroundColor(backgroundLocal);
    }
    else {
      setBackgroundColor("#EDBFC6");
    }

    const muteLocal = window.sessionStorage.getItem('MUTE');
    if (muteLocal) {
        setSessionId(muteLocal)
    }
    else{
        setMute("F");
    }

    var r = document.querySelector(':root');
    r.style.setProperty('--page-color', background ? background : "#EDBFC6");

  },[]);

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

    setSessionId('')
    window.sessionStorage.removeItem('MUTE')

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
          order: order,
          mapLocation: mapLocation,
          mute: mute,
      },
      setLang: (newLang) => {
        window.sessionStorage.setItem('LANG_STATE',newLang)
        setLang(newLang)
      },
      setQuestionNum: (newNum) => setQuestionNum(newNum),
      setOrder: (newOrder) => setOrder(newOrder),
      setSessionId: (sessionId) => {
        window.sessionStorage.setItem('SESSION_ID',sessionId)
        setSessionId(sessionId)
      },
      setBackgroundColor: (background) => {
        window.sessionStorage.setItem('BACKGROUND',background)
        setBackgroundColor(background)
      },
      setMute: (mute) => {
          window.sessionStorage.setItem('MUTE',mute)
          setMute(mute)
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