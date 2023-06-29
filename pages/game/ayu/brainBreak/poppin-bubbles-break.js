import React, {useEffect, useState, useRef} from 'react';
import { useRouter } from 'next/router'
import style from '../../../../styles/brain_breaks.module.css'
import translations from '../../../../public/text/translations';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import Error from 'pages/error';
import Login from '../../../user/login';
import useTimer from '@hooks/useTimer';
import Swal from 'sweetalert2';
// import music from '../../public/sound/salsa2_bg.mp3';

export default function PoppinBubblesBreak({ setView }) {
    const [bubbleCount, setBubbleCount] = useState(0)
    const bubblesContainerRef = useRef()
    const { time, formattedTime } = useTimer(60);
    const { time:bubbleTime, resetTimer:resetBubbleTimer } = useTimer(5);

    useEffect(() => {
        if(time <= 0) {
            Swal.fire({
                title: translations?.brain_break_alert_title[lang],
                showDenyButton: true,
                confirmButtonText: translations?.brain_break_alert_button1[lang],
                denyButtonText: translations?.brain_break_alert_button2[lang],
              }).then((result) => {
                if (result.isConfirmed) {
                    handleBack()
                }
              })
        }
    })

    // Implementation
    useEffect(() => {
        if (bubbleTime == 0 && time > 0 && bubbleCount < 8) {
          resetBubbleTimer(3)

          let z = document.createElement('span');
          z.classList.add(style.bub)
          z.style.left = `${Math.floor(Math.random() * 86)}%`
         
          z.addEventListener('click', ()=> {
            z.parentElement.removeChild(z)
            setBubbleCount(prev => prev - 1)
          })

          bubblesContainerRef.current.appendChild(z)
          setBubbleCount(prev => prev + 1)
        }
      }, [bubbleCount, bubbleTime, resetBubbleTimer, time]);


    // Utils
    const {user, settings, loading , error} = useUserContext()
    const isLoggedIn = user.loggedIn
    const router = useRouter()

    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>

    const lang = settings.lang
    if(!isLoggedIn) return <Login/>

    const handleBack = () => {

      let redirect = router?.query?.url ?? ''

      if(redirect) {
        router.push(decodeURIComponent(redirect))
      }else {
        router.push('/game/map')
        
      }
    };

    return (
        <>
            <h1 className={style.as_title_container}>
              {formattedTime()} - {bubbleCount}
            </h1>
            <div ref={bubblesContainerRef} class={style.bubble_container}>
            </div>
            <button
                className={style.continue_button}
                onClick={handleBack}
            >{translations.back[lang]}</button>
        </>
    )
}