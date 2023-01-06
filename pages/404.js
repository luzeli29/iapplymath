import React from 'react';
import Link from "next/link"
import {useWrapperContext, getCommonText} from '@common_imports'
import translations from '@translations';

//404 page if user goes to page not found
export default function Error() {
  const lang = useWrapperContext().state.lang;

  return (
    //TODO: Make pretty
    <>
      <h2>{getCommonText('page_not_found')}</h2>
      <p>
        {getCommonText('click') + " "}
          <Link href="/"><a><strong>{getCommonText('here')}</strong></a></Link> 
        {" " + getCommonText('to_return_home')}
      </p>
    </>
  )
  }
  