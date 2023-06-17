import React, { useState } from 'react'

export default function Tooltip({text, type, children}) {
    const [hover, setHover] = useState(false)
    if(!text) return <>{children}</>
    return (
        <div className="d-inline"
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}>
            {children}
            {hover ? (<p className={`tooltiptext${type ? '2' : ''}`}>{text}</p>) : null}
        </div>
    )
}

