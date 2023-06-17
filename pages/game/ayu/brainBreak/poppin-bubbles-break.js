import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import style from '../../../../styles/brain_breaks.module.css'
import translations from '../../../../public/text/translations';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import Error from 'pages/error';
import Login from '../../../user/login';
// import music from '../../public/sound/salsa2_bg.mp3';

export default function PoppinBubblesBreak({ setView }) {
    const [bubbles, setBubbles] = useState([])
    const [counter, setCounter] = useState(180);

    // Utils for bubbles logic
    function getRandomLetter() {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
        const randomIndex = Math.floor(Math.random() * letters.length);
        return letters[randomIndex];
      }
    
    const popBubble = (bubbleId) => {   
        const updatedBubbles = bubbles.filter(bubble => bubble.key !== bubbleId);
        setBubbles(updatedBubbles)
    }


    // Utils for timer logic
    const formatMinutes = (time) => {
        return `${Math.floor(time / 60)}`.padStart(2, '0');
    };

    const formatSeconds = (time) => {
        return `${time % 60}`.padStart(2, '0');
    };

    const startCountdown = () => {
        const timer = setInterval(() => {
          setCounter((prevCounter) => prevCounter - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(timer);
        }, 180000);
    };


    // Implementation
    useEffect(() => {
        startCountdown()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
          if (bubbles.length < 6) {
            const key = bubbles.length + 1;
            const type = getRandomLetter();
            const newBubble = (
              <span
                onClick={() => popBubble(key)}
                key={key}
                className={`${style.bub} ${style[type]}`}
              />
            );
            setBubbles(prevBubbles => [...prevBubbles, newBubble]);
          }
        }, 1000);
      
        return () =>{
            clearInterval(interval)
            // setBubbles([])
        };
      }, [bubbles]);

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
              {formatMinutes(counter)}:{formatSeconds(counter)}
            </h1>
            <div class={style.bubble_container}>
                {bubbles}
            </div>
            <button
                className={style.continue_button}
                onClick={() => handleBack()}
            >{translations.continue[lang]}</button>
        </>
    )
}