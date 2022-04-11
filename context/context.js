import React, { useState,createContext, useContext } from 'react';

const Context = createContext();

export default function ContextWrapper({ children }) {
    const [lang, setLang] = useState("en");
    const [avatar, setAvatar] = useState("1");

    const [questionNum, setQuestionNum] = useState(0);
    const [incorrectNum, setIncorrectNum] = useState(0);
    const [lineNum, setLineNum] = useState(0);
    const [gamelayoutState, setGamelayoutState] = useState("questions");

    const onNextQuestion = () => {
      setQuestionNum(questionNum + 1)
      setIncorrectNum(0)
    }

    const onIncorrectQuestion = () => {
      setIncorrectNum(incorrectNum + 1)
    }

    const onFinishQuestions = () => {
      setQuestionNum(0)
      setIncorrectNum(0)
    }

    const nextLine = () => {
      setLineNum(lineNum + 1)
    }

    const endDialog = () => {
      setLineNum(0)
    }

    let value = {
        state: {
            lang: lang,
            questionNum: questionNum,
            incorrectNum: incorrectNum,
            lineNum: lineNum,
            gamelayoutState:gamelayoutState,
            avatar:avatar,
        },
        setLang: (newLang) => setLang(newLang),
        setAvatar: (newAvatar) => setAvatar(newAvatar),
        onNextQuestion: () => onNextQuestion(),
        onIncorrectQuestion: () => onIncorrectQuestion(),
        onFinishQuestions:() =>  onFinishQuestions(),
        nextLine:() => nextLine(),
        endDialog: () => endDialog(),
        setGamelayoutState: (newState) => setGamelayoutState(newState),
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
  

