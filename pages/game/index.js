import React from 'react';
import style from '../../styles/map.module.css'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {useWrapperContext} from '../../context/context'
import translations from '../../public/text/translations';

export default function Map() {
    //get lang from context
    const lang = useWrapperContext().state.lang
    const router = useRouter()

    //TODO: Add text to appear when hovering over playable house
    //TODO: Recreate map from previous game

    return (
        <>
            <div className={style.map}>               
            
            <p className={style.aunt_house_text}>{translations.aunt_house[lang]}</p>

                <p className={style.restaurant_text}>{translations.restaurant[lang]}</p> 
                <button onClick={() => router.push('game/aunt_house')} 
                        className={style.icon_button_small} id={style.aunt_house}> 
                    <Image 
                        layout={"fill"}
                        quality={100}
                        priority={true}
                        src={"/img/map/aunt_house.png"}/> 

                </button>
                

                <img className={style.icon_small} 
                    id={style.house_1}
                    src={"/img/map/aunt_house.png"}/>

                <img className={style.icon_small} 
                    id={style.house_2}
                    src={"/img/map/aunt_house.png"}/>

                <button onClick={() => router.push('game/restaurant')} 
                        className={style.icon_button} 
                        id={style.resturant}>
                    <Image 
                        layout={"fill"}
                        quality={100}
                        priority={true}
                        src={"/img/map/resturant.png"}/> 
                    <p>{translations.restaurant[lang]}</p>

                </button> 

                <p className={style.home_text}>{translations.coming_soon[lang]}</p>
                <div
                    className={style.icon} 
                    id={style.home}>
                        <img className={style.icon} 
                            id={style.home}
                            src={"/img/map/Home.png"}/>
                </div>

                <p className={style.school_text}>{translations.coming_soon[lang]}</p>
                <div
                    className={style.icon} 
                    id={style.school}>
                        <img className={style.icon} 
                            id={style.school}
                            src={"/img/map/School.png"}/>
                </div>

                <p className={style.grocery_store_text}>{translations.coming_soon[lang]}</p>
                <img className={style.icon} 
                    id={style.grocery_store}
                    src={"/img/map/Grocery_Store.png"}/>
            </div>
        </>
    );
}
