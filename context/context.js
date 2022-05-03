import React, { useState,createContext, useContext } from 'react';

//creating a context with useContext react hook
const Context = createContext();

export default function ContextWrapper({ children }) {
  //creating the context states
  //lang is the current langage needed to show
  const [lang, setLang] = useState("en");
  //avatar keeps track of what avatar to show
  //TODO: save this so that when there is a refresh it does not reset to 1
  const [avatar, setAvatar] = useState("1");
  //questionNum remebers which question number a user was on even if there is a lang switch
  const [questionNum, setQuestionNum] = useState(0);

  //this is what is stored in the context
  let value = {
      state: {
          lang: lang,
          questionNum: questionNum,
          avatar:avatar,
      },
      setLang: (newLang) => setLang(newLang),
      setAvatar: (newAvatar) => setAvatar(newAvatar),
      setQuestionNum: (newNum) => setQuestionNum(newNum),
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
  

