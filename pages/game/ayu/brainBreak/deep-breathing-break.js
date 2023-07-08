import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import style from '../../../../styles/brain_breaks.module.css'
import translations from '../../../../public/text/translations';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import Error from 'pages/error';
import Login from '../../../user/login';
import useTimer from '@hooks/useTimer';
import Ayu from '@comps/game/quiz/ayu';
import Swal from 'sweetalert2';
// import music from '../../public/sound/salsa2_bg.mp3';

export default function DeepBreathingBreak() {
    const {user,settings,loading, error} = useUserContext()
    const isLoggedIn = user.loggedIn

    const { time, formattedTime } = useTimer(60);
 
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
    const router = useRouter()

    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>

    const lang = settings.lang
    if(!isLoggedIn) return <Login/>

    //This is called when the player is done creating
    //Should handle anything to be done in order to use avatar in game
    const handleBack = () => {

        let redirect = router?.query?.url ?? ''

        if(redirect) {
          router.push(decodeURIComponent(redirect))
        }else {
          router.push('/game/map')
          
        }
    }

    return (
        <>
            {/* <h1 className={style.as_title_container}>{translations.check_in[lang]}</h1> */}
            <div className={style.chillout_container}>

                <div className={style.chillout_ayu}>
                    <Ayu />
                </div>

                <div className={style.chillout_text}>
                    <h1 style={{textAlign: 'center'}}>
                    {translations?.deep_breathing_title[lang]}
                    <h3>{translations?.deep_breathing_subtitle[lang]}</h3>
                    </h1>
                    <h2 style={{textAlign: 'center', marginTop: '30px'}}>
                    {formattedTime()}
                    </h2>
                </div> 

            </div> 
            <button
                className={style.continue_button}
                onClick={() => handleBack()}
            >{translations?.back[lang]}</button>
        </>
    )
}