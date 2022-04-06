import React, {useState,useCallback,useEffect} from 'react';
import {useWrapperContext} from '../../context/context'
import style from './game_layout.module.css'

export default function NumPad ({question, onCorrect, onIncorrect}) {
   const correctAnswer = question.answer
   const [answer, setAnswer] = useState("");
    //get context
    const context = useWrapperContext()
   
   const btn_values = [
      [ 7, 8, 9],
      [ 4, 5, 6],
      [ 1, 2, 3],
      ["/",0,'←']
   ];

   const handleKeyPress = useCallback((event) => {
      console.log(event.key)
      if (event.key == "Backspace") {
         //backspace pressed
         setAnswer(prevAnswer => prevAnswer.slice(0,prevAnswer.length-1));
      } else if (event.key == "Enter") {
         //enter pressed
         //TODO: call onAnswer
      } else if((event.keyCode >= 48 && event.keyCode <= 57) || event.key =="/") {
         //key pressed is number
         setAnswer(prevAnswer => prevAnswer+event.key);
      } 
   }, []);

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
         if(correctAnswer === "") { //check is answer is anything
            onCorrect()
            if(question.onAnswer) {
               question.onAnswer(answer)
            }
         } else if (answer) { //check if answer is given
            if(correctAnswer === "fill_in") {
               if (question.onAnswer(answer)) {
                  onCorrect()
                  context.onNext()
               } else {
                  onIncorrect()
               }
            } else if(answer == correctAnswer) {
               onCorrect()
               context.onNext()
            } else {
               onIncorrect()
            }
         }
      
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

   return ( 
      <div>
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
   );
}
 
