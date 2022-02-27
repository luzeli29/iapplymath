import React, { useContext } from 'react';
import AppContext from '../comps/context'
import Link from "next/link"

export default function Error() {
  const value = useContext(AppContext);
  const { oh_no,page_not_found,click,here,to_return_home } = value.state.translations;
    return (
      <main className='container'>
            <h2>{oh_no + " " + page_not_found + "."}</h2>
            <p>{click} <Link href="/"><a><b>{here.toUpperCase()}</b></a></Link> {to_return_home.toLowerCase()}.</p>
      </main>
    )
  }
  