import React, {} from 'react';
import {useWrapperContext} from '../context/context'
import Link from "next/link";

export default function Index() {

  const value = useWrapperContext();
  const { start } = value.state.translations;
  return (
    <>
        <Link href={'/intro'}><a><b>{start}</b></a></Link>
    </>

    )
}

