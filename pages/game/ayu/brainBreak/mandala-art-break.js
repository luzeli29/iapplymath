/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState, useRef} from 'react';
import { useRouter } from 'next/router'
import style from '../../../../styles/brain_breaks.module.css'
import translations from '../../../../public/text/translations';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import Error from 'pages/error';
import Login from '../../../user/login';
import { ReactSketchCanvas } from "react-sketch-canvas";
import useTimer from '@hooks/useTimer';
import Swal from 'sweetalert2';

export default function MandalaArtBreak() {
    const canvas = useRef()
    const { time, formattedTime } = useTimer(5);
    
    useEffect(() => {
        if(time <= 0) {
          Swal.fire({
            title: translations?.brain_break_alert_title[lang],
            html: 'Go back in 5 seconds.',
            timer: 5000,
            timerProgressBar: true,
            allowOutsideClick: false,
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

    // Utils for free style art break
    const [mandala_list] = useState([
      "https://previews.123rf.com/images/queertrade/queertrade1811/queertrade181100050/111754678-simple-mandala-print-easy-coloring-page-illustration-for-kids-and-adult-beginners.jpg",
      "https://coloringhome.com/coloring/RiA/ykq/RiAykqg6T.png",
      "https://follen.org/wp-content/uploads/2020/04/free-mandalas-to-color-for-adults-with-kids-mandala-designs-beginners-print-and-672x870-1.png",
      "https://www.justcolor.net/kids/wp-content/uploads/sites/12/nggallery/mandalas/Coloring-for-kids-mandalas-69780.jpg",
      "https://www.creativefabrica.com/wp-content/uploads/2021/11/15/Simple-Mandala-Coloring-Page-Graphics-20223669-1.jpg"
    ]);
    const [mandala, setMandala] = useState(mandala_list[0]);
    const [color, setColor] = useState('#0008ff');
  
    const handleChangeColor = (e) => {
      setColor(e.target.value);
    };


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
              <button
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
              </button>
            </h1>
            <div class={style.mandala_container}>
            <div className={style.mandala_items}>
              {mandala_list.map((item, i) => <img 
                key={i}
                onClick={()=>handleSelectDesign(item)}
                alt={`mandala art ${i}`}
                className={style.item}
                src={item}
                />)}
            </div>
            <ReactSketchCanvas
                backgroundImage={mandala}
                exportWithBackgroundImage={true}
                preserveBackgroundImageAspectRatio=""
                width='650px'
                height='650px'
                // className={style.mandala_container}
                ref={canvas}
                strokeWidth={8}
                strokeColor={color}
                undo={true}
                redo={true}
            />
            </div>
        </>
    )
}