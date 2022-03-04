import React, {} from 'react';
import {useWrapperContext} from '../context/context'
import Link from "next/link";

export default function Intro() {

    const value = useWrapperContext();
    const { start } = value.state.translations;
    return (
      <>
        <p><b>Ayu Intro</b></p>
        <Link href={'/'}><a><b>-Back-</b></a></Link>
        <Link href={'/creator'}><a><b>-Creator-</b></a></Link>
      </>
  
    )
}