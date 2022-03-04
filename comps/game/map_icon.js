import React, {} from 'react';

const MapIcon = ({onClick,icon}) => {

    return (
        <button onClick={() => onClick(icon)} className="icon" id={icon}></button>
    );
}
 
export default MapIcon;