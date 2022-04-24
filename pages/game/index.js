import React from 'react';
import style from '../../styles/map.module.css'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {useWrapperContext} from '../../context/context'

export default function Map() {
    const lang = useWrapperContext().state.lang
    const router = useRouter()

    const handleClick = (page) => {
        router.push('game/aunt_house')
    }

    return (
        <>
            <div className={style.map}>                
                <button onClick={() => handleClick("aunt_house")} 
                        className={style.icon_button} id={style.aunt_house}> 
                    <Image 
                        layout={"fill"}
                        priority={true}
                        src={"/img/map/aunt_house.png"}/> 

                </button>
                
                <button onClick={() => handleClick("resturant")} 
                        className={style.icon_button} 
                        id={style.resturant}>
                    <Image 
                        layout={"fill"}
                        priority={true}
                        src={"/img/map/resturant.png"}/> 
                </button> 
                <div
                    className={style.icon} 
                    id={style.home}>
                        <img className={style.icon} 
                    id={style.grocery_store}
                    src={"/img/map/Home.png"}/>
                </div>
                
                <img className={style.icon} 
                    id={style.grocery_store}
                    src={"/img/map/Grocery_Store.png"}/>
            </div>
        </>
    );
}

const buildings = {
    aunt_house: {
        en: "Aunt's House",
        es: "La Casa de la Tía"}
}
 
