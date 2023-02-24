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
import Ayu from '@components/game/question_layout/Ayu';
import AnswerBox from '@components/game/question_layout/AnswerBox';
import QuestionBox from '@components/game/question_layout/QuestionBox';
import { useStopWatch } from '@hooks/useStopWatch';
//TODO: fix confusing parm names such as answer vs question answer
//TODO: fix params of helper functions
export default function QuestionLayout ({children, questions, onBack, onFinish}) {
   //get current context and other context variables
   const context = useWrapperContext()
   const questionNum = context.state.questionNum
   const lang = context.state.lang
   const petId = context.state.petId

   //get router for Next.js
   const router = useRouter()

   function handleExit(isFinished) {

      //API TO SAVE DATA HERE

      if(isFinished) {
         if(onFinish) {
            onFinish()
         } else {
            router.push('/game')
         }
      }

   }

   //adds positive feedback after a question was answered correctly
   var _questions = []

   if(questions) {
      for(var i = 0; i < questions.length; i ++) {
         _questions[_questions.length] = questions[i]
         _questions[_questions.length] = translations.question_feedback[Math.floor(Math.random() * translations.question_feedback.length)]
      }
   }
   //create two states
   //State keeps track of where the page is in terms of the game
   const [state, setState] = useState("questions")
   //incorrectNum keeps track of number of incorrect in a row
   const [incorrectNum, setIncorrectNum] = useState(0);

   //handles when the user submites their answer
   const handleSubmitAnswer = (answer) => {
      //figures out what type of question the user is answering
      switch(_questions[questionNum].answer) {
         case "" : // No Correct answer, blank number pad (usually for feedback questions)
               context.setQuestionNum(questionNum + 1)
               setIncorrectNum(0)
               //if there is a function to be called on answer, call it
               if(_questions[questionNum].onAnswer) {
                  _questions[questionNum].onAnswer(answer)
               }
               break;
         case "fill_in" : //Question requires value from user to be later used
               //if filled in answer is good onAnswer returns true and we move on
               if (_questions[questionNum].onAnswer(answer)) { 
                  context.setQuestionNum(questionNum + 1)
                  setIncorrectNum(0)
               } else { //Filled in answer is not accepted
                  setIncorrectNum(incorrectNum + 1)
               }
               break;
         default :
               //Test if input is correct
               if(simplifyAnswer(answer) == _questions[questionNum].answer) { //Answer is correct
                     stop()
                     _questions[questionNum].timeTaken = time
                     _questions[questionNum].incorrectNum = incorrectNum
                     reset()
                  context.setQuestionNum(questionNum + 1)
                  setIncorrectNum(0)
               } else { //Answer is incorrect
                  setIncorrectNum(incorrectNum + 1)
               }
      }
   }

   //Box that shows user the question, feedback after answering, and hint if there are incorrect guesses
   const {start,stop,reset,isRunning,time} = useStopWatch()

   //switches view depending on what state GameLayout is in
   if(state == "questions") { //Question state is the standard state where user needs to answer questions
      //check if user has completed every question
      if(questionNum < _questions.length) {
         const correctAnswer = _questions[questionNum].answer;
         const answerFormat = _questions[questionNum].answerFormat;
         if(!isRunning 
               && correctAnswer != "fill_in"
                  && correctAnswer) {
            start()
         }
         //Return the view to answer questions
         //It would be good to potencially replace <table> with a css grid
         return (
            <>
               <div className="back_button_container">
                  <button className="basic_button" id={style.back_button} onClick={() => onBack()}>{translations.back[lang]}</button>
               </div>
               <table className="fill_container">
                  <tbody>
                     <tr>
                        <td className={style.child_container}>
                           <p>{time}</p>
                           {children}
                        </td>
                        <td className={style.question_container}>
                           <QuestionBox 
                              className={style.question_box}
                              questionData={_questions[questionNum]}
                              incorrectNum={incorrectNum}/>
                        </td>
                     </tr>
                     <tr>
                        <td className={style.numpad_container}>
                              <AnswerBox
                                 correctAnswer={correctAnswer}
                                 answerFormat={answerFormat}
                                 handleSubmitAnswer={handleSubmitAnswer}/>
                        </td>
                        <td className={style.ayu_block}>
                           <Ayu changeGameState={() => setState("ayu")}/>  
                        </td>
                     </tr>
                  </tbody>
               </table>     
            </>             
         )
      } else {
         //User has answered all the questions, call onFinish and return a blank view
         context.setQuestionNum(0)
         handleExit()
         return (<></>)
      }
   } else {
      //Shows a Ayu dialog to help relax user
      //TODO: switch dialog randomly in order to have different ayu relaxations
       //Dialog ({scriptId, onEnd, onInput})
       return (
            <Dialog scriptId={"ayu_relaxation_0"} onEnd={() => setState("questions")}/>
       )
   }
    
}