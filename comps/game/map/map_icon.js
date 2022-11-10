import React, {} from 'react';
import {useWrapperContext} from '../../../context/context'
import style from '../../styles/map.module.css'
import translations from '../../../public/text/translations'
import {useRouter} from 'next/router'
import Image from 'next/image'


export default function MapIcon({game_page_id, is_coming_soon}) {
    //get current lang
    const lang = useWrapperContext().state.lang;
    console.log(game_page_id)
    //init router
    const router = useRouter()
    //set src
    const src = "/img/map/" + game_page_id + ".png"
    let globalCss = " center "
    globalCss += is_coming_soon ? " opacity-50" : " ";
    return (
        <div>
            {is_coming_soon ? 
            <h6 className="white">{translations["coming_soon"][lang]}</h6>
            :
            <h6 className="">{translations[game_page_id][lang]}</h6>
            }
            <div className={style.map_icon_image_box + globalCss}>
                    {is_coming_soon ? 
                        <div className={style.map_icon_image_disabled + globalCss}>
                            <Image 
                                layout={"fill"}
                                quality={100}
                                priority={true}
                                src={src}/> 
                        </div>
                    :
                        <div className={style.map_icon_image + globalCss}>
                            <button onClick={() => router.push('game/' + game_page_id)} >
                                <Image 
                                    layout={"fill"}
                                    quality={100}
                                    priority={true}
                                    src={src}/> 
                            </button>
                        </div>
                    }
            </div>
        </div>
    );
}