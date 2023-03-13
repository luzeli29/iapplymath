import { getText } from '@utils/imports/commonImports'
import React, { useState } from 'react'

export default function Loading({lang}) {

    let _lang

    if(!lang) {
        _lang = "en"
    } else {
        _lang = lang
    }

    const [loadingText, setLoadingText] = useState("loading" + '.')
    const periodRegex = /[.]/g

    function changeLoadingText() {
    
        const numOfPeriods = loadingText.match(periodRegex).length

        if(numOfPeriods == 3) {
            setLoadingText("loading" + '.')
        } else {
            setLoadingText(loadingText + ".")
        }
    }

    setTimeout(() => {
        changeLoadingText()
    },500)

    return (
        <div className='position-absolute top-50 start-50 translate-middle'>
            <h1>{loadingText}</h1>
        </div>
    )
}
