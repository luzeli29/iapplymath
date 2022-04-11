import React, {useState} from 'react';
import style from './map.module.css'
import Image from 'next/image'
import {useWrapperContext} from '../../../context/context'

export default function Map({handleSelect}) {
    const lang = useWrapperContext().state.lang
    const [hoveringOn, setHoveringOn] = useState("");

    const onMouseEnter = (state) => {
        setHoveringOn(state);
     }
  
    const onMouseLeave = () => setHoveringOn("");
  
    //Tag to show nametag of building player is hovering on
    //TODO: Finish nametag
    const nameTag = () => {
        return (
            <>
                {/*<p>{buildings[hoveringOn][lang]}</p>*/}
            </>
        )
    }

    return (
        <>
            <div className={style.map}>
                {hoveringOn == "" ? <></> : nameTag()}

                <button onClick={() => handleSelect("aunt_house")} 
                        className={style.icon_button} id={style.aunt_house}
                        onMouseEnter={() => onMouseEnter("aunt_house")}
                        onMouseLeave={() => onMouseLeave()}> 
                    <Image 
                        layout={"fill"}
                        priority={true}
                        src={"/img/map/aunt_house.png"}/> 

                </button>
                
                <button onClick={() => handleSelect("resturant")} 
                        className={style.icon_button} 
                        id={style.resturant}
                        onMouseEnter={() => onMouseEnter("resturant")}
                        onMouseLeave={() => onMouseLeave()}>
                    <Image 
                        layout={"fill"}
                        priority={true}
                        src={"/img/map/resturant.png"}/> 
                </button>
                {/*
                <div
                    className={style.icon} 
                    id={style.home}>
                        <img className={style.icon} 
                    id={style.grocery_store}
                    src={"/img/map/home.png"}/>
                </div>
                
                <img className={style.icon} 
                    id={style.grocery_store}
                    src={"/img/map/grocery_store.png"}/> */}
            </div>
        </>
    );
}

const buildings = {
    aunt_house: {
        en: "Aunt's House",
        es: "La Casa de la Tía"}
}
 
