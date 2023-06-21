import React, {useState} from 'react';
import Image from 'next/image'
import style from '@styles/game_layout.module.css'
import translations from '@translations';
import 'reactjs-popup/dist/index.css';
import {GiYarn, GiHand} from "react-icons/gi";
import Tooltip from 'comps/accessibility/tooltip';
import getText from '@utils/text/getText'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import { useUserContext } from '@hooks/siteContext/useUserContext'
import {useRouter} from 'next/router'

//Ayu component that is found on the bottom right box of GameLayout
export default function Ayu ({handleAyuClick = null}) {
   const {user,settings,loading, error} = useUserContext()
   const [afNum, setAyuAfNum] = useState(0);
   const [isHovering, setIsHovered] = useState(false);
   const router = useRouter()
   const isLoggedIn = user.loggedIn    
   if(loading) return <Loading/> 
   if(!router.isReady) return <Loading/>
   if(error) return <Error error={error}/>
   if(!isLoggedIn) return <Login/>
   const lang = settings.lang
   const petId = user.data.petId

   function handleClick() {
      // user.incrementAyu()
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
      <div className="fill_container"> 
         <div className={style.ayu_speech_bubble_container}>
            {isHovering ? 
               <div className={style.ayu_speech_bubble}>
                  <div className={style.ayu_speech_bubble_triangle} ></div>
                  <p className={style.speech_bubble_text}>{translations.ayu_affermations[afNum][lang]}</p>
               </div> : <></>}
         </div>
         
         <div className={style.ayu_image_container}>
            {handleAyuClick ? <button onClick={() => handleClick()}>
            <Tooltip type={true}  text={translations.pet_ayu[lang]}>
               <GiHand className={style.breathe} ></GiHand>
            </Tooltip>
               <Image
                  priority={true}
                  style={{zIndex:-1}}
                  layout={"fill"}
                  src={"/img/ayu/ayu_idle.gif"}
                  alt={"ayu idle gif"}/>
            </button>:
            <div>
               <Image
                  priority={true}
                  style={{zIndex:-1}}
                  layout={"fill"}
                  src={"/img/ayu/ayu_idle.gif"}
                  alt={"ayu idle gif"}/>
            </div>
            }
            <div >              
               <Image
                  priority={true}
                  layout={"fill"}
                  className={style.pet}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  src = {"/img/pets/pet" + petId + ".png"}
                  alt = {"You haven't selected your pet!"}/>
            </div>
         </div>
         
      </div>
   )
}