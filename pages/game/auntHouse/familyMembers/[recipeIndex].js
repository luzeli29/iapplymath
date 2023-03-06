import React from 'react'
import {useRouter} from 'next/router'
import {GameQuestionLayout} from '@utils/imports/commonImports'
import style from '@styles/aunt_house.module.css'
import Image from 'next/image'

export default function FamilySelect() {
    const router = useRouter()
    const { recipeIndex } = router.query
    /*TODO: potencially change if other langs were added*/
    var questions = [{
    en: "How many people should we cook for?",
    es: "¿Para cuántas personas vamos a cocinar?",

    hints: [{
            en: "Please enter a number between 1 - 13",
            //TODO: Translate
            es: "NOT TRANSLATED YET!",
        },
    ],
    answer: "fill_in",
    onAnswer: (answer) => {
        if(isNaN(answer)) {
            return false;
        } else if(answer > 1 && answer <= 12) {
            window.sessionStorage.setItem('FAMILY_SIZE',answer)
            return true;
        } else {
            //Incorrect, shows hint
            return false;
        }
    }},]

    return(
        <GameQuestionLayout
            onBack={() => router.push('/game/auntHouse')}
            questions={questions}
            onFinish={() => {
                router.push('/game/auntHouse/questions/family/' + recipeIndex)
                return(<></>)}}>
            <div className={style.fs_aunt_container}>
                <Image
                    priority={true}
                    layout="fill"
                    src={"/img/auntHouse/aunt_house_speaker.png"}
                />
            </div>
        </GameQuestionLayout>)
}
