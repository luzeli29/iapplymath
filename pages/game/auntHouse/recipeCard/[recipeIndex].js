import React from 'react'
import {useRouter} from 'next/router'
import style from '@styles/aunt_house.module.css'
import recipes from '@public/text/auntHouseRecipes'
import {useWrapperContext} from '@utils/imports/commonImports'
import translations from '@translations'

export default function RecipeCard() {
    const lang = useWrapperContext().state.lang;
    const router = useRouter()
    const { recipeIndex } = router.query
    
    //No clue why, but if you delete this if statement then the page can not be refreshed without error
    if(!recipeIndex) {
        return(
            <p></p>
        )
    }
    
    const recipe = recipes[recipeIndex]
    return(
        <div className={style.recipe_card_container}>
            <div className={style.recipe_card_title_container}>
                <p className={style.recipe_card_title}><strong>{recipe.name[lang] + " - " + recipe.serving_amount[lang]}</strong></p>
            </div>
            <div className={style.recipe_card_ing_container}>
                {recipe.ingredients.map((ing) => {
                    return(
                        <>

                        <p key={ing[lang]} className={style.recipe_card_ing}>
                            <img 
                                src={"/img/ing/" + ing.img} 
                                className={style.ing_image}/>
                            {ing.amount == "" ? ing[lang] : ing.amount + " " + ing[lang]}
                            
                        </p>
                        
                    </>
                    );})}
                    
            </div>
            
            <button 
                onClick={() => router.push('/game/auntHouse/questions/basic/' + recipeIndex)}
                className={style.recipe_card_button}> <strong>
               {/*TODO: potencially change if other langs were added*/}
               {translations.cook[lang]}</strong></button>
        </div>
    )
}


    