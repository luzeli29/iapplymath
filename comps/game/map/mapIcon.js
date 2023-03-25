import React, {} from 'react';
import style from '@styles/map.module.css'
import translations from '@translations'
import {useRouter} from 'next/router'
import Image from 'next/image'


export default function MapIcon({game_page_id}) {
    const {user,settings,loading, error} = useUserContext()

  const router = useRouter()

  if(loading || !router.isReady) return <Loading/>
  if(error) return <Error error={error}/>

  const lang = settings.lang
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
                                src={src}
                                alt={"map"}/> 
                    </button>
                </div>
            </div>
        </div>
    );
}