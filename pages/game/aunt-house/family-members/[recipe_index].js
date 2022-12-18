import React from 'react'
import {useRouter} from 'next/router'
import QuestionLayout from '../../../../comps/game/layouts/question_layout'
import style from '../../../../styles/aunt_house.module.css'
import Image from 'next/image'

export default function FamilySelect() {
    const router = useRouter()
    const { recipe_index } = router.query
    /*TODO: potencially change if other langs were added*/
    var questions = [{
    en: "How many people should we cook for?",
    es: "¿Para cuántas personas vamos a cocinar?",

    hint: [{
        t: {
            en: "Please enter a number between 1 - 13",
            //TODO: Translate
            es: "NOT TRANSLATED YET!",
        },
    }],
    answer: "fill_in",
    onAnswer: (answer) => {
        if(isNaN(answer)) {
            return false;
        } else if(answer > 1 && answer <= 12) {
            window.localStorage.setItem('FAMILY_SIZE',answer)
            return true;
        } else {
            //Incorrect, shows hint
            return false;
        }
    }},]

    return(
        <QuestionLayout
            onBack={() => router.push('/game/aunt-house')}
            questions={questions}
            onFinish={() => {
                router.push('/game/aunt-house/questions/family/' + recipe_index)
                return(<></>)}}>
            <div className={style.fs_aunt_container}>
                <Image
                    priority={true}
                    layout="fill"
                    src={"/img/aunt_house/aunt-house_speaker.png"}
                />
            </div>
        </QuestionLayout>)
}
