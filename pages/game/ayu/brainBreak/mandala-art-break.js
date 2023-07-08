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
import Swal from 'sweetalert2';
import { Mandala1 } from '../mandalas/mandala1';
import { Mandala2 } from '../mandalas/mandala2';
import { saveAs } from 'file-saver';


export default function MandalaArtBreak() {
    const canvas = useRef()
    const { time, formattedTime } = useTimer(180);
 
    useEffect(() => {
        if(time <= 0) {


          Swal.fire({
            title: translations?.brain_break_alert_title[lang],
            html: 'Go back in 5 seconds.',
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
            },
          
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              handleBack()
            }
          })
        }
    }) 

    // Utils for madala art break

    const [color, setColor] = useState('#0008ff');
    const [fillColors, setFillColors] = useState(Array(22).fill('white'))

    const handleChangeColor = (e) => {
      setColor(e.target.value);
    };
    
        
    const onFillColor = (i) => {
      let newFillColors = fillColors.slice(0)
      newFillColors[i] = color
      setFillColors(newFillColors)
    }

    const [mandala_items] = useState([
      <Mandala1 key={1} fillColors={fillColors} />,
      <Mandala2 key={1} fillColors={fillColors}/>
    ])
    const [currentMandala, setcurrentMandala] = useState(0);

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

    // const handleSelectDesign = (url) => {
    //   setMandala(url)
    //   canvas.current.clearCanvas()
    // }


      const handleSaveSVG = () => {
        const svgString = new XMLSerializer().serializeToString(
          document.querySelector('svg')
        );
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        saveAs(blob, 'mandala.svg');
      };


      const saveSVG = (svgCode) => {
        const blob = new Blob([svgCode], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mandalaArt.svg';
        link.click();
        URL.revokeObjectURL(url);
      };

     
    return (
        <>
            <h1 className={style.art_title_container}>
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
              </button>
              <button
                className={style.goBack_button}
                onClick={() => {
                  canvas.current
                    .exportSvg("svg")
                    .then(data => {
                      // console.log(data)
                      saveSVG(data)
                    })
                    .catch(e => {
                      console.log(e)
                    });
                }}
              >
               {translations.save[lang]}
              </button> */}
              {/* <button
                className={style.goBack_button}
                onClick={handleSaveSVG}
              >
               {translations.save[lang]}
              </button> */}
            </h1>
            <div class={style.mandala_container}>
            {/* <div className={style.mandala_items}>
              {mandala_items.map((item, i) => <span 
                key={i}
                onClick={()=>setcurrentMandala(i)}
                // alt={`mandala art ${i}`}
                className={style.item}
                // src={item}
                >
                  {item}
                </span>)}
            </div> */}
            {/* setcurrentMandala */}

            <div className={style.mandala_container}>

                {currentMandala === 0 && <Mandala1 fillColors={fillColors} onFill={onFillColor} />}
                {currentMandala === 1 && <Mandala2 fillColors={fillColors} onFill={onFillColor} />}

            </div>
            </div>
        </>
    )
}