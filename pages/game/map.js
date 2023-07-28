import ReactHowler from 'react-howler'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import style from '@styles/map.module.css'
import translations from '@translations';
import {motion} from 'framer-motion';
import { useUserContext } from '@hooks/siteContext/useUserContext'
import Loading from '@comps/screens/loading'
import Error from 'pages/error'
import Login from 'pages/user/login'
import RetrieveUserContext from '@hooks/HOF/retrieveUserContext'

import { useDispatch } from 'react-redux'
import { setLocation } from 'store/Slices/musicSlice'
import getText from '@utils/text/getText'

const Map = ({user,settings}) => {
  const dispatch = useDispatch()
  const containerRef = useRef(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {

    dispatch(setLocation('map'))

    const handleResize = () => {
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      setPosition({
        x:
          mapLocation == "AuntsHouse"
            ? getXPercentage(130, containerWidth)
            : mapLocation == "Restaurant"
            ? getXPercentage(420, containerWidth)
            : getXPercentage2(320,containerWidth),
        y:
          mapLocation == "AuntsHouse"
            ? getYPercentage(120, containerHeight)
            : mapLocation == "Restaurant"
            ? getYPercentage(440, containerHeight)
            : getYPercentage2(470,containerHeight)
      });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mapLocation]);
    const router = useRouter()

    const lang = settings.lang
    const avatarId = user.data.avatarId
    const mapLocation = 0

    const handleRestaurant = () => {
        dispatch(setLocation('restaurant'))
        router.push('/dialog/restaurantIntro');
    }

    const handleAuntsHouse = () => {
      router.push('/dialog/auntHouseIntro');
    }

    const handleSchoolClick = () => {
      router.push('/dialog/schoolIntro');
    }

    const handleGroceryStoreClick = () => {
      router.push('/game/groceryStore/basic/levelSelect');
    }
    const handleStadium = () => {
      router.push('/game/stadium');
    }
    
    
  
    const getXPercentage = (x, containerWidth) => {
      return `${(x / containerWidth) * 100}%`;
    };
  
    const getYPercentage = (y, containerHeight) => {
      return `${(y / containerHeight) * 100}%`;
    };

    const getXPercentage2 = (x, containerWidth) => {
        return (containerWidth/2-30);
      };
    
      const getYPercentage2 = (y, containerHeight) => {
        return (containerHeight-37.5*2);
      };

     
  
    
  
    

    return (
        <>

            <div className={style.map} ref={containerRef}>
                <motion.img className={style.player_img}
                            id = {style.player_img}
                            src = {"/img/avatar/preMade/A" + avatarId + ".png"}
                            style ={{
                                position: 'absolute',
                                top: position.y,
                                left: position.x,
                            }}
                           
                />
            
                <p className={style.aunt_house_text}>{translations.aunt_house[lang]}</p> 

                <p className={style.restaurant_text}>{translations.restaurant[lang]}</p> 

                <p className={style.stadium_text}>{translations.stadium[lang]}</p> 
                
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

                <button onClick={() => handleStadium()}
                        className={style.icon2} id={style.stadium}> 
                    <Image 
                        layout={"fill"}
                        quality={100}
                        priority={true}
                        src={"/img/map/soccer_stadium.png"}
                        alt={"stadium"}/> 

                </button>
                

                <button onClick={() => handleRestaurant()}
                        className={style.icon_button} 
                        id={style.restaurant}>
                    <Image 
                        layout={"fill"}
                        quality={100}
                        priority={true}
                        src={"/img/map/restaurant.png"}
                        alt={"restaurant"}/>
                

                </button> 

                <p className={style.home_text}>{translations.coming_soon[lang]}</p>
                <div
                    className={style.icon} 
                    id={style.home}>
                        <img className={style.icon} 
                            id={style.home}
                            src={"/img/map/my_house.png"}/>
                </div>

                <p className={style.school_text}>{translations.school[lang]}</p>
                <button onClick={() => handleSchoolClick()}>
                  <div
                      className={style.icon_button} 
                      id={style.school}>
                        <Image 
                        layout={"fill"}
                        quality={100}
                        priority={true}
                        src={"/img/map/school.png"}
                        alt={"school image"}/>
                  </div>
                </button>
                <p className={style.grocery_store_text}>{getText('groceryStore',lang)}</p>
                <button onClick={() => handleGroceryStoreClick()}>
                  <img className={style.icon_button} 
                      id={style.grocery_store}
                      src={"/img/map/grocery_store.png"}/>
                </button>
            </div>
        </>
    );
}

export default RetrieveUserContext(Map,'gameReady')