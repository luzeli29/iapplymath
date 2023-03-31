import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router'
import style from '@styles/game_layout.module.css'
import translations from '@translations';
import {Dialog,simplifyAnswer, throwError} from '@utils/imports/commonImports'
import 'reactjs-popup/dist/index.css';
import Ayu from '@comps/game/quizComps/ayu';
import AnswerBox from '@comps/game/quizComps/answerBox';
import QuestionBox from '@comps/game/quizComps/questionBox';
import { useStopWatch } from '@hooks/useStopWatch';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import { err } from '@utils/debug/log';
import Creator from 'pages/user/checkIn'


export default function QuestionLayout ({children, questions, onBack, onFinish}) {
   //get current context and other context variables
   const {user,settings,loading, error} = useUserContext()
   const [questionNum, setQuestionNum] = useState(0)
   const router = useRouter()
   const isLoggedIn = user.loggedIn
   const [incorrectNum, setIncorrectNum] = useState(0);
   const [state, setState] = useState("questions")
   const [isFinished, setFinished] = useState(false)
   if(!questions) {
      handleExit("BACK")
   }
   useEffect(() => {
      setFinished(false)
   }, [questions]);

   //adds positive feedback after a question was answered correctly
   var _questions = []
   if(questions) {
      for(var i = 0; i < questions.length; i ++) {
         _questions[_questions.length] = questions[i]
         _questions[_questions.length] = translations.question_feedback[Math.floor(Math.random() * translations.question_feedback.length)]
      }
   }
   if(loading) return <Loading/>
   if(!router.isReady) return <Loading/>
   if(error) return <Error error={error}/>
   if(!isLoggedIn) return <Login/>
   if(state == "finished") return <Loading/>
   const lang = settings.lang
   //const {start,stop,reset,isRunning,time} = useStopWatch()

   //get router for Next.js

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
   const handleCheckinEnd = () => {
      setState("dialogue");
   };

   const handleDialogueEnd = () => {
      setState("checkin2");
   };

   const handleCheckin2End = () => {
      setState("questions");
   };

   const renderContent = () => {
      switch (state) {
         case "ayu":
            return <Creator onEnd={handleCheckinEnd} />;
         case "dialogue":
            return <Dialog scriptId={"ayu_relaxation_0"} onEnd={handleDialogueEnd}/>;
         case "checkin2":
            return <Creator onEnd={handleCheckin2End} />;
         default:
            return null;
      }
   };

   async function handleExit(exitType) {
      const cleanedQuestions = cleanQuestions(_questions)

      if(cleanedQuestions.length > 0) {
         const gameType = router.pathname.split("/")[2]

         let questionData = {
            games_played: {
               questions: cleanedQuestions,
               username: user.username,
               gameType: gameType,
            }
         }

         if(gameType == "restaurant") {
            //questionData.order = cleanOrder()
         }

         try {
            user.putSession(questionData)
         } catch (e) {
            err(e.message)
         }

      }
      setFinished(true)
      setQuestionNum(0)
      switch(exitType) {
         case "FINISHED":
            handleFinish()
            break;
         case "BACK":
            handleBack()
            break;
      }
   }

   //create two states
   //State keeps track of where the page is in terms of the game
   //incorrectNum keeps track of number of incorrect in a row
   //handles when the user submites their answer
   const handleSubmitAnswer = (answer) => {
      //figures out what type of question the user is answering
      switch(_questions[questionNum].answer) {
         case "" : // No Correct answer, blank number pad (usually for feedback questions)
               setQuestionNum(questionNum + 1)
               setIncorrectNum(0)
               //if there is a function to be called on answer, call it
               if(_questions[questionNum].onAnswer) {
                  _questions[questionNum].onAnswer(answer)
               }
               break;
         case "fill_in" : //Question requires value from user to be later used
               //if filled in answer is good onAnswer returns true and we move on
               if (_questions[questionNum].onAnswer(answer)) {
                  setQuestionNum(questionNum + 1)
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
                  _questions[questionNum].incorrectNum = incorrectNum
                  //reset()
                  setQuestionNum(questionNum + 1)
                  setIncorrectNum(0)
               } else { //Answer is incorrect
                  setIncorrectNum(incorrectNum + 1)
               }
      }
   }

   if(state == "questions") {
      if(questionNum < _questions.length) {
         const correctAnswer = _questions[questionNum].answer;
         const answerFormat = _questions[questionNum].answerFormat;
         /*
         if(!isRunning 
               && correctAnswer != "fill_in"
                  && correctAnswer) {
            //start()
         }
         */
         return (
            <>
               <div className="back_button_container">
                  <button className="basic_button" id={style.back_button} onClick={() => handleExit("BACK")}>{translations.back[lang]}</button>
               </div>
               <table className="fill_container">
                  <tbody>
                     <tr>
                        <td className={style.child_container}>
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
         handleExit("FINISHED")
         return (<Loading/>)
      }
   } else {
      //TODO: switch dialog randomly in order to have different ayu relaxations

       return (
           <>
           {renderContent()}
           </>
       )
         //<Creator onEnd={handleAyuReturn} />
           //<Dialog scriptId={"ayu_relaxation_0"} onEnd={() => handleAyuReturn()}/>
   }
}

function cleanQuestions(questions) {
   let cleanedQuestions = []
   questions.map((question) =>{
       if(question.answer == "") return;
       if(question.answer == "fill_in") return;
       if(!(question.incorrectNum >= 0)) {
         question.incorrectNum = "not_answered"
       }
       cleanedQuestions[cleanedQuestions.length] = {
         question_text: question.en,
         correct_answer: question.answer,
         incorrect_num: question.incorrectNum,
         time_taken: question.timeTaken
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