import React, {useState, useEffect} from 'react';
import {useWrapperContext} from '../context/context'
import style from '../styles/game_layout.module.css'
import Image from 'next/image'
import Dialog from './dialog';
import translations from '../public/text/translations';
import SimplifyFraction from './simplify_fraction'

export default function GameLayout ({children, questions, onFinish}) {
   const context = useWrapperContext()
   //TODO: Check if questions and onFinish is good

   
   const questionNum = context.state.questionNum
   const [incorrectNum, setIncorrectNum] = useState(0);
   const [state, setState] = useState("questions")
   //get context
   //get needed data from context
   const lang = context.state.lang

   questions = addFeedback({questions})

   const handleAnswer = (answer) => {
      switch(questions[questionNum].answer) {
         case "" : // No Correct answer, blank number pad (usually for feedback questions)
               context.setQuestionNum(questionNum + 1)
               setIncorrectNum(0)
               //if there is a function to be called on answer, call it
               if(questions[questionNum].onAnswer) {
                  questions[questionNum].onAnswer(answer)
               }
               break;
         case "fill_in" : //Question requires value from user
               if (questions[questionNum].onAnswer(answer)) {
                  context.setQuestionNum(questionNum + 1)
                  setIncorrectNum(0)
               } else {
                  setIncorrectNum(incorrectNum + 1)
               }
               break;
         default :
               //Test if input is correct
               if(SimplifyAnswer(answer) == questions[questionNum].answer) { //Answer is correct
                  context.setQuestionNum(questionNum + 1)
                  setIncorrectNum(0)
               } else { //Answer is incorrect
                  setIncorrectNum(incorrectNum + 1)
               }
      }
   }

   const handleAyuClick = () => {
      setState("ayu")
   }

   if(state == "questions") {
      if(questionNum < questions.length) {
         return (
             <table className={style.game_container}>
                 <tbody>
                     <tr>
     
                         <td className={style.child_container}>
                             {children}
                         </td>
                         <td className={style.question_container}>
                             <QuestionBox 
                             className={style.question_box}
                             lang={lang}
                             question_data={questions[questionNum]}
                             incorrectNum={incorrectNum}/>   
                         </td>
                     </tr>
     
                     <tr>
     
                     <td className={style.numpad_container}>
                         <NumPad 
                             question={questions[questionNum]}
                             handleAnswer={handleAnswer}/>
                     </td>
     
                     <td className={style.ayu_block}>
                             <Ayu
                              handleAyuClick={handleAyuClick}/>  
                         </td>
     
                     </tr>
                 </tbody>
             </table>                  
         )
      }
      else {
         context.setQuestionNum(0)
         onFinish()
         return (
            <></>
         )
      }
   } else {
   //TODO: Change to dialog randomly
      return (
         <>
            <Dialog
               scriptId={"ayu_relaxation_0"} 
               onEnd={() => setState("questions")}
               />
         </>
      )     
   }
    
}

//Box that shows user the question, feedback after answering, and hint
const QuestionBox = ({lang,question_data, incorrectNum}) => {
    const hintText = "";

    //Check for need of hints
    if (incorrectNum > 0) {
        if (incorrectNum == 1) { //check for basic hint
            hintText = lang == "en" ? "Try again" : "Inténtalo de nuevo" 
        } else if(question_data.hint) { //question has hints
            
            if (incorrectNum-2 >= question_data.hint.length) {
            //more incorrect then hints, show last hint
            hintText = question_data.hint[question_data.hint.length-1][lang]
            } else if (incorrectNum != 0) {
            //show hint at given incorrect index
            hintText = question_data.hint[incorrectNum-2][lang]
            }
        }
    }
    return (
       <div className={style.question_text_container}>
          <p>{question_data[lang]}</p>
          <p>{hintText}</p>
       </div>
    );   
 }
 
const Ayu = ({handleAyuClick}) => {
   const lang = useWrapperContext().state.lang
   const [afNum, setAyuAfNum] = useState(0);
   const [isHovering, setIsHovered] = useState(false);

   const onMouseEnter = () => {
      setIsHovered(true);
      setAyuAfNum(Math.floor(Math.random() * 11));
   }

   const onMouseLeave = () => setIsHovered(false);
   return (
      <div className={style.ayu_container}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}> 
         <div className={style.ayu_speech_bubble_container}>
            {isHovering ? 
               <div className={style.ayu_speech_bubble}>
                  <div className={style.ayu_speech_bubble_triangle} > </div>
                  <p className={style.speech_bubble_text}>{translations.ayu_affermations[afNum][lang]}</p>
               </div> : <></>}
         </div>
         
         <div className={style.ayu_image_container}>
            <button onClick={() => handleAyuClick()}>
               <Image
                  priority={true}
                  layout={"fill"}
                  src={"/img/ayu/ayu.png"}/>
            </button>
         </div>
         
      </div>
)
}

const NumPad = ({question,handleAnswer}) => {
   //get context
   const context = useWrapperContext()
   const lang = context.state.lang

   const correctAnswer = question.answer
   const [answer, setAnswer] = useState("");
   const [showEmptyHint, setShowEmptyHint] = useState(false);

   const btn_values = [
      [ 1, 2, 3],
      [ 4, 5, 6],
      [ 7, 8, 9],
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
        if (answer) {//check if answer is not empty and needs to be not empty
            setShowEmptyHint(false)
            handleAnswer(answer)
        } else if (question.answer == "") {
            setShowEmptyHint(false)
            handleAnswer(answer)
        } else {
            setShowEmptyHint(true)
        }
         
         //resets answer for next question
         setAnswer("");
         
      } else {
         //TODO: stop from having more then like 7 chars
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
            <div className={style.continue_button_container}>
            <button
               onClick={() => handleButtonPress("✓")}
               className={style.continue_button}>
                  {lang == "en" ? "Continue" : "Continuar"}
               </button>
            </div>
         
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

const addFeedback = ({questions}) => {
   var newQuestions = []
  
   questions.map(question => {
      newQuestions[newQuestions.length] = question
      newQuestions[newQuestions.length] = feedback[Math.floor(Math.random() * feedback.length)]

   })

   return newQuestions
}

const emptyHint = {
   en:"Please put in an answer.",
   es:"Por favor, ponga una respuesta.",
}

const feedback = [ 
   {
       en: "Excellent!",
       es:"¡Muy bien!",   
       answer: ""
   },{
       en: "Correct!",
       es:"¡Correcto!",
       answer: ""
   },{
       en: "Great Job!",
       es:"¡Excelente trabajo!",
       answer: ""
   },
]