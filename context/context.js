import React, { useState,createContext, useContext } from 'react';
import translationBank from '../public/text/translations'
import ayuDialogBank from '../public/text/ayu_dialog'

const ContextWrapper = createContext();

export function contextWrapper({ children }) {
    const [lang, setLang] = useState("en");
    const [name, setName] = useState("nameless");
    const [avatar, setAvatar] = useState();

    let value = {
        state: {
            translations: translationBank[lang],
            ayuDialog: ayuDialogBank[lang],
            ayuDialogTags: ayuDialogBank["tags"],
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