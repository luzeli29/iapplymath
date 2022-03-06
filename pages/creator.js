import React, {useState} from 'react';
import {useWrapperContext} from '../context/context'
import Link from "next/link";

export default function Creator() {

    const value = useWrapperContext();

    const [hair, setHair] = useState(0);
    const maxHair = 1;


    const changeHair = () => {
        if(hair == maxHair) {
          setHair(0)
        } else {
          setHair(hair++)
        }
    }

    const bakeAvatar = () => {
      //
    }

    return (
      <>
        <canvas></canvas>
        <p><b>Creator</b></p>
        <Link href={'/intro'}><a><b>-Intro-</b></a></Link>
        <Link href={'/game'}><a><b>-Game-</b></a></Link>
      </>
  
    )
}