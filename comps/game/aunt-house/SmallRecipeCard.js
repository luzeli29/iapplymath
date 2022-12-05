import React from 'react'
import {useWrapperContext} from '../../../context/context'
import recipes from '../../../public/text/aunt_house_recipes'
import style from '../../../styles/aunt_house.module.css'

export default function SmallRecipeCard({recipeIndex}) {
    const lang = useWrapperContext().state.lang;
    const recipe = recipes[recipeIndex]

    return(
        <div className={style.recipe_card_container}>
            <div className={style.small_recipe_card_title_container}>
                <p className={style.small_recipe_card_title}><b>{recipe.name[lang] + " - " + recipe.serving_amount[lang]}</b></p>
            </div>
            <div className={style.small_recipe_card_ing_container}>
                {recipe.ingredients.map((ing) => {
                                    return(
                                        <p className={style.small_recipe_card_ing} key={ing[lang]}>
                                            <img 
                                                src={"/img/ing/" + ing.img} 
                                                className={style.ing_image_small}/>
                                            {ing.amount + " " + ing[lang]}
                                        </p>
                                    );
                    })}
            </div>
                
            

        </div>
    )
}
