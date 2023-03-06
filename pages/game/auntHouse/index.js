import React, {useState} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {GameIndexLayout,useWrapperContext} from '@utils/imports/commonImports'
import style from '@styles/aunt_house.module.css'
import recipes from '@public/text/auntHouseRecipes'

export default function RecipeSelect() {
  const lang = useWrapperContext().state.lang;
  const router = useRouter()

  const [recipe, setRecipe] = useState();

  function handleRecipeClick (recipe_object) {
    if(recipe == recipe_object) {
        setRecipe(null)
    } else {
        setRecipe(recipe_object)
    }
}
return (
    <GameIndexLayout
            lang={lang}
            game_name={"aunt_house"}
            instruction_text={"aunt_welcome"}
            submit_text={"cook"}
            handleSubmit={() => router.push('/game/aunt-house/recipe-card/' + recipe)}>
                
        <div className={style.recipe_select_button_grid}>
            {recipes.map((x, index) => {
                return(
                    <div key={x.name.en} className={style.recipe_select_button_container}>
                        <button 
                            onClick={() => {
                                handleRecipeClick(index)
                            }}>
                                <div className={index == recipe ? style.recipe_select_box_container_selected : style.recipe_select_box_container}>
                                <p className={style.recipe_select_box_text}>{x.name[lang]}</p>
                                    <Image
                                        priority={true}
                                        width={80}
                                        height={80}
                                        src={"/img/food/"+x.path+ ".png"}
                                    />
                                </div>
                        </button>
                    </div>
                    )})}
        </div>
    </GameIndexLayout>
)
}
