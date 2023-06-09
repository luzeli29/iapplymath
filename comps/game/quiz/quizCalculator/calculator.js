import React, { useState } from 'react';

const Calculator = () => {

  const [displayValue, setDisplayValue] = useState('0');
  const [mode, setMode] = useState('decimal');

  const handleModeChange = () => {
    const newMode = mode === 'decimal' ? 'fraction' : 'decimal';
    setMode(newMode);
    setDisplayValue('0');
  };

  const handleDigitClick = (digit) => {
    if (displayValue === '0') {
      setDisplayValue(digit.toString());
    } else {
      setDisplayValue((prevValue) => prevValue + digit.toString());
    }
  };

  const handleDecimalClick = () => {
    if (mode === 'decimal' && !displayValue.includes('.')) {
      setDisplayValue((prevValue) => prevValue + '.');
    }
  };

  const handleClearClick = () => {
    setDisplayValue('0');
  };

  const handleOperationClick = (operation) => {
    setDisplayValue((prevValue) => prevValue + operation);
  };

  const handleEqualClick = () => {
    try {
      let result = displayValue;
  
      if (mode === 'fraction') {
        result = eval(displayValue);
        if (result % 1 !== 0) {
          result = decimalToFraction(result);
        }
      } else {
        result = eval(displayValue);
      }
  
      setDisplayValue(result.toString());
    } catch (error) {
      setDisplayValue('Error');
    }
  };

  const decimalToFraction = (decimal) => {
    const tolerance = 1.0e-9;
    let numerator = 1;
    let denominator = 1;
  
    if (Math.abs(decimal - Math.round(decimal)) < tolerance) {
      numerator = Math.round(decimal);
    } else {
      const count = decimal.toString().length - 2;
      const denominatorPower = Math.pow(10, count);
      numerator = decimal * denominatorPower;
      denominator = denominatorPower;
    }
  
    const gcd = (a, b) => {
      return b === 0 ? a : gcd(b, a % b);
    };
  
    const gcdValue = gcd(numerator, denominator);
    numerator /= gcdValue;
    denominator /= gcdValue;
  
    return `${numerator}/${denominator}`;
  };

  return (
    <div className='calculator'>
      <div className="calculator-display">{displayValue.slice(0, 13)}</div>
      <button className="mode-button" onClick={handleModeChange}>
        Switch to {mode === 'decimal' ? 'Fraction' : 'Decimal'}
      </button>
      <div className="calculator-buttons">

        <div className="calculator-row">
          <button className="clear-button" onClick={handleClearClick}>C</button>
          <button className="operation-button" onClick={() => handleOperationClick('/')}>÷</button>
        </div>
        <div className="calculator-row">
          <button  className='calculator-button' onClick={() => handleDigitClick(7)}>7</button>
          <button  className='calculator-button' onClick={() => handleDigitClick(8)}>8</button>
          <button  className='calculator-button' onClick={() => handleDigitClick(9)}>9</button>
          <button className="operation-button" onClick={() => handleOperationClick('*')}>X</button>
          
         
          
        </div>
        <div className="calculator-row">
          <button className='calculator-button' onClick={() => handleDigitClick(4)}>4</button>
          <button  className='calculator-button' onClick={() => handleDigitClick(5)}>5</button>
          <button className='calculator-button' onClick={() => handleDigitClick(6)}>6</button>
          <button className="operation-button" onClick={() => handleOperationClick('-')}>-</button>
         
          
        </div>
        <div className="calculator-row">
          <button  className='calculator-button' onClick={() => handleDigitClick(1)}>1</button>
          <button  className='calculator-button' onClick={() => handleDigitClick(2)}>2</button>
          <button  className='calculator-button' onClick={() => handleDigitClick(3)}>3</button>
          <button className="operation-button" onClick={() => handleOperationClick('+')}>+</button>
          
        </div>
        <div className="calculator-row">
        <button  className='calculator-button2' onClick={() => handleDigitClick(0)}>0</button>
        {mode === 'decimal' ? (
            <button className="decimal-button" onClick={handleDecimalClick}>.</button>
            ) : (
            <button className="operation2-button" onClick={() => handleOperationClick('/')}>/</button>
            )}
        <button className="equal-button" onClick={handleEqualClick}>=</button>
        </div>
        
      </div>
    </div>
  );
};

export default Calculator;
