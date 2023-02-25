import React, {useState} from 'react';
import {useRouter} from 'next/router'
import style from '@styles/game_layout.module.css'
import translations from '@translations';
import {useWrapperContext,Dialog,simplifyAnswer, throwError} from '@common_imports'
import 'reactjs-popup/dist/index.css';
import Ayu from '@components/game/question_layout/Ayu';
import AnswerBox from '@components/game/question_layout/AnswerBox';
import QuestionBox from '@components/game/question_layout/QuestionBox';
import { useStopWatch } from '@hooks/useStopWatch';
import ReactHowler from 'react-howler';

export default function QuestionLayout ({children, questions, onBack, onFinish}) {
   //get current context and other context variables
   const context = useWrapperContext()
   const questionNum = context.state.questionNum
   const lang = context.state.lang
   const petId = context.state.petId
   const {start,stop,reset,isRunning,time} = useStopWatch();
   const [playSound, setPlaySound] = useState(false);

   //get router for Next.js
   const router = useRouter()

   function handleAyuClick() {
      //stop()
      setState("ayu")
   }

   function handleAyuReturn() {
      setState("questions")
      //start()
   }

   function handleFinish() {
      if(onFinish) {
         onFinish()
      } else {
         router.push('/game')
      }
   }

   function handleBack() {
      if(onBack) {
         onBack()
      } else {
         router.push('/game')
      }
   }

   async function handleExit(exitType) {
      context.setQuestionNum(0)
      const cleanedQuestions = cleanQuestions(_questions)

      if(cleanedQuestions.length > 0) {

         const gameType = router.pathname.split("/")[2]

         let questionData = {
            questions: cleanedQuestions,
            username: context.state.username,
            gameType: gameType,
         }

         if(gameType == "restaurant") {
            questionData.order = cleanOrder(context.state.order)
         }

         const endpoint = '/api/session/saveQuestions'

         const JSONdata = JSON.stringify(questionData)

         const options = {
         method: 'POST',
         headers: {
               'Content-Type': 'application/json',
         },
         body: JSONdata,
         }
         const response = await fetch(endpoint, options)
         const result = await response.json()
      
         if(result.code != 200)    {
            throwError("Error when trying to save question data in game_question_layout.js")
         }    
      }  

      switch(exitType) {
         case "FINISHED":
            handleFinish()
            break;
         case "BACK":
            handleBack()
            break;
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
                  //stop()
                  //_questions[questionNum].timeTaken = time
                  _questions[questionNum].incorrectNum = incorrectNum;
                  setPlaySound(true);
                  //reset()
                  context.setQuestionNum(questionNum + 1)
                  setIncorrectNum(0)
               } else { //Answer is incorrect
                  setIncorrectNum(incorrectNum + 1)
               }
      }
   }

   //Box that shows user the question, feedback after answering, and hint if there are incorrect guesses
   //switches view depending on what state GameLayout is in
   if(state == "questions") { //Question state is the standard state where user needs to answer questions
      //check if user has completed every question
      if(questionNum < _questions.length) {
         const correctAnswer = _questions[questionNum].answer;
         const answerFormat = _questions[questionNum].answerFormat;
         if(!isRunning 
               && correctAnswer != "fill_in"
                  && correctAnswer) {
            //start()
         }
         //Return the view to answer questions
         //It would be good to potencially replace <table> with a css grid
         return (
            <>
               {playSound && (
                   <ReactHowler
                       src="sound/success.mp3"
                       playing={true}
                       onEnd={() => setPlaySound(false)}
                   />
               )}
               <div className="back_button_container">
                  <button className="basic_button" id={style.back_button} onClick={() => handleExit("BACK")}>{translations.back[lang]}</button>
               </div>
               <table className="fill_container">
                  <tbody>
                     <tr>
                        <td className={style.child_container}>
                           <p>{}</p>
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
                           <Ayu handleAyuClick={() => handleAyuClick()}/>  
                        </td>
                     </tr>
                  </tbody>
               </table>     
            </>             
         )
      } else {
         //User has answered all the questions, call onFinish and return a blank view
         handleExit("FINISHED")
         return (<></>)
      }
   } else {
      //Shows a Ayu dialog to help relax user
      //TODO: switch dialog randomly in order to have different ayu relaxations
       //Dialog ({scriptId, onEnd, onInput})
       return (
            <Dialog scriptId={"ayu_relaxation_0"} onEnd={() => handleAyuReturn()}/>
       )
   }
}

function cleanQuestions(questions) {
   let cleanedQuestions = []
   questions.map((question) =>{
       if(question.answer == "") return;
       if(question.answer == "fill_in") return;
       cleanedQuestions[cleanedQuestions.length] = {
         question_text: question.en,
         question_answer: question.answer,
         incorrect_num: question.incorrectNum
       }
   })
   return cleanedQuestions
}

function cleanOrder(order) {
   let cleanedOrder = {
      entree : order.entree.en + " - $" + order.entree.price,
      drink : order.drink.en + " - $" + order.drink.price,
      dessert : order.dessert.en + " - $" + order.dessert.price
   }
   return cleanedOrder
}