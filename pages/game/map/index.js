import React from 'react';
import style from '../../styles/map.module.css'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {useWrapperContext} from '../../../context/context'
import translations from '../../../public/text/translations';
import MapIcon from '../../../comps/game/map_icon';
export default function Map() {
    //get lang from context
    const lang = useWrapperContext().state.lang
    const router = useRouter()

    //TODO: Add text to appear when hovering over playable house
    //TODO: Recreate map from previous game

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
                            <MapIcon game_page_id={"school"} is_coming_soon={true}/>
                        </td>
                    </tr>
                    <tr>
                        <td className={style.map_box}>
                        </td>
                        <td className={style.map_box}>
                            <MapIcon game_page_id={"my_house"} is_coming_soon={true}/>
                        </td>
                        <td className={style.map_box}>
                        </td>
                    </tr>
                    <tr>
                        <td className={style.map_box}>
                            <MapIcon game_page_id={"grocery_store"} is_coming_soon={true}/>
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
}
