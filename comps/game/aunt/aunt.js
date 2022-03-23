import React, {useState} from 'react';
import GameLayout from '../game_layout'
import style from './aunt.module.css'

export default function Aunt () {
    const [state, setState] = useState("intro_dialog");
    const [recipe, setRecipe] = useState();

    const inputRecipe = (newRecipe) => {

    }

    const render = () => {
        switch(state) {
            case "intro_dialog" :
                return (
                    //Intro Dialog
                    <>
                        <button onClick={() => setState("recipe_select")}>skip</button>
                    </>
                );
            case "recipe_select" :
                return (
                    //Recipe Selection Screen
                    <>
                        <button onClick={() => inputRecipe("r1")}>skip</button>
                    </>
                );
        }
    }

    return (
            <div className={style.aunt_container}>
                {render()}

            </div>
    );
}
 
