import React from 'react'
import { BiCheck } from "react-icons/bi";

export default function ClickableIcon({children, isSelected, clickCallback}) {

    function handleClick() {
        clickCallback()
    }

    return (
        <div className="position-relative">
            <button onClick={()=>handleClick()} className={isSelected? "clickable_icon_selected" :"clickable_icon"}>
                <div className="p-1">
                {children}
                </div>
            </button>
            
            {isSelected ? <div className="check-box h2">L</div>: null }

        </div>
        
    )
}
