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
import TextReader from '@components/accessibility/text_reader';

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

   //if no onFinish, route to index
   const _onFinish = onFinish ? onFinish : () => router.push('/')

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
   const handleAnswer = (answer) => {
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
                  context.setQuestionNum(questionNum + 1)
                  setIncorrectNum(0)
               } else { //Answer is incorrect
                  setIncorrectNum(incorrectNum + 1)
               }
      }
   }

   //Box that shows user the question, feedback after answering, and hint if there are incorrect guesses
   const QuestionBox = ({question_data, incorrectNum}) => {
      const hintText = incorrectNum > 0 ? 
                           (incorrectNum) > question_data.hints.length ? 
                              question_data.hints.at(-1)[lang] 
                              : question_data.hints[incorrectNum-1][lang] 
                           : "";
      return (
         <div className={style.question_text_container}>
            <div className="row">
               <div className="col-lg-2">
                  <TextReader text={question_data[lang]}/>
               </div>
               <div className="col-lg-10">
                  <p>{question_data[lang]}</p>
               </div>
            </div>
            {hintText ? 
            <div className="row">
               <div className="col-lg-2">
                  <TextReader text={hintText}/>
               </div>
               <div className="col-lg-10">
                  <p>{hintText}</p>
               </div>
            </div> 
            :
            <></>}
         </div>
      );
   }
   
   //Ayu component that is found on the bottom right box of GameLayout
   function Ayu ({}) {

      //get lang from context
      //potencially have context as a parm since useWrapperContext() might be adding unessisary stress
      const context = useWrapperContext()
      const lang = context.state.lang

      //afNum is the affermation that should be shown if user hovers on Ayu
      const [afNum, setAyuAfNum] = useState(0);
      //isHovering keeps track of if the user is hovering on Ayu
      const [isHovering, setIsHovered] = useState(false);

      //Handles mouse over Ayu
      const onMouseEnter = () => {
         setIsHovered(true);
         setAyuAfNum(Math.floor(Math.random() * 11));
      }

      //Handles mouse leaving Ayu
      const onMouseLeave = () => setIsHovered(false);

      return (
         <div className="fill_container"
               onMouseEnter={onMouseEnter}
               onMouseLeave={onMouseLeave}> 
            <div className={style.ayu_speech_bubble_container}>
               
               {isHovering ? 
                  <div className={style.ayu_speech_bubble}>
                     <div className={style.ayu_speech_bubble_triangle} ></div>
                     <p className={style.speech_bubble_text}>{translations.ayu_affermations[afNum][lang]}</p>
                  </div> : <></>}
            </div>
            
            <div className={style.ayu_image_container}>
               <button onClick={() => setState("ayu")}>
                  <Image
                     priority={true}
                     layout={"fill"}
                     src={"/img/ayu/ayu_idle.gif"}/>
               </button>
            </div>
            
         </div>
      )
   }

   //NumPad is the numberpad found in the bottom left of GameLayout
   function NumPad() {

      const question = _questions[questionNum]

      //answer is the current answer in the numpad before submitting
      const [answer, setAnswer] = useState("");
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
      },[answer])

      //useEffect to allow for keypress to be registered
      useEffect(() => {
         //handles keypress
         document.addEventListener("keydown", handleKeyPress);
   
         return () => {
            document.removeEventListener("keydown", handleKeyPress);
         };
      }, [handleKeyPress]);

      
      //handles a button press or keypress
      function handleButtonPress(value) {
         if(value == "←") {
            //removes the rightmost char
            setAnswer(answer.slice(0,answer.length - 1)); 
         } else if (value == "✓") {
            //submits answer
            if (answer) {
               //answer is not empty and needs to be not empty (answering a normal question)
               //makes sure empty hint is removed
               handleAnswer(answer)
            } else if (question.answer == "") {
               //answer is supposed to be blank
               handleAnswer(answer)
            } else {
               //answer was blank but was not supposed to be blank
               setShowEmptyHint(true)
            }
         } else {
            //adding a number to the current answer value
            //Makes sure answer is less then 7 char
            setAnswer(formatAnswer(_questions[questionNum].answer_format,answer).toString().length < 7 ? answer + value : answer);
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

      //switches numPad depending and what the answer should be
      if (!question.answer) {
         //returns when there is no needed answer
         return (
            <><>
               <div className="header_container">
                  <Confetti
                     confettiSource={{ x: 0, y: -100, w: 650, h: 600 }}
                     friction={0.96} />
               </div>

            </><div className="fill_container">
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
         //TODO: replace table with better <div> method using css
            <div>
               {showEmptyHint ? 
               <p>{translations.empty_hint[lang]}</p> : <></>}
               <table className={style.num_pad_container}>
                  <tbody>
                     <tr>
                        <td className={style.num_pad_button_box}>
                        
                        </td>
                        <td className={style.num_pad_left_box}>
                           <p className={style.num_pad_answer}> <b className={style.num_pad_answer_text}>{formatAnswer(_questions[questionNum].answer_format,answer)} </b></p>
                        </td>
                        <td className={style.num_pad_left_box}>
                           {renderButton("✓")}
                        </td>
                     </tr>
                  </tbody>
               </table>
               <input className="d-none" autoFocus={true} onBlur={({ target }) => target.focus()}/>
            </div>
         )
      }
   }

   //switches view depending on what state GameLayout is in
   if(state == "questions") { //Question state is the standard state where user needs to answer questions
      //check if user has completed every question
      if(questionNum < _questions.length) {
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
                              {children}
                           </td>
                           <td className={style.question_container}>
                              <QuestionBox 
                                 className={style.question_box}
                                 question_data={_questions[questionNum]}
                                 incorrectNum={incorrectNum}/>
                           </td>
                     </tr>
      
                     <tr>
      
                     <td className={style.numpad_container}>
                        <Popup trigger={
                           <button isHovering={true} style={{marginTop:"10px", marginLeft:"10px"}}> 
                              <Image width={30} height={50} src={"/img/other/calcicon.png"}/>
                           </button>}
                           closeOnDocumentClick={false} position="left center" offsetX={150} offsetY={-100}>
                           <div className="app">
                              <Calculator/>
                           </div>
                         </Popup>
                         <h4>Type answer here:</h4>
                         <Image className={style.pet_img}
                           src = {"/img/pets/pet" + petId + ".png"}
                           width = {60}
                           height = {60}
                        /> 
                         <NumPad/>
                     </td>
                        <td className={style.ayu_block}>
                           <Ayu/>  
                        </td>
                        
                     </tr>
                  </tbody>
               </table>     
            </>             
         )
      } else {
         //User has answered all the questions, call onFinish and return a blank view
         context.setQuestionNum(0)
         _onFinish()
         return (<></>)
      }
   } else {
      //Shows a Ayu dialog to help relax user
      //TODO: switch dialog randomly in order to have different ayu relaxations
       //Dialog ({scriptId, onEnd, onInput})
       return (
            <Dialog scriptId={"ayu_relaxation_0_1"} onEnd={() => setState("questions")}/>
       )
   }
    
}