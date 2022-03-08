import React, {} from 'react';
import {useWrapperContext} from '../context/context'
import Link from "next/link";
import Ayu from '../comps/ayu';

export default function Intro() {

    const value = useWrapperContext();
    const { start } = value.state.translations;
    return (
      <>
        <Ayu size="256" dialogId="intro_page"/>
      </>
  
    )
}