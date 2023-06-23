import React, { useState } from 'react'

export default function Tooltip({text, type, children}) {
    const [hover, setHover] = useState(false)
    if(!text) return <>{children}</>

    let tooltipClassName = `tooltiptext${type ? '2' : ''}`;
    if (type === 3) {
      tooltipClassName = 'tooltiptext3';
    }

    return (
        <div className="d-inline"
             onMouseEnter={() => setHover(true)}
             onMouseLeave={() => setHover(false)}>
            {children}
            {hover ? <p className={tooltipClassName}>{text}</p> : null}
        </div>
    )
}

