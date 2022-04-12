import React, {useState} from 'react';
import Dialog from '../../dialog';
import {useWrapperContext} from '../../../context/context'
import GameLayout from '../game_layout'
import style from './aunt.module.css'
import Image from 'next/image'
import script from '../../../public/text/script';
import recipes from './recipes';
import SimplifyFraction from '../../simplify_fraction';

//Main Aunt game
export default function Aunt ({backToMap}) {
    //get context and lang
    const context = useWrapperContext();
    const lang = context.state.lang;

    //State to keep track where the player is
    const [state, setState] = useState("intro_dialog");
    //Current recipe
    const [recipe, setRecipe] = useState();
    //Family Size
    const [familySize, setFamilySize] = useState("null");


    //generates the propper question JS object to be read by GameLayout
    //TODO: Sometimes is wrong s:(
    const generateMultiQuestion = (ing, num) => {
        var answer
        if(isNaN(ing.amount)) {
            //ing.amount is not a number
            var ingAmount = ing.amount.split("/")
            answer = SimplifyFraction((ingAmount[0] * num),ingAmount[1] * recipe.serving_size)
        } else {
            //ing.amount is a number
            answer = SimplifyFraction((ing.amount * num),recipe.serving_size)
        }
        return ([{
            en: ing.question.en  + " do we need for " + num + " " + recipe.serving_of[num == 1 ? "singular" : "plural"][lang] + " " + recipe.name[lang].toLowerCase() + "?",
            es: "¿" + ing.question.es + " necesitamos para " + " " + num + " " + recipe.serving_of[num == 1 ? "singular" : "plural"][lang] + " " + recipe.name[lang].toLowerCase() + "?",
            answer: answer,
            hint: [{
                en: "(" + ing.amount + ") x (" + SimplifyFraction(num,recipe.serving_size) + ") = ???",
                es: "(" + ing.amount + ") x (" + SimplifyFraction(num,recipe.serving_size) + ") = ???",
            },{
                en: "(" + ing.amount + ") x (" + SimplifyFraction(num,recipe.serving_size) + ") = " + answer,
                es: "(" + ing.amount + ") x (" + SimplifyFraction(num,recipe.serving_size) + ") = " + answer,
            }],
        }].concat(feedback[Math.floor(Math.random() * feedback.length)]))
        //TODO: fix random due to functionality
    }

    //Recipe card component for recipe card screen
    const RecipeCard = () => {
        return(
            <div className={style.recipe_card_container}>
                <img className={style.recipe_card_img}src="/img/aunt_house/recipe_card.png"/>

                <div className={style.recipe_card_text_container}>
                    <p className={style.recipe_card_text} >{recipe.name[lang] + " - " + recipe.serving_amount[lang]}</p>
                    {recipe.ingredients.map((ing) => {
                        return(
                        <p key={ing[lang]} className={style.recipe_card_text}>
                            {ing.amount == "" ? ing[lang] : ing.amount + " " + ing[lang]}
                        </p>);})}
                </div>
                <button 
                    onClick={() => setState("basic_game")}
                    className={style.recipe_card_button}> <b>
                    {lang == "en" ? "Cook!" : "¡Cocinar!"}</b></button>

            </div>
        )
    }

    //Small recipe card component to be shown in GameLayout
    const SmallRecipeCard = () => {
        return(

            //TODO: remove red border from small_recipe_card_container when done
            <div className={style.small_recipe_card_container}>
                <img className={style.small_recipe_card_img}src="/img/aunt_house/recipe_card.png"/>
                <div className={style.small_recipe_card_text_container}>
                    {/* TODO: Make small recipe card look nice */}
                    <p className={style.small_recipe_card_text}>{recipe.name[lang]}</p>
                    <p className={style.small_recipe_card_text}>{"(" + recipe.serving_amount[lang] + ")"}</p>

                    {recipe.ingredients.map((ing) => {
                                    return(
                                        <p className={style.small_recipe_card_text} key={ing[lang]}>{ing.amount + " " + ing[lang]}</p>
                                    );
                    })}
                </div>
                

            </div>
        )
    }

    //Recipe selection component... allows user to select which recipe they want
    const RecipeSelect = () => {
        return(
            <div className={style.recipe_select_container}>  
                <img className={style.background_image} src="/img/aunt_house/aunt_house_bg.png"/>
                <button className={style.rs_map_button}onClick={() => backToMap()}><b>{lang == "en" ? 
                    "Back to map" : 
                    "Volver al mapa"
                }</b></button>

                <div className={style.rs_text_container}>
                    <p className={style.rs_text}><b>{lang == "en" ? 
                        "Welcome to Tía María kitchen!" : 
                        "¡Bienvenidos a la cocina de Tía María!"
                    }</b></p>
                    <p className={style.rs_text}><b>{lang == "en" ? 
                        "Choose the recipe you’d like to try making:" : 
                        "Elige la receta que te gustaría intentar hacer:"
                    }</b></p>
                </div>

                <table className={style.rs_table}>
                    <tbody>
                        <tr>
                    {recipes.map((x) => {
                        return(
                            <td key={x.name.en} className={style.rs_col}>
                                <button 
                                    onClick={() => {
                                        setRecipe(x);
                                        setState("recipe_card");
                                    }}>
                                        <div className={style.rs_image}>
                                            <Image
                                                priority={true}
                                                width={80}
                                                height={80}
                                                src={"/img/aunt_house/recipes/"+x.path+ ".png"}
                                            />
                                        </div>
                                </button>
                                </td>
                            )})}
                            </tr>
                    </tbody>
                </table>
            </div>)}

    //Renders game screen with given recipe, multiples to test and function when finished with questions
    const GameScreen = ({questionType,onFinish}) => {
        //Generate questions to asked
        var questions = [];
        
        if(questionType == "basic") {
            if(recipe.ingredients.length == 4) {
                questions[0] = {
                    en:"How many different fruits do we need for our fruit salad?",
                    es:"¿Cuántas frutas diferentes necesitamos para nuestra ensalada de frutas?",
                    answer: 4,
                    hints: [
                        {
                            en: "Count all the ingredients.",
                            es: "Cuenta todos los ingredientes",
                        }
                    ]
                }
                questions[1] = feedback[0]
            }
            //basic questions
            recipe.set_questions.map((x) => {
                if(x[0] == -1) {
                    //do question on every ingredient with given multiple
                    recipe.ingredients.map((ing) => {
                        questions = questions.concat(generateMultiQuestion(ing, x[1]))
                    })
                } else {
                    //do question with given ing and multiple
                    questions = questions.concat(generateMultiQuestion(recipe.ingredients[x[0]], x[1]))
                }
                //goes through every ingredient for every multiple
            })
        } else {
            //TODO: remove this if statement and make better
            //family questions
            recipe.family_questions.map((x) => {
                if(x == -1) {
                    //do question on every ingredient
                    recipe.ingredients.map((ing) => {
                        questions = questions.concat(generateMultiQuestion(ing, familySize))
                    })
                } else {
                    questions = questions.concat(generateMultiQuestion(recipe.ingredients[x], familySize))

                }
            })
        }
        
        return (
            <>
                <GameLayout
                    questions={questions}
                    onFinish={() => {
                        onFinish()
                        return(<></>)}}> 
                    <SmallRecipeCard/>
                </GameLayout>
            </>
        );}


    //Component where user imputs how many members in their family
    const FamileSelect = () => {
        var question = [{
            en: "How many people should we cook for?",
            es: "¿Para cuántas personas vamos a cocinar?",
            
            //TODO: replace with hint component
            hint: [{
                t: {
                    en: "Please enter a number between 1-15",
                    //TODO: Translate
                    es: "NOT TRANSLATED YET!",
                },
            }],
            answer: "fill_in",
            onAnswer: (answer) => {
                if(isNaN(answer)) {
                    return false;
                } else if(answer > 1 && answer <= 12) {
                    setFamilySize(answer)
                    return true;
                } else {
                    //Incorrect, shows hint
                    return false;
                }
            }},]

        return(
            <GameLayout
                questions={question}
                onFinish={() => {
                    setState("family_game")
                    return(<></>)}}>
                <div className={style.fs_aunt_container}>
                    <Image
                        priority={true}
                        layout="fill"
                        src={"/img/aunt_house/aunt.png"}
                    />
                </div>
            </GameLayout>
            
        )
    }

    //Component where user can continue playing aunts or go to map
    const EndChoice = () => {
        return (
            <>
                <img className={style.background_image} src="/img/aunt_house/aunt_house_bg.png"/>
                <table className={style.end_container}>
                    <tbody >
                        <tr >
                            <td>
                                <button className={style.end_button} onClick={() => backToMap()}>Map</button>
                                <button className={style.end_button} onClick={() => setState("recipe_select")}>Recipe Select</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }

    //Renders screen depending on the state in quick Aunt is in
    switch(state) {
        case "intro_dialog" : //Intro dialog that introduces user to aunt game
            return (
                <Dialog 
                    stage={"aunt_house"} 
                    script={script.aunt_intro} 
                    onEnd={() => setState("recipe_select")}/>)

        case "recipe_select" : //Recipe selection screen
            return (<RecipeSelect/>)

        case "recipe_card" : //Recipe card screen
            return (<RecipeCard/>)

        case "basic_game" : //Basic game with easy questions to introduce user to game
            return (<GameScreen
                        questionType={"basic"}
                        onFinish={() => setState("family_select")}/>)
                        
        case "family_select" : //Screen where user input their family size
            return (<FamileSelect/>);

        case "family_game" : //Renders the family based game questions
            return (<GameScreen
                        questionType={"family"}
                        onFinish={() => setState("finished_recipe")}/>)

        case "finished_recipe" : //Dialog when all questions for a recipe finished
            return(
                <Dialog 
                    stage={"aunt_house"} 
                    script={script.aunt_outro} 
                    onEnd={() => setState("end_choice")}/>)
                    
        case "end_choice" : //Screen where user can continue to play aunt or go to map
            return(<EndChoice/>);
    }    
} 

//TODO: move to game layout and not have it included in the questions
const feedback = [ 
    {
        en: "Excellent!",
        es:"¡Muy bien!",   
        answer: ""
    },{
        en: "Correct!",
        es:"¡Correcto!",
        answer: ""
    },{
        en: "Great Job!",
        es:"¡Excelente trabajo!",
        answer: ""
    },
]