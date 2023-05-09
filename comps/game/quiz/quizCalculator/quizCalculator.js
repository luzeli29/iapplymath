import React from 'react'
import { Calculator } from 'react-mac-calculator'
import Popup from 'reactjs-popup';
import Image from 'next/image'
import { err } from '@utils/debug/log';
import { BasicCalculator } from './basicCalculator';

const QuizCalculator = ({calculatorType}) => {
  
  switch(calculatorType) {
    case 'basic':
      return <BasicCalculator/>
    default:
      err('Invalid calculatorType. Returning basic calculator.')
      return <BasicCalculator/>
  }
}

export default QuizCalculator
