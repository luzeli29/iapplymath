import getText from '@utils/text/getText'
import React from 'react'

export default function LevelDisplay({level,lang, pic, alt=false}) {
    const _lang = lang || 'en'
    return (
        <div className={`py-${pic ? 0 : 3}`} style={{ width: '70px' }}>
            <p>{(!alt ? getText('level',_lang) + ' : ' : '') + level}</p>
        </div>
    )
}
