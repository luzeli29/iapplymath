import React, { useState,createContext, useContext } from 'react';
import translationBank from '../public/text/translations'

const ContextWrapper = createContext();

export function contextWrapper({ children }) {
    const [lang, setLang] = useState("en");
    const [name, setName] = useState("nameless");
    const [avatar, setAvatar] = useState();

    let value = {
        state: {
            translations: translationBank[lang],
            lang: "en",
            name: name,
            avatar: avatar,
        },
        setLang: setLang,
    }

    
  
    return (
      <ContextWrapper.Provider value={value}>
        {children}
      </ContextWrapper.Provider>
    );
  }
  
export function useWrapperContext() {
    return useContext(ContextWrapper);
}
  

export default contextWrapper;