import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import style from '../../../../styles/brain_breaks.module.css'
import translations from '../../../../public/text/translations';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import Error from 'pages/error';
import Login from '../../../user/login';
import useTimer from '@hooks/useTimer';
import imgBanner from '@public/img/brainBreaks/moveYourBody.gif'
import TextReader from '@comps/accessibility/textReader';
import { GoBackAlert } from '@utils/ayu/goBackAlert';

export default function MoveBodyBreak() {
    const {user,settings,loading, error} = useUserContext()
    const isLoggedIn = user.loggedIn

    const { time, formattedTime } = useTimer(180);
 
    useEffect(() => {
        if(time <= 0) {
            GoBackAlert(handleBack, 10, lang)
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
        router.back()
      };

    return (
        <>
            <h1 className={style.move_your_body_title_container}>{translations.moveBodyTitle[lang]}</h1>
            <div className={style.chillout_container}>

                <div className={style.move_your_body_img}>
                    <img src={imgBanner?.src} alt="Person dancing" />
                </div>

                <div className={style.chillout_text}>

                    <ol>
                        <li><h5><TextReader text={translations.moveBodyDescription1[lang]} reader={'ayu'}/> {translations.moveBodyDescription1[lang]}</h5></li>
                        <li><h5><TextReader text={translations.moveBodyDescription2[lang]} reader={'ayu'}/> {translations.moveBodyDescription2[lang]}</h5></li>
                        <li><h5><TextReader text={translations.moveBodyDescription3[lang]} reader={'ayu'}/> {translations.moveBodyDescription3[lang]}</h5></li>
                    </ol>
                    
                    <h2 style={{textAlign: 'center', marginTop: '30px'}}>
                    {formattedTime()}
                    </h2>
                </div> 

            </div> 
            <button
                className={style.continue_button}
                onClick={() => handleBack()}
            >{translations.back[lang]}</button>
        </>
    )
}