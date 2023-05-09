import { getText } from '@commonImports'
import React from 'react'

export default function LevelDisplay({level,lang}) {
    const _lang = lang || 'en'
    return (
        <div>
            <p>{getText('level',_lang) + ' : ' + level}</p>
        </div>
    )
}
