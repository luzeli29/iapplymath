import React from 'react'
import {useWrapperContext} from '@utils/imports/commonImports'
import recipes from '@public/text/auntHouseRecipes'
import style from '@styles/aunt_house.module.css'

export default function SmallRecipeCard({recipeIndex}) {
    const lang = useWrapperContext().state.lang;
    const recipe = recipes[recipeIndex]

    return(
        <div className={style.recipe_card_container}>
            <div className={style.small_recipe_card_title_container}>
                <p className={style.small_recipe_card_title}><strong>{recipe.name[lang] + " - " + recipe.serving_amount[lang]}</strong></p>
            </div>
            <div className={style.small_recipe_card_ing_container}>
                {recipe.ingredients.map((ing) => {
                                    return(
                                        <p className={style.small_recipe_card_ing} key={ing[lang]}>
                                            <img 
                                                src={"/img/ing/" + ing.img} 
                                                className={style.ing_image_small}
                                                alt={"recipe ingredient"}/>
                                            {ing.amount + " " + ing[lang]}
                                        </p>
                                    );
                    })}
            </div>
                
            

        </div>
    )
}
