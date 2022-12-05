import React from 'react';
import {useWrapperContext} from '../context/context'
import translations from '../public/text/translations';
import Link from "next/link"

//404 page if user goes to page not found
export default function Error() {
  const lang = useWrapperContext().state.lang;

  return (
    //TODO: Make pretty
    <>
      <h2>{translations.page_not_found[lang]}</h2>
      <p>
        {translations.click[lang] + " "}
          <Link href="/"><a><b>{translations.here[lang]}</b></a></Link> 
        {" " + translations.to_return_home[lang]}
      </p>
    </>
  )
  }
  