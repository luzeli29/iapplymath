import React, { useState,createContext, useContext } from 'react';

const Context = createContext();

export default function ContextWrapper({ children }) {
    const [lang, setLang] = useState("en");

    const [avatar, setAvatar] = useState("1");

    const [questionNum, setQuestionNum] = useState(0);

    

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
  
export function useWrapperContext() {
    return useContext(Context);
}
  

