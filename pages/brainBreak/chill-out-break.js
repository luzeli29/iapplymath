import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import style from '../../styles/check_in.module.css'
import translations from '../../public/text/translations';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import Error from 'pages/error';
import Login from '../user/login';
// import music from '../../public/sound/salsa2_bg.mp3';

export default function ChillOutBreak({onEnd}) {
    const {user,settings,loading, error} = useUserContext()
    const isLoggedIn = user.loggedIn
    const _onEnd = onEnd ? onEnd : () => router.back();
    const [counter, setCounter] = useState(180);
    const [isPlaying, setIsPlaying] = useState(false);

    const formatMinutes = (time) => {
        return `${Math.floor(time / 60)}`.padStart(2, '0');
    };

    const formatSeconds = (time) => {
        return `${time % 60}`.padStart(2, '0');
    };

    const startCountdown = () => {
        setIsPlaying(true);

        const timer = setInterval(() => {
          setCounter((prevCounter) => prevCounter - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(timer);
          setIsPlaying(false);
        }, 180000);
    };

    useEffect(() => {
        // const audio = new Audio(music);
        // audio.play();
        // startCountdown()
        // return () => {
        //     audio.pause();
        //     audio.currentTime = 0;
        // };
    }, [])

    const router = useRouter()

    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>

    const lang = settings.lang
    if(!isLoggedIn) return <Login/>

    //This is called when the player is done creating
    //Should handle anything to be done in order to use avatar in game
    const handleFeelingSubmit = () => {
        _onEnd();
    };

    return (
        <>
            <h1 className={style.as_title_container}>{translations.check_in[lang]}</h1>
            <div className={style.feeling_buttons}>
                {isPlaying && (
                    <h2>
                    {formatMinutes(counter)}:{formatSeconds(counter)}
                    </h2>
                )}
            </div>
            <button
                className={style.continue_button}
                onClick={() => handleFeelingSubmit()}
            >{translations.continue[lang]}</button>
        </>
    )
}