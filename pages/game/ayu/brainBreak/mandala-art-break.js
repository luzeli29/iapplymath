/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState, useRef} from 'react';
import { useRouter } from 'next/router'
import style from '../../../../styles/brain_breaks.module.css'
import translations from '../../../../public/text/translations';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import Error from 'pages/error';
import Login from '../../../user/login';
import useTimer from '@hooks/useTimer';
import { GoBackAlert } from '@utils/ayu/goBackAlert';
import Mandala1 from '../mandalas/mandala1';
import Mandala2 from '../mandalas/mandala2';


export default function MandalaArtBreak() {
    const canvas = useRef()
    const { time, formattedTime } = useTimer(180);
    
    useEffect(() => {
      if(time <= 0) {
          GoBackAlert(handleBack, 10, lang)
      }
  })

    // Utils for free style art break
    const [color, setColor] = useState('#0008ff');
  

    // Mandala colors
    const [fillColors, setFillColors] = useState(Array(22).fill('white'))
    const [fillColors2, setFillColors2] = useState(Array(22).fill('white'))

    // Mandala List
    const [mandala_items] = useState([
      <Mandala1 key={1} fillColors={fillColors} />,
      <Mandala2 key={2} fillColors={fillColors2}/>
    ])

    // Utils
    const [currentMandala, setcurrentMandala] = useState(0);

    const handleChangeColor = (e) => {
      setColor(e.target.value);
    };

    const handleSaveSVG = () => {
      const svgString = new XMLSerializer().serializeToString(
        document.querySelector('svg')
      );
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      saveAs(blob, 'mandala.svg');
    };


    const onFillColor = (i) => {
      if (currentMandala == 0) {
        let newFillColors = fillColors.slice(0)
        newFillColors[i] = color
        setFillColors(newFillColors)
      }else if(currentMandala == 1){
        let newFillColors = fillColors2.slice(0)
        newFillColors[i] = color
        setFillColors2(newFillColors)
      }
     
    }


    // Utils
    const {user, settings, loading , error} = useUserContext()
    const isLoggedIn = user.loggedIn
    const router = useRouter()

    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>

    const lang = settings.lang
    if(!isLoggedIn) return <Login/>

    const handleBack = () => {
      router.back()
    };

    const handleSelectDesign = (url) => {
      setMandala(url)
      canvas.current.clearCanvas()
    }


    return (
        <>
            <h1 className={`${style.art_title_container} ${style.hiddenPrint}`}>
              {formattedTime()}  -  
              <span> Pick a design to color</span>  -  
              <input type="color" value={color} onChange={handleChangeColor} />
              {/* <button onClick={()=> canvas.clearCanvas()}>Clear</button> */}
              <button
                  className={style.goBack_button}
                  onClick={() => handleBack()}
              >
                {translations.back[lang]}
              </button>
              {/* <button
                className={style.goBack_button}
                onClick={() => {
                  canvas.current
                    .clearCanvas()
                }}
              >
               {translations.clear[lang]}
              </button> */}
              <button
                className={style.goBack_button}
                onClick={() => {
                  window.print()
                }}
              >
               {translations.save[lang]}
              </button>
            </h1>
            <div class={style.mandala_container}>
            <div  className={`${style.mandala_items} ${style.hiddenPrint}`}>
              {mandala_items.map((item, i) => <span 
                key={i}
                onClick={()=>setcurrentMandala(i)}
                className={style.item}
                >
                  {item}
                </span>
                )}
            </div>
             <div className={style.mandala_container}>

              {currentMandala === 0 && <Mandala1 fillColors={fillColors} onFill={onFillColor} />}
              {currentMandala === 1 && <Mandala2 fillColors={fillColors2} onFill={onFillColor} />}

            </div>
            </div>
        </>
    )
}