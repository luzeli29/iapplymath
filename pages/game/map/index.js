import React from 'react';
import Image from 'next/image'
import {useRouter} from 'next/router'
import style from '@styles/map.module.css'
import {useWrapperContext} from '@common_imports'
import translations from '@translations';
import {motion} from 'framer-motion';

export default function Map() {
    //get lang from context
    const context = useWrapperContext()
    const lang = context.state.lang
    const router = useRouter()
    const avatarId = context.state.avatarId
    const petId = context.state.petId
    const loadingState = context.state.loadingState
    const mapLocation = context.state.mapLocation

    const handleRestaurant = () => {
        context.setMapLocation("Restaurant");
        router.push('/game/restaurant/introduction');
    }

    const handleAuntsHouse = () => {
        context.setMapLocation("AuntsHouse");
        router.push('/game/aunt-house/introduction');
    }
    return (
        <>
            <div className={style.map}>
                <motion.img className={style.player_img}
                            id = {style.player_img}
                            src = {"/img/avatar/pre_made/A" + avatarId + ".png"}
                            initial = {{
                                x: mapLocation == "AuntsHouse" ? 130
                                    : mapLocation == "Restaurant" ? 420
                                        : 320,
                                y: mapLocation == "AuntsHouse" ? 120
                                    : mapLocation == "Restaurant" ? 440
                                        : 470
                            }}
                />
            
                <p className={style.aunt_house_text}>{translations.aunt_house[lang]}</p>

                <p className={style.restaurant_text}>{translations.restaurant[lang]}</p> 
                <button onClick={() => handleAuntsHouse()}
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

                <button onClick={() => handleRestaurant()}
                        className={style.icon_button} 
                        id={style.restaurant}>
                    <Image 
                        layout={"fill"}
                        quality={100}
                        priority={true}
                        src={"/img/map/restaurant.png"}/>
                    <p>{translations.restaurant[lang]}</p>

                </button> 

                <p className={style.home_text}>{translations.coming_soon[lang]}</p>
                <div
                    className={style.icon} 
                    id={style.home}>
                        <img className={style.icon} 
                            id={style.home}
                            src={"/img/map/my_house.png"}/>
                </div>

                <p className={style.school_text}>{translations.coming_soon[lang]}</p>
                <div
                    className={style.icon} 
                    id={style.school}>
                        <img className={style.icon} 
                            id={style.school}
                            src={"/img/map/school.png"}/>
                </div>

                <p className={style.grocery_store_text}>{translations.coming_soon[lang]}</p>
                <img className={style.icon} 
                    id={style.grocery_store}
                    src={"/img/map/grocery_store.png"}/>
            </div>
        </>
    );
    
    //TODO: Add text to appear when hovering over playable house
    //TODO: Recreate map from previous game
    /*
    return (
        <div className={style.map}>
            <table className={style.map_table}>
                <tbody>
                    <tr>
                        <td className={style.map_box}>
                            <MapIcon game_page_id={"aunt_house"}/>
                        </td>
                        <td className={style.map_box}>
                        </td>
                        <td className={style.map_box}>
                            <MapIcon game_page_id={"school"}/>
                        </td>
                    </tr>
                    <tr>
                        <td className={style.map_box}>
                        </td>
                        <td className={style.map_box}>
                            <MapIcon game_page_id={"my_house"}/>
                        </td>
                        <td className={style.map_box}>
                        </td>
                    </tr>
                    <tr>
                        <td className={style.map_box}>
                            <MapIcon game_page_id={"grocery_store"}/>
                        </td>
                        <td className={style.map_box}>
                        </td>
                        <td className={style.map_box}>
                            <MapIcon game_page_id={"restaurant"}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

    */
}
