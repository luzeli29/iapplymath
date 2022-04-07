import React, {} from 'react';
import style from './map.module.css'
import Image from 'next/image'

export default function Map({handleSelect}) {
    //TODO: faster loading for map
    return (
        <>
            <div className={style.map}>
                
                <button onClick={() => handleSelect("aunt")} className={style.icon} id={style.aunt}> 
                    <Image 
                        layout={"fill"}
                        src={"/img/map/AuntHouse.png"}/> 
                </button>

                <button onClick={() => handleSelect("resturant")} className={style.icon} id={style.resturant}> 
                    <Image 
                            layout={"fill"}
                            src={"/img/map/Restaurant.png"}/> 
                </button>
            </div>
        </>
    );
}
 
