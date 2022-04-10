import React, {useState,useCallback,useEffect} from 'react';
import {useWrapperContext} from '../../context/context'
import style from './game_layout.module.css'
import SimplifyFraction from '../simplify_fraction';

export default function NumPad ({question}) {
   //get context
   const context = useWrapperContext()
   const lang = context.state.lang

   const correctAnswer = question.answer
   const [answer, setAnswer] = useState("");
   const [showEmptyHint, setShowEmptyHint] = useState(false);

   const btn_values = [
      [ 7, 8, 9],
      [ 4, 5, 6],
      [ 1, 2, 3],
      ["/",0,'←']
   ];

   //handles keypress
   const handleKeyPress = () => {
      if (event.key == "Backspace") {
         handleButtonPress("←")
      } else if (event.key == "Enter") {
         handleButtonPress("✓")
      } else if((event.keyCode >= 48 && event.keyCode <= 57) || event.key =="/") {
         handleButtonPress(event.key)
      } 
   }

   useEffect(() => {
      document.addEventListener("keydown", handleKeyPress);
  
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
   }, [handleKeyPress]);

   
   const handleButtonPress = (value) => {
      if(value == "←") {

         setAnswer(answer.slice(0,answer.length - 1));

      } else if (value == "✓") {
         //TODO: maybe move this?
         if(correctAnswer == "") { //check if answer is anything
            context.onNextQuestion()

            //if there is a function to be called on answer, call it
            if(question.onAnswer) {
               question.onAnswer(answer)
            }

         //check if answer is given from numPad
         } else if (answer) {
            //stop showing hint
            setShowEmptyHint(false)
            //if answer acts as a fill in
            if(correctAnswer == "fill_in") {
               if (question.onAnswer(answer)) {
                  context.onNextQuestion()
               } else {
                  context.onIncorrectQuestion()
               }
            } else if(SimplifyAnswer(answer) == correctAnswer) {
               context.onNextQuestion()
            } else {
               context.onIncorrectQuestion()
            }
         } else {
            //needed answer but non was given, should show hint that answer was empty
            setShowEmptyHint(true)
         }

         //resets answer for next question
         setAnswer("");
         
      } else {
         setAnswer(answer + value);
      }
   }

   const renderButton = (value) => {
      
      return (
         <button key={value} onClick={() => handleButtonPress(value)} className={style.num_pad_button}>
            {value}
         </button>
      );
      
   }

   const render = () => {

      if (correctAnswer == "") {
         return (
         <button
            onClick={() => handleButtonPress("✓")}
            className={style.continue_button}>
            {lang == "en" ? "Continue" : "Continuar"}
         </button>
         )
      } else {
         return (
         //TODO: replace table with better <div> method using blocklayout
         <div>
            {showEmptyHint ? 
            <p>{emptyHint[lang]}</p> : <></>}
            <table className={style.num_pad_container}>
               <tbody>
                  <tr>
                     <td className={style.num_pad_button_box}>
                        {btn_values.flat().map((btn) => {
                           return (
                              renderButton(btn)
                           );
                        })}  
                     </td>
                     <td className={style.num_pad_left_box}>
                        <p className={style.num_pad_answer}> <b className={style.num_pad_answer_text}>{answer} </b></p>
                     </td>
                     <td className={style.num_pad_left_box}>
                        {renderButton("✓")}
                     </td>
                  </tr>
               </tbody>
            </table>
            <input className="key_listener" autoFocus={true} onBlur={({ target }) => target.focus()}/>
         </div>
         )
      }

   }

   //TODO: if no correct answer, show nothing but continue button?
   return ( 
      render()
   );
}

const SimplifyAnswer = (answer) => {
   if(isNaN(answer)) { //answer contains fraction 
      var numer = answer.split("/")[0]
      var dinomi = answer.split("/")[1]
      return SimplifyFraction(numer,dinomi)
   } else {
      return answer //if no fraction, answer is simple as it gets
   }
}

const emptyHint = {
   en:"Please put in an answer.",
   es:"Por favor, ponga una respuesta.",
}