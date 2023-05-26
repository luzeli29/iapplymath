import Tooltip from '@comps/accessibility/tooltip';
import DevErr from '@utils/debug/devErr';
import React from 'react'
import {BiCircle} from "react-icons/bi";

export default function QuickNavButton({children,text,onClick}) {
    let tooltipText
    let handleClick
    let buttonContent

    if(text) {
        tooltipText = text
    } else {
        tooltipText = "No Tooltip Text Found"
    }

    if(onClick) {
        handleClick = onClick
    } else {
        handleClick = () => DevErr("No onClick defined.")
    }

    if(children) {
        buttonContent = children
    } else {
        buttonContent = <BiCircle/>
    }
    

    return (
        <Tooltip text={tooltipText}>
            <button  onClick={() => handleClick()}>
                {buttonContent}
            </button>
        </Tooltip>
    )
}
