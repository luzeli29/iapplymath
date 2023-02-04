import React from 'react';
import Image from "next/image";
import { useRouter } from 'next/router'
import style from '@styles/pet.module.css'
import {useWrapperContext,getText} from '@common_imports'
import { motion } from "framer-motion"


export default function Creator() {
    //get the site context and lang
    const context = useWrapperContext()
    const lang = context.state.lang
    const petId = context.state.petId
    const userId = context.state.userId
    
    const router = useRouter();

    //This is called when the player is done creating
    //Should handle anything to be done in order to use avatar in game
    const handleSavePet = async() => {
        const data = {
            userId: context.state.userId,
            petId: context.state.petId
        }

        const JSONdata = JSON.stringify(data)

        const endpoint = '/api/petId'

        const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        //const result = await response.json()

        router.push('/game/map')
    }

    const PetButton = ({index}) => {
        const path = "/img/pets/pet"
        return (
            <button
                onClick={() => context.setPetId(index)}
                className={style.pet_select_button}>
                <Image
                        priority={true}
                        layout={"fill"}
                        src={context.state.petId == index ? path + index + ".png" : path + index + ".png"}/> 
            
            </button>
        )
    } 
    

    return (
        <>
            <h1 className={style.as_title_container}>{getText('pet_select',lang)}</h1>
            <div className={style.button_bar}>
                {Array.apply(0, Array(4)).map((x,i) => {
                    return <PetButton index={i + 1} key={i} />;
                })}
            </div>
            {petId && userId ? 
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

