import React from 'react'
import { BiCheck } from "react-icons/bi";

export default function ClickableIcon({children, selected, onClick}) {

    return (
        <div className="position-relative">
            <button onClick={()=>onClick()} className={selected? "clickable_icon_selected" :"clickable_icon"}>
                <div className="p-1">
                {children}
                </div>
            </button>
            {selected ? <div className="check-box h2">L</div>: null }
        </div>
        
    )
}
