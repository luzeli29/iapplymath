import React, {useState, useEffect,useCallback} from 'react';
import Image from 'next/image'
import Confetti from 'react-confetti'
import style from '@styles/game_layout.module.css'
import translations from '@translations';
import {useWrapperContext,formatAnswer} from '@utils/imports/commonImports'
import { Calculator } from 'react-mac-calculator'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function AnswerBox({correctAnswer,answerFormat,handleSubmitAnswer}) {
    //get lang from context
    const context = useWrapperContext()
    const lang = context.state.lang
    const [inputAnswer, setInputAnswer] = useState("");
    //keeps track if view should show the empty hint within the numpad
    const [showEmptyHint, setShowEmptyHint] = useState(false);

    const handleKeyPress = useCallback(event => {
        if (event.key == "Backspace") { //backspace pressed
           handleButtonPress("←")
        } else if (event.key == "Enter") { //enter pressed
           //TODO: fix it so this doesnt cause a memory leak
           //handleButtonPress("✓")
        } else if((event.keyCode >= 48 && event.keyCode <= 57) || event.key === '/' ||
            event.key === '.' || event.key === ':' || event.key === 'A' || event.key === 'M' ||
            event.key === 'P' || event.key === '>' || event.key === '<' || event.key === '=') { //0-9 pressed
           handleButtonPress(event.key)
        } 
     },[inputAnswer])

    function submitAnswer() {
        handleSubmitAnswer(inputAnswer)
        setInputAnswer("")
    }

    function handleButtonPress(value) {
        if(value == "←") {
           setInputAnswer(inputAnswer.slice(0,inputAnswer.length - 1)); 
        } else if (value == "✓") {
           if (inputAnswer) {
              submitAnswer(inputAnswer)
           } else if (correctAnswer == "") {
              submitAnswer(inputAnswer)
           } else {
              setShowEmptyHint(true)
           }
        } else {
           setInputAnswer(formatAnswer(answerFormat,inputAnswer).toString().length < 12 ? inputAnswer + value : inputAnswer);
        }
     }

     //standard numpad button
    const renderButton = (value) => {
        return (
           <button key={value} onClick={() => handleButtonPress(value)} className={style.num_pad_button}>
              {value}
           </button>
        );
        
     }

    useEffect(() => {
        //handles keypress
        document.addEventListener("keydown", handleKeyPress);
  
        return () => {
           document.removeEventListener("keydown", handleKeyPress);
        };
     }, [handleKeyPress]);

    console.log(correctAnswer)
    if (correctAnswer === "") {
        //returns when there is no needed answer
        return (
            <>
                <div className="header_container">
                    <Confetti
                    confettiSource={{ x: 0, y: -100, w: 650, h: 600 }}
                    friction={0.96} />
                </div>
                <div className="fill_container">
                    <br></br>
                    <br></br>
                    <button
                            onClick={() => handleButtonPress("✓")}
                            className={style.continue_button}>
                        {translations.continue[lang]}
                    </button>
                </div></>
        )
     } else {
        //there is a needed answer
        return (
        //TODO: Make the CSS wayyyyyy better
            <div>
                <Popup trigger={
                                <button isHovering={true} style={{marginTop:"10px", marginLeft:"10px"}}> 
                                    <Image width={30} height={50} src={"/img/other/calcicon.png"} alt={"calculator"}/>
                                </button>
                                }
                        closeOnDocumentClick={false} 
                        position="left center" offsetX={150} offsetY={-100}>
                    <div className="app">
                        <Calculator/>
                    </div>
                </Popup>
                <h4>Type answer here:</h4>
                <br></br>
                {showEmptyHint ? <p className="red">{translations.empty_hint[lang]}</p> : <></>}
                <br></br>
                <div>
                    <table className={style.num_pad_container}>
                        <tbody>
                            <tr>
                            <td className={style.num_pad_button_box}>
                            
                            </td>
                            <td className={style.num_pad_left_box}>
                                <p className={style.num_pad_answer}> <b className={style.num_pad_answer_text}>{formatAnswer(answerFormat,inputAnswer)} </b></p>
                            </td>
                            <td className={style.num_pad_left_box}>
                                {renderButton("✓")}
                            </td>
                            </tr>
                        </tbody>
                    </table>
                    <input className="d-none" autoFocus={true} onBlur={({ target }) => target.focus()}/>
                </div>
            </div>
        )
     }
}
