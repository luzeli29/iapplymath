import React, {useState} from 'react';
import style from './map.module.css'
import Image from 'next/image'
import {useWrapperContext} from '../../../context/context'

export default function Map({handleSelect}) {
    const context = useWrapperContext()
    const [hoveringOn, setHoveringOn] = useState("");

    const onMouseEnter = (state) => {
        setHoveringOn(state);
     }
  
    const onMouseLeave = () => setHoveringOn("");
  
    const nameTag = () => {
        console.log(buildings[hoveringOn][context.state.lang])
        return (
            <p>{buildings[hoveringOn][context.state.lang]}</p>
        )
    }

    return (
        <>
            <div className={style.map}>
                {hoveringOn == "" ? <></> : nameTag()}
                <button onClick={() => handleSelect("aunt")} 
                        className={style.icon} id={style.aunt}
                        onMouseEnter={() => onMouseEnter("aunt_house")}
                        onMouseLeave={() => onMouseLeave()}> 
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

const buildings = {
    aunt_house: {
        en: "Aunt's House",
        es: "La casa de la tía"}
}
 
