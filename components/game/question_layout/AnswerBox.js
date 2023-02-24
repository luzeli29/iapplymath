import React, {useState, useEffect,useCallback} from 'react';
import Image from 'next/image'
import {useRouter} from 'next/router'
import Confetti from 'react-confetti'
import style from '@styles/game_layout.module.css'
import translations from '@translations';
import {useWrapperContext,Dialog,formatAnswer,simplifyAnswer} from '@common_imports'
import { Calculator } from 'react-mac-calculator'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {motion} from 'framer-motion';
import NumberPad from '@components/game/question_layout/NumberPad'

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
        } else if((event.keyCode >= 48 && event.keyCode <= 57) || event.key =="/") { //0-9 pressed
           handleButtonPress(event.key)
        } 
     },[inputAnswer])
    function submitAnswer() {
        handleSubmitAnswer(inputAnswer)
        setInputAnswer("")
    }
     //handles a button press or keypress
    function handleButtonPress(value) {
        if(value == "←") {
           //removes the rightmost char
           setInputAnswer(inputAnswer.slice(0,inputAnswer.length - 1)); 
        } else if (value == "✓") {
           //submits answer
           if (inputAnswer) {
              //answer is not empty and needs to be not empty (answering a normal question)
              //makes sure empty hint is removed
              submitAnswer(inputAnswer)
           } else if (correctAnswer == "") {
              //answer is supposed to be blank
              submitAnswer(inputAnswer)
           } else {
              //answer was blank but was not supposed to be blank
              setShowEmptyHint(true)
           }
        } else {
           //adding a number to the current answer value
           //Makes sure answer is less then 7 char
           setInputAnswer(formatAnswer(answerFormat,inputAnswer).toString().length < 7 ? inputAnswer + value : inputAnswer);
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

     //useEffect to allow for keypress to be registered
    useEffect(() => {
        //handles keypress
        document.addEventListener("keydown", handleKeyPress);
  
        return () => {
           document.removeEventListener("keydown", handleKeyPress);
        };
     }, [handleKeyPress]);

     //switches numPad depending and what the answer should be
    if (!correctAnswer) {
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
                                    <Image width={30} height={50} src={"/img/other/calcicon.png"}/>
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
                {showEmptyHint ? <p>{translations.empty_hint[lang]}</p> : <></>}
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
