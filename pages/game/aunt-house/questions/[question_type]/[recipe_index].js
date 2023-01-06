import React from 'react'
import {useRouter} from 'next/router'
import {generateBasicQuestions,generateFamilyQuestions} from '@utils/game/aunt_house/generate_aunt_house_questions'
import {GameQuestionLayout} from '@common_imports'
import SmallRecipeCard from '@components/game/aunt-house/SmallRecipeCard'

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
            var familySize = window.sessionStorage.getItem('FAMILY_SIZE');
            questions = generateFamilyQuestions(recipe_index,familySize);
            finishRoute = '/game/aunt-house/finished';
            break;
        default:
            questions = generateBasicQuestions(recipe_index)
            finishRoute = '/game/aunt-house/family-members/' + recipe_index;
            break;
    }
    return (
        <GameQuestionLayout
            onBack={() => {router.push('/game/aunt-house')}}
            questions={questions}
            onFinish={() => {
                    window.sessionStorage.removeItem('FAMILY_SIZE');
                    router.push(finishRoute)}}> 
            <SmallRecipeCard
                recipeIndex={recipe_index}
                />
        </GameQuestionLayout>
    );
}
