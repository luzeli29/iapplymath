import React from 'react'
import { BasicCalculator } from './basicCalculator';
import DevErr from '@utils/debug/devErr';

const QuizCalculator = ({calculatorType, lang, notepad = false}) => {
  lang = lang ? lang : 'en'
  switch(calculatorType) {
    case 'basic':
      return <BasicCalculator lang={lang} notepad={notepad}/>
    default:
      DevErr('Invalid calculatorType. Returning basic calculator.')
      return <BasicCalculator lang={lang} notepad={notepad}/>
  }
}

export default QuizCalculator
