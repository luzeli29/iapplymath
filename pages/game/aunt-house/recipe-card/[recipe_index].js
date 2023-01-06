import React from 'react'
import {useRouter} from 'next/router'
import style from '@styles/aunt_house.module.css'
import recipes from '@public/text/aunt_house_recipes'
import {useWrapperContext} from '@common_imports'
import translations from '@translations'

export default function RecipeCard() {
    const lang = useWrapperContext().state.lang;
    const router = useRouter()
    const { recipe_index } = router.query
    
    //No clue why, but if you delete this if statement then the page can not be refreshed without error
    if(!recipe_index) {
        return(
            <p></p>
        )
    }
    
    const recipe = recipes[recipe_index]
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
                onClick={() => router.push('/game/aunt-house/questions/basic/' + recipe_index)}
                className={style.recipe_card_button}> <strong>
               {/*TODO: potencially change if other langs were added*/}
               {translations.cook[lang]}</strong></button>
        </div>
    )
}


    