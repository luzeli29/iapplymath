import React from 'react';
import Link from "next/link"
import {useWrapperContext, getText} from '@common_imports'

//404 page if user goes to page not found
export default function Error() {
  const context = useWrapperContext()
  const lang = context.state.lang

  return (
    //TODO: Make pretty
    <>
      <h2>{getText('page_not_found',lang)}</h2>
      <p>
        {getText('click',lang) + " "}
          <Link href="/"><strong>{getText('here',lang)}</strong></Link> 
        {" " + getText('to_return_home',lang)}
      </p>
    </>
  )
  }
  