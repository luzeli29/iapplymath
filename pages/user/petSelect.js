import React, { useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router'
import style from '@styles/pet.module.css'
import {getText} from '@utils/imports/commonImports'
import { motion } from "framer-motion"
import ClickableIcon from '@comps/clickableIcon';
import { useUserContext } from '@hooks/siteContext/useUserContext';
import Loading from '@comps/screens/loading';
import Error from 'pages/error';
import Login from './login';


export default function PetSelect() {
    const {user,settings,loading, error} = useUserContext()
    const isLoggedIn = user.loggedIn    
    const userPetId =isLoggedIn ? user.data.petId : null
    const [selectedPetId, setSelectedPetId] = useState(userPetId? userPetId : null)

    const router = useRouter()

    if(loading || !router.isReady) return <Loading/>
    if(error) return <Error error={error}/>
    
    const lang = settings.lang
    if(!isLoggedIn) return <Login/>
    
    //This is called when the player is done creating
    //Should handle anything to be done in order to use avatar in game
    const handleSavePet = async() => {

        user.setPetId(selectedPetId)


        router.push('/user/backgroundSelect')
    }

    const PetButton = ({index}) => {
        const path = "/img/pets/pet"
        return (
            
            <ClickableIcon
                selected={selectedPetId == index}
                onClick={() => setSelectedPetId(index)}>
                    <div className={style.pet_select_button}>
                <Image
                        priority={true}
                        layout={"fill"}
                        src={path + index + ".png"}
                        alt={"pet"}/> 
            </div>
            </ClickableIcon>
        )
    } 
    

    return (
        <>
            <h1 className={style.as_title_container}>{getText('pet_select',lang)}</h1>
            <div className={style.button_bar}>
                {Array.apply(0, Array(4)).map((x,i) => {
                    return <PetButton index={i} key={i} />;
                })}
            </div>
            {selectedPetId != undefined ? 
                <button 
                        className={style.continue_button}
                        onClick={() => handleSavePet()}>
                    {getText('save',lang)}
                </button>
            :
                <>
                    <p>
                    </p>
                </>
            }
        </>
    )
}

