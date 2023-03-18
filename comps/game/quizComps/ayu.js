import React, {useState} from 'react';
import Image from 'next/image'
import style from '@styles/game_layout.module.css'
import translations from '@translations';
import {useWrapperContext} from '@utils/imports/commonImports'
import 'reactjs-popup/dist/index.css';
import {GiYarn, GiHand} from "react-icons/gi";
import Tooltip from 'comps/accessibility/tooltip';
import { getText } from '@utils/imports/commonImports';
//Ayu component that is found on the bottom right box of GameLayout
export default function Ayu ({handleAyuClick}) {
    //get lang from context
    const context = useWrapperContext()
    const lang = context.state.lang

    //afNum is the affermation that should be shown if user hovers on Ayu
    const [afNum, setAyuAfNum] = useState(0);
    //isHovering keeps track of if the user is hovering on Ayu
    const [isHovering, setIsHovered] = useState(false);

    async function handleAPICall() {
       const endpoint = '/api/session/incrementAyu/' + context.state.username

       const options = {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json',
          },
       }

       const response = await fetch(endpoint, options)
       const result = await response.json()
       if (result.code !== 200) {
          throwError("Could not increment ayu interact. " + result.message)
          setErrorMessage(result.message);
       }
    }

    function handleClick() {
       handleAPICall();
       handleAyuClick()
    }

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
             <button onClick={() => handleClick()}>
             <Tooltip text={translations.pet_ayu[lang]}>
             <GiHand className={style.breathe} ></GiHand>
             </Tooltip>
                <Image
                   priority={true}
                   style={{zIndex:-1}}
                   layout={"fill"}
                   src={"/img/ayu/ayu_idle.gif"}/>
             </button>
             <div>              
                  {/* <p className={style.pet_me}>Pet me!</p> */}
                  {/* <GiHand className={style.pet_me}></GiHand> */}
                  
                  <Image
                     className={style.pet}
                     priority={true}
                     layout={"fill"}
                     src = {"/img/pets/pet" + context.state.petId + ".png"}
                     alt = {"You haven't selected your pet!"}/>
               </div>
          </div>
          
       </div>
    )
 }