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
// import music from '../../public/sound/salsa2_bg.mp3';

export default function MoveBodyBreak() {
    const {user,settings,loading, error} = useUserContext()
    const isLoggedIn = user.loggedIn

    const { formattedTime } = useTimer(180); // 3 minutes in seconds

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
            <h1 className={style.as_title_container}>{translations.moveBodyTitle[lang]}</h1>
            <div className={style.chillout_container}>

                <div className={style.move_your_body_img}>
                    <img src={imgBanner?.src} alt="Person dancing" />
                </div>

                <div className={style.chillout_text}>

                    <ol>
                        <li><h5>{translations.moveBodyDescription1[lang]}</h5></li>
                        <li><h5>{translations.moveBodyDescription2[lang]}</h5></li>
                        <li><h5>{translations.moveBodyDescription3[lang]}</h5></li>
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