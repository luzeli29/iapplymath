import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { getText, useWrapperContext } from '@commonImports'
import LoadingScreen from '@comps/screens/loadingScreen'
import PageExitCatcher from '@comps/utilityComps/pageExitCatcher'
import {Dialog} from '@commonImports'
import PopupBox from '@comps/popupBox'
import style from '@styles/game_layout.module.css'
import translations from '@public/text/translations'
import QuestionScreen from '@comps/game/quizComps/questionScreen'
import {generateAuntHouseQuestions,generateFamilyQuestions} from '@utils/game/auntHouse/generateAuntHouseQuestions'
import SmallRecipeCard from '@comps/game/auntHouse/smallRecipeCard'
import GenerateFamilySizeQuestion from '@utils/game/auntHouse/generateFamilySizeQuestion'

export default function Questions() {
    const router = useRouter()
    const context = useWrapperContext()
    const lang = context.state.lang
    const [questions, setQuestions] = useState()
    const [questionData, setQuestionData] = useState()
    const [isFinished, setFinished] = useState()
    const [exitPopup, setExitPopup] = useState()
    const [questionNum, setQuestionNum] = useState(0)

    useEffect(() => {
        if(router.isReady){
            setFinished(false)
            console.log("here")
            const { gameType } = router.query
            const { questionType } = router.query
            console.log(gameType)
            console.log(questionType)

            //TODO: THIS IS TERRIBLE AHHHHHHHH
            switch(gameType) {
                case "aunt_house" :
                    if(questionType == "basic") {
                        const { recipeIndex } = router.query
                        setQuestions(generateAuntHouseQuestions(recipeIndex))
                    } else if (questionType == "family") {
                        const { recipeIndex } = router.query
                        const { familySize } = router.query
                        setQuestions(generateFamilyQuestions(recipeIndex,familySize))
                    } else if (questionType == "family_num") {
                        const { recipeIndex } = router.query
                        setQuestions(GenerateFamilySizeQuestion(recipeIndex))
                    }
                    break;
                case "restuarant" :
                    break;            
            }
            console.log(questions)
        }
    }, [router.asPath]);

    const renderGameChild = () => {
        const { gameType } = router.query

        switch(gameType) {
            case "aunt_house" :
                const { recipeIndex } = router.query
                return (<SmallRecipeCard recipeIndex={recipeIndex}/>)
            case "restuarant" :
                break;            
        }    }

    //HandleAnswerQuestion
    function handlePageExit() {
        //save data here

    }

     //HandleAnswerQuestion
    function handleBack() {
        const { gameType } = router.query
        handlePageExit()
        router.push("/game/" + gameType)
    }

    function nextQuestion() {
        setQuestionNum(questionNum + 1)

        if(questionNum == questions.length - 1)  {
            setQuestionNum(0)
            const { gameType } = router.query
            const { questionType } = router.query
            switch(gameType) {
                case "aunt_house" :
                    const { recipeIndex } = router.query
                    if(questionType == "basic") {
                        router.push('/game/questions/auntHouse?questionType=family_num&recipeIndex=' + recipeIndex)
                    } else if (questionType == "family") {
                    } else if ("family_num") {
                        const familySize = window.sessionStorage.getItem('FAMILY_SIZE');
                        window.sessionStorage.removeItem('FAMILY_SIZE');
                        router.push('/game/questions/auntHouse?questionType=family&recipeIndex=' + recipeIndex + '&familySize=' + familySize)
                    }
                    break;
                case "restuarant" :
                    break;            
            }
            setFinished(true)
            setQuestionNum(0)
        }
    }

    if(isFinished) return <div></div>
    if(!questions) return <LoadingScreen lang={lang}/>

    const question = questions[questionNum]
    //TODO: error handle blank question
    return (
        <div key={router.asPath}>
        {/*<PageExitCatcher lang={lang} handleChangeStart={() => handleChangeStart()}>*/}
            {/* TODO: Implement onRoute popup */}
            {/* exitPopup ? <PopupBox/> : null */}
            <div className=''>
                <div className='row'>
                    <div className="col-12 d-flex justify-content-center py-1">
                        <button className="basic_button_sm" onClick={() => handleBack()}>
                            {getText("back",lang)}
                        </button>
                    </div>
                </div>
                <div className='mx-auto border border-dark'>
                    <QuestionScreen question={question} 
                                    nextQuestion={() => nextQuestion()} 
                                    lang={lang}>
                        {renderGameChild()}
                    </QuestionScreen>
                </div>
            </div>
        {/*</PageExitCatcher>*/}
        </div>
    )
}