import React from 'react'
import {useRouter} from 'next/router'
import {generateAuntHouseQuestions,generateFamilyQuestions} from '@utils/game/auntHouse/generateAuntHouseQuestions'
import {GameQuestionLayout} from '@utils/imports/commonImports'
import SmallRecipeCard from '@comps/game/auntHouse/smallRecipeCard'

export default function AuntHouseQuestions() {
    const router = useRouter()
    const { recipeIndex } = router.query
    const { questionType } = router.query
    //No clue why, but if you delete this if statement then the page can not be refreshed without error
    if(!recipeIndex) {
        return(
            <p></p>
        )
    }
    var finishRoute = '';
    var questions = [];
    switch(questionType) {
        case 'family': 
            var familySize = window.sessionStorage.getItem('FAMILY_SIZE');
            questions = generateFamilyQuestions(recipeIndex,familySize);
            finishRoute = '/game/aunt-house/finished';
            break;
        default:
            questions = generateAuntHouseQuestions(recipeIndex)
            finishRoute = '/game/aunt-house/family-members/' + recipeIndex;
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
                recipeIndex={recipeIndex}
                />
        </GameQuestionLayout>
    );
}
