import React, { useContext } from 'react';
import {useWrapperContext} from '../context/context'
import Link from "next/link"

export default function Error() {
  const value = useWrapperContext();
  const { oh_no,page_not_found,click,here,to_return_home } = value.state.translations;
    return (
      <>
            <h2>{oh_no + " " + page_not_found + "."}</h2>
            <p>{click} <Link href="/"><a><b>{here.toUpperCase()}</b></a></Link> {to_return_home.toLowerCase()}.</p>
      </>
    )
  }
  