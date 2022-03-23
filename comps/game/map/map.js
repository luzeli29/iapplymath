import React, {} from 'react';
import style from './map.module.css'

export default function Map({handleSelect}) {

    return (
        <>
            <div className={style.map}>
                <button onClick={() => handleSelect("aunt")} className={style.icon} id={style.aunt}/>
                <button onClick={() => handleSelect("resturant")} className={style.icon} id={style.resturant}/>
            </div>
        </>
    );
}
 
