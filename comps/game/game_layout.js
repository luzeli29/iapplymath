import React, {useState} from 'react';
import {useWrapperContext} from '../../context/context'
import NumPad from './num_pad';
import style from './game_layout.module.css'
import Image from 'next/image'
import Dialog from '../dialog';
import script from '../../public/text/script';

export default function GameLayout ({children, questions, onFinish}) {
   //TODO: Handle edge cases

   //get context
   const context = useWrapperContext()
   //get needed data from context
   const lang =context.state.lang
   const questionNum = context.state.questionNum
   const incorrectNum = context.state.incorrectNum
   const state = context.state.gamelayoutState
   const [random, setRandom] = useState(0);
   const [isHovering, setIsHovered] = useState(false);

   const onMouseEnter = () => {
      setIsHovered(true);
      setRandom(Math.floor(Math.random() * 11));
   }

   const onMouseLeave = () => setIsHovered(false);

   //Box that shows user the question, feedback after answering, and hint
   const QuestionBox = () => {
      const hintText = "";

      //Check for hints
      if (incorrectNum == 1) { //check for basic hint
         hintText=firstHint[lang]
      } else if(questions[questionNum].hint) { //question has hints
         
         if (incorrectNum-2 >= questions[questionNum].hint.length) {
            //more incorrect then hints, show last hint
            hintText=questions[questionNum].hint[questions[questionNum].hint.length-1][lang]
         } else if (incorrectNum != 0) {
            //show hint at given incorrect index
            hintText=questions[questionNum].hint[incorrectNum-2][lang]
         }
      }

      return (
         <div className={style.question_text_container}>
            <p>{questions[questionNum][lang]}</p>
            <p>{hintText}</p>
         </div>
      );   
   }

   const Ayu = () => {
      return (
         <div className={style.ayu_container}> 
            <div className={style.ayu_speech_bubble_container}>
               {isHovering ? 
                  <div className={style.ayu_speech_bubble}>
                     <div className={style.ayu_speech_bubble_triangle} > </div>
                     <p className={style.speech_bubble_text}>{script.ayu_affermations[random][lang]}</p>
                  </div> : <></>}
            </div>
            
            <div className={style.ayu_image_container}>
               <button onClick={() => {context.setGamelayoutState("ayu")}}>
                  <Image
                     priority={true}
                     layout={"fill"}
                     src={"/img/ayu/ayu.png"}/>
               </button>
            </div>
             
         </div>
     )
   }


   const QuestionScreen = () => {
      return (
         <table className={style.game_container}>
            <tbody>
               <tr>

                  <td className={style.child_container}>
                     {children}
                  </td>

                  <td className={style.question_container}>
                     <QuestionBox/>
                  </td>
               </tr>

               <tr>

                  <td className={style.numpad_container}>
                     <NumPad 
                        question={questions[questionNum]}
                     />
                  </td>

                  <td className={style.ayu_block}
                     onMouseEnter={onMouseEnter}
                     onMouseLeave={onMouseLeave}>
                     <Ayu/>  
                  </td>

               </tr>
            </tbody>
         </table>                  
      )
   }

   const AyuHelp = () => {
      //TODO: Change to dialog randomly
      return (
         <>
            <Dialog
               stage={"ayu"} 
               script={script.ayu_relaxation[0]} 
               onEnd={() => context.setGamelayoutState("questions")}
               />
         </>
      )
   }

   const render = () => {
      switch(state) {
         case "questions" :
            return (<QuestionScreen/>)
         case "ayu" : 
         return (<AyuHelp/>)
      }
      
      
   }

   if(questionNum >= questions.length) {
      context.onFinishQuestions()
      return (onFinish());
   } else {
      return (render());
   }
   

}

const firstHint = {
   en: "Try again",
   es: "Inténtalo de nuevo"
}