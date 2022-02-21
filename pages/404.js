import Link from "next/link"
import React from "react"

export default function Error(props) {
    //FIXME: for some reason, going to the error page sets langage to english
    return (
      <main className='container'>
        {props.lang == 'es' ? 
          //Spanish
          <>
            {/* TODO: Translate this */}
            <h2>Oh No! Page not found. -es</h2>
            <p>Click <Link href="/"><a><b>here</b></a></Link> to return to home.</p>
          </>
            : 

          //ENGLISH
          <>
            <h2>Oh No! Page not found.</h2>
            <p>Click <Link href="/"><a><b>here</b></a></Link> to return to home.</p>
          </>
        }
      </main>
    )
  }
  