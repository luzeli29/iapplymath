import React from 'react'
import {useRouter} from 'next/router'
import {GenerateBasicQuestions,GenerateFamilyQuestions} from '../../../../../comps/game/aunt-house/generate_questions'
import {useWrapperContext} from '../../../../../context/context'
import QuestionLayout from '../../../../../comps/game/layouts/question_layout'
import SmallRecipeCard from '../../../../../comps/game/aunt-house/SmallRecipeCard'

export default function AuntHouseQuestions() {
    const router = useRouter()
    const { recipe_index } = router.query
    const { question_type } = router.query
    //No clue why, but if you delete this if statement then the page can not be refreshed without error
    if(!recipe_index) {
        return(
            <p></p>
        )
    }
    var finishRoute = '';
    var questions = [];
    switch(question_type) {
        case 'family': 
            var familySize = window.localStorage.getItem('FAMILY_SIZE');
            questions = GenerateFamilyQuestions(recipe_index,familySize)
            finishRoute = '/game/aunt-house/finished';
            break;
        default:
            questions = GenerateBasicQuestions(recipe_index)
            finishRoute = '/game/aunt-house/family-members/' + recipe_index;
            break;
    }
    return (
        <>
            <QuestionLayout
                onBack={() => {router.push('/game/aunt-house')}}
                questions={questions}
                onFinish={() => {
                        window.localStorage.removeItem('FAMILY_SIZE');
                        router.push(finishRoute)}}> 
                <SmallRecipeCard
                    recipeIndex={recipe_index}
                    />
            </QuestionLayout>
        </>
    );
}
