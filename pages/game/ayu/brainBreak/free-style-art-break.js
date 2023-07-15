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
import { GoBackAlert } from '@utils/ayu/goBackAlert';

export default function FreeSyleArtBreak() {
    const canvas = useRef()
    const [promp] = useState(() => {
      const ideas = ['food', 'animal', 'sport', 'people', 'place']
      const randomIndex = Math.floor(Math.random() * ideas?.length)
      return ideas[randomIndex ?? 0]
    });
    const { time, formattedTime } = useTimer(180)
 
    useEffect(() => {
      if(time <= 0) {
          GoBackAlert(handleBack, 10, lang)
      }
  })

    // Utils for free style art break
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


    function saveImage(image) {
      try {
         // Cadena de datos base64 de la imagen PNG
          var base64Image = image;
        
          // Convertir la cadena base64 en un objeto Blob
          var byteCharacters = atob(base64Image.split(',')[1]);
          var byteArrays = [];
        
          for (var i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
          }
        
          var byteArray = new Uint8Array(byteArrays);
          var blob = new Blob([byteArray], { type: 'image/png' });
        
          // Crear una URL de objeto para la imagen
          var url = URL.createObjectURL(blob);
        
          // Descargar la imagen
          var link = document.createElement('a');
          link.href = url;
          link.download = 'image.png';
          link.click();
        
          // Liberar la URL del objeto
          URL.revokeObjectURL(url);
      } catch (error) {
        alert("Error")
      }     
    }

    return (
        <>
            <h1 className={style.art_title_container}>
              {formattedTime() ?? ''}  -  
              <span>Draw your favorite {promp}</span>  -  
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
                  canvas?.current
                    ?.clearCanvas()
                }}
              >
               {translations.clear[lang]}
              </button>
            </h1>
            <div class={style.bubble_container}>
            <ReactSketchCanvas
                ref={canvas}
                width="100%"
                height="100%"
                strokeWidth={8}
                strokeColor={color}
                undo={true}
                redo={true}
            />
            </div>
            <button
                className={style.continue_button}
                onClick={() => {
                  canvas.current
                    ?.exportImage("png")
                    .then(data => {
                      saveImage(data)
                    })
                    .catch(e => {
                    });
                }}
              >
               {translations?.save[lang]}
              </button>
        </>
    )
}