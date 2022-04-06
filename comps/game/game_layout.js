import React, {useState} from 'react';
import {useWrapperContext} from '../../context/context'
import NumPad from './num_pad';
import style from './game_layout.module.css'
import Image from 'next/image'
/*
Things GameLayout should get
-Game data 
   - game component recipe, interactive menu)
   - question
   - how many wrong
   - stage
-onChange -> how the game changed when submiting number
Things GameLayout should show
-game component
-Ayu
-Number Pad
-Question 
*/
export default function GameLayout ({children, questions, onFinish}) {
   //get context
   const context = useWrapperContext()
   //get needed data from context
   const lang =context.state.lang
   const questionNum = context.state.questionNum
   const incorrectNum = context.state.incorrectNum
   const [random, setRandom] = useState(0);
   const [state, setState] = useState("questions");
   const [isHovering, setIsHovered] = useState(false);
   const onMouseEnter = () => {
      setIsHovered(true);
      setRandom(Math.floor(Math.random() * 11));
      console.log(random)
   }
   const onMouseLeave = () => setIsHovered(false);


   const handleCorrect = () => {
      context.onNext()
   }

   const handleIncorrect = () => {
      context.onIncorrect()
   }

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
         <>
            <p>{questions[questionNum].t[lang]}</p>
            <p>{hintText}</p>
         </>
      );   
   }

   const Ayu = () => {
      return (
         <> 
            <div className={style.ayu_speech_bubble}>
               {isHovering ? 
                  <>
                     <p className={style.speech_bubble_text}>{ayu_dialog.affermations[random][lang]}</p>
                  </> : <></>}
            </div>

            
               <div className={style.ayu_image_container}>
                  <button onClick={() => {setState("ayu")}}>
                     <Image
                        layout={"fill"}
                        src={"/img/ayu/tempAyu.png"}/>
                  </button>
               </div>
             
         </>
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
                        onCorrect={() => handleCorrect()}
                        onIncorrect={() => handleIncorrect()}
                     />
                  </td>

                  <td className={style.ayu_container}
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
      //Change to dialog
      return (
         <>
            <button onClick={() => setState("questions")}>questions</button>
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
   
const ayu_dialog = {
   greeting: {
         en: "Hello",
         es: "Ola"
   },

   affermations: [
      {
         en: "Working out math problems is fun.",
         es: "Resolver problemas de matemáticas es divertido.",
      },{
         en: "I’m capable of learning math.",
         es: "Soy capaz de aprender matemáticas.",
      },{
         en: "I have good abilities in math.",
         es: "Tengo buenas habilidades en matemáticas.",
      },{
         en: "I am relaxed, calm, alert, and confident in math.",
         es: "Estoy tranquilo/a, alerta y seguro/a en matemáticas.",
      },{
         en: "My math skills improve every day when I practice.",
         es: "Mis habilidades matemáticas mejoran cada día cuando practico.",
      },{
         en: "I like math because it’s useful in everyday life.",
         es: "Me gustan las matemáticas porque son útiles en mi día a día.",
      },{
         en: "With more practice it will get easier!",
         es: "¡Con más práctica será más fácil!",
      },{
         en: "I’m still learning and I will keep trying!",
         es: "¡Todavía estoy aprendiendo y seguiré intentando!",
      },{
         en: "I can do great things",
         es: "Puedo hacer cosas grandiosas",
      },{
         en: "I’m intelligent in many ways.",
         es: "Soy inteligente de muchas maneras.",
      },{
         en: "I can learn whatever I put my mind to.",
         es: "Puedo aprender lo que me proponga.",
      },
   ],
}



