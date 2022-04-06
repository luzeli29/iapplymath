import React, { useState,createContext, useContext } from 'react';
import translationBank from '../public/text/translations'
import ayuDialogBank from '../public/text/ayu_dialog'

const Context = createContext();

export default function ContextWrapper({ children }) {
    const [lang, setLang] = useState("en");
    const [questionNum, setQuestionNum] = useState(0);
    const [incorrectNum, setIncorrectNum] = useState(0);

    const onNext = () => {
      setQuestionNum(questionNum+1)
      setIncorrectNum(0)
    }

    const onIncorrect = () => {
      setIncorrectNum(incorrectNum+1)
    }

    const onFinishQuestions = () => {
      setQuestionNum(0)
      setIncorrectNum(0)
    }

    let value = {
        state: {
            translations: translationBank[lang],
            lang: lang,
            questionNum: questionNum,
            incorrectNum: incorrectNum,
        },
        setLang: (newLang) => setLang(newLang),
        onNext: () => onNext(),
        onIncorrect: () => onIncorrect(),
        onFinishQuestions:() =>  onFinishQuestions(),

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
  

