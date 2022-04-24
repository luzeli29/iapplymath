import React from 'react';
import {useWrapperContext} from '../context/context'
import Link from "next/link"

export default function Error() {
  const lang = useWrapperContext().state.lang;

  return (
    //TODO: Make pretty
    <>
          <h2>{lang == "en" ? "Oh No! Page not found": "¡Oh no! Página no encontrada"}</h2>
          {lang == "en" ?  
            <p>Click <Link href="/"><a><b>Here</b></a></Link> to return home</p>: 
            <p>Haz clic <Link href="/"><a><b>Aquí</b></a></Link> para regresar</p>} 
    </>
  )
  }
  