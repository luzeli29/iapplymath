import ReactHowler from 'react-howler'
import Image from 'next/image'
import {useRouter} from 'next/router'
import style from '@styles/map.module.css'
import translations from '@translations';
import {motion} from 'framer-motion';
import { useUserContext } from '@hooks/siteContext/useUserContext'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'

export default function Map() {
    const {user,settings,loading, error} = useUserContext()
    const router = useRouter()

    const isLoggedIn = user.loggedIn    
    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    if(!isLoggedIn) return <Login/>

    const lang = settings.lang
    const avatarId = user.data.avatarId
    const mapLocation = 0
    
    const handleRestaurant = () => {
        router.push('/game/restaurant/introduction');
    }

    const handleAuntsHouse = () => {
        router.push('/game/auntHouse/introduction');
    }

    return (
        <>

            <div className={style.map}>
                <motion.img className={style.player_img}
                            id = {style.player_img}
                            src = {"/img/avatar/preMade/A" + avatarId + ".png"}
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
                        src={"/img/map/aunt_house.png"}
                        alt={"aunt house"}/> 

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
                        src={"/img/map/restaurant.png"}
                        alt={"restaurant"}/>
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
            <br></br>
        </>
    );
}