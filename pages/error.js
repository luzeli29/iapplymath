import React, {} from 'react'
import Link from 'next/link'
import {useWrapperContext} from '../context/context'


export default function Error({message}) {
    const lang = useWrapperContext().state.lang
    return (
        <>
            <p>Error: {message}</p>
            {lang == "en" ?  
                <p>Click <Link href="/"><a><b>Here</b></a></Link> to return home</p>: 
                <p>Haz clic <Link href="/"><a><b>Aquí</b></a></Link> para regresar</p>} 
        </>
    )
}
