import React, {useState} from 'react';
import Image from "next/image";
import {useWrapperContext} from '@common_imports'
import { useRouter } from 'next/router'
import style from '../../styles/check_in.module.css'
import translations from '../../public/text/translations';
import { motion } from "framer-motion"

export default function Creator() {
    //get the site context and lang
    const context = useWrapperContext()
    const lang = context.state.lang

    const router = useRouter();

    const [feeling, setFeeling] = useState("")

    //This is called when the player is done creating
    //Should handle anything to be done in order to use avatar in game
    const handleFeelingSelected = () => {
        // context.setAvatar(avatar)
        router.push('/game/map')
    }

    const FeelingButton = ({index}) => {
        const path = "/img/feelings/feeling"
        return (
            <button
                onClick={() => setFeeling(index)}
                className={style.avatar_select_button}>
                <Image
                    priority={true}
                    layout={"fill"}
                    src={feeling == index ? path + index + ".png" : path + index + ".png"}/>

            </button>
        )
    }

    return (
        <>
            <h1 className={style.as_title_container}>{translations.check_in[lang]}</h1>
            <div className={style.feeling_buttons}>
                {Array.apply(0, Array(5)).map((x,i) => {
                    return <motion.div whileHover={{scale: 0.8}} whileTap={{backgroundColor: "#000000", borderRadius:100}}> <FeelingButton index={i + 1} key={i} /> </motion.div>
                    ;
                })}
            </div>
            <button
                className={style.continue_button}
                onClick={() => handleFeelingSelected()}
            >{translations.continue[lang]}</button>
        </>
    )
}