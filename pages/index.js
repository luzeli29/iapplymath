import React from "react"
import Link from "next/link"

export default function Home(props) {
  return (
    <main className='container'>
      <Link href="/game"><a style={{fontSize: '50px'}}><b>{props.lang == 'es' ? 'Comienzo' : 'Start'}</b></a></Link>
    </main>
  )
}
