import React from 'react'
import { BasicCalculator } from './basicCalculator';
import DevErr from '@utils/debug/devErr';

const QuizCalculator = ({calculatorType}) => {
  
  switch(calculatorType) {
    case 'basic':
      return <BasicCalculator/>
    default:
      DevErr('Invalid calculatorType. Returning basic calculator.')
      return <BasicCalculator/>
  }
}

export default QuizCalculator
