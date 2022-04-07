import React, {} from 'react';
import {useWrapperContext} from '../context/context'
import Link from "next/link"

export default function Error() {
  const lang = useWrapperContext().state.lang;

  return (
    <>
          <h2>{lang == "en" ? "Oh No! Page not found": ""}</h2>
          <p>{lang == "en" ?  
            "Click " + <Link href="/"><a><b>Here</b></a></Link> + " to return home": 
            "Haz clic " + <Link href="/"><a><b>Aquí</b></a></Link> + " para regresar"}
          </p>
    </>
  )
  }
  