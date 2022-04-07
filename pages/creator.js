import React, {useState} from 'react';
import {useWrapperContext} from '../context/context'
import Link from "next/link";

export default function Creator() {

  

    return (
      <>
        <canvas></canvas>
        <p><b>Creator</b></p>
        <Link href={'/'}><a><b>-Intro-</b></a></Link>
        <Link href={'/game'}><a><b>-Game-</b></a></Link>
      </>
  
    )
}