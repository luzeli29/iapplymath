import React from 'react';
import {useWrapperContext} from '../../context/context'
import translations from '../../public/text/translations';
import {useRouter} from 'next/router'

export default function ComingSoon() {
  const lang = useWrapperContext().state.lang;
    //init router
    const router = useRouter()
  return (
    <>
        <h1 className="text-center">
            {translations.coming_soon[lang]}
        </h1>
        <button className="basic_button center" onClick={() => router.push('/game')}>
            {translations.back_to_map[lang]}
        </button>
    </>
  )
}
  