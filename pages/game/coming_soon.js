import React from 'react';
import {useWrapperContext} from '../../context/context'
import translations from '../../public/text/translations';
import {useRouter} from 'next/router'

export default function ComingSoon() {
  const lang = useWrapperContext().state.lang;
    //init router
    const router = useRouter()
  return (
    <div className="text-center mt-5">
      <div>
        <h1 className="py-5">
              {translations.coming_soon[lang] + "..."}
        </h1>
      </div>
      <div className="pt-5">
        <button className="basic_button" onClick={() => router.push('/game')}>
              {translations.back_to_map[lang]}
        </button>
      </div>
    </div>
  )
}
  