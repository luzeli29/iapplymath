import React, {} from 'react';
import {useWrapperContext} from '@common_imports'
import style from '@styles/map.module.css'
import translations from '@translations'
import {useRouter} from 'next/router'
import Image from 'next/image'


export default function MapIcon({game_page_id}) {
    //get current lang
    const lang = useWrapperContext().state.lang;
    //init router
    const router = useRouter()
    //set src
    const src = "/img/map/" + game_page_id + ".png"

    return (
        <div>
            <h6 className="">{translations[game_page_id][lang]}</h6>
            <div className={style.map_icon_image_box + " center"}>
                <div className={style.map_icon_image + " center"}>
                    <button onClick={() => router.push('game/' + game_page_id)} >
                            <Image 
                                layout={"fill"}
                                quality={100}
                                priority={true}
                                src={src}/> 
                    </button>
                </div>
            </div>
        </div>
    );
}