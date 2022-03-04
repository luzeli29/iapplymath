import React, {} from 'react';
import {useWrapperContext} from '../context/context'
import Link from "next/link";

export default function Creator() {

    const value = useWrapperContext();
    const { start } = value.state.translations;
    return (
      <>
        <p><b>Creator</b></p>
        <Link href={'/intro'}><a><b>-Intro-</b></a></Link>
        <Link href={'/game'}><a><b>-Game-</b></a></Link>
      </>
  
    )
}