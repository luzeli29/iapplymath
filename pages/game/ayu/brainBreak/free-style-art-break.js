import React, {useEffect, useState, useRef} from 'react';
import { useRouter } from 'next/router'
import style from '../../../../styles/brain_breaks.module.css'
import translations from '../../../../public/text/translations';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import Error from 'pages/error';
import Login from '../../../user/login';
import { ReactSketchCanvas } from "react-sketch-canvas";

export default function FreeSyleArtBreak() {
    const [counter, setCounter] = useState(180);
    const canvas = useRef()
    const [ideas, setIdeas] = useState(['Lion', 'Tiger', 'House', 'Tree']);

    // Utils for free style art break
    const [color, setColor] = useState('#ff0000');
  
    const handleChangeColor = (e) => {
      console.log(e.target.value)
      setColor(e.target.value);
    };


    // Utils for timer logic
    const formatMinutes = (time) => {
        return `${Math.floor(time / 60)}`.padStart(2, '0');
    };

    const formatSeconds = (time) => {
        return `${time % 60}`.padStart(2, '0');
    };

    // Implementation
    useEffect(() => {
      const timer = setInterval(() => {
        if (counter > 0) {
          setCounter((prevCounter) => prevCounter - 1);
        }
      }, 1000);

      return () =>{
        clearInterval(timer)
        setCounter(180)
      };
    }, [counter])


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
            <h1 className={style.art_title_container}>
              {formatMinutes(counter)}:{formatSeconds(counter)}  -  
              <span>Draw a {ideas[2]}</span>  -  
              <input type="color" value={color} onChange={handleChangeColor} />

            </h1>
            <div class={style.bubble_container}>
            <ReactSketchCanvas
                ref={canvas}
                width="100%"
                height="100%"
                strokeWidth={4}
                strokeColor={color}
                undo={true}
                redo={true}
            />
            </div>
              {/* <button
                className={style.continue_button}
                onClick={() => {
                  canvas.current
                    .exportImage("png")
                    .then(data => {
                      console.log(data)
                    })
                    .catch(e => {
                      console.log(e)
                    });
                }}
              >
                Get Image
              </button> */}
              <button
                  className={style.continue_button}
                  onClick={() => handleBack()}
              >
                {translations.continue[lang]}
              </button>
        </>
    )
}