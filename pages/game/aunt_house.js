import React, {useState} from 'react'
import Dialog from '../../comps/dialog/dialog'
import {useWrapperContext} from '../../context/context'
import style from '../../styles/aunt_house.module.css'
import Image from 'next/image'
import recipes from '../../public/text/aunt_house_recipes'

import SimplifyFraction from '../../comps/game/simplify_fraction'
import BasicGameLayout from '../../comps/game/basic_game_layout'
import QuestionLayout from '../../comps/game/question_layout'
import FinishScreen from '../../comps/game/finish_layout'
import {useRouter} from 'next/router'
import translations from '../../public/text/translations'

//Main Aunt game
export default function AuntHouse () {
    //get context and lang
    const context = useWrapperContext();
    const lang = context.state.lang;
    const router = useRouter()
    
    //State to keep track where the player is
    const [state, setState] = useState("intro_dialog");
    //Current recipe
    const [recipe, setRecipe] = useState();
    //Family Size
    const [familySize, setFamilySize] = useState("null");


    //generates the propper question JS object to be read by QuestionLayout
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
        //TODO: potencially change if other langs were added
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
        }])
    }

    //Recipe card component for recipe card screen
    const RecipeCard = () => {
        return(
            <div className={style.recipe_card_container}>
                <div className={style.recipe_card_title_container}>
                    <p className={style.recipe_card_title}><b>{recipe.name[lang] + " - " + recipe.serving_amount[lang]}</b></p>
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
                    onClick={() => setState("basic_game")}
                    className={style.recipe_card_button}> <b>
                    {/*TODO: potencially change if other langs were added*/}
                    {translations.cook[lang]}</b></button>

            </div>
        )
    }

    //Small recipe card component to be shown in QuestionLayout
    const SmallRecipeCard = () => {
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

    //Recipe selection component... allows user to select which recipe they want
    const RecipeSelect = () => {
        
        function handleRecipeClick (recipe_object) {
            if(recipe == recipe_object) {
                setRecipe(null)
            } else {
                setRecipe(recipe_object)
            }
        }

        function handleSubmit () {
            //check if a recipe was selected
            if(recipe) {
                setState("recipe_card")
            }
        }

        return (
            <BasicGameLayout
                    lang={lang}
                    game_name={"aunt_house"}
                    instruction_text={"aunt_welcome"}
                    submit_text={"cook"}
                    handleSubmit={() => handleSubmit()}>
                        
                <div className={style.recipe_select_button_grid}>
                    {recipes.map((x) => {
                        return(
                            <div key={x.name.en} className={style.recipe_select_button_container}>
                                <button 
                                    onClick={() => {
                                        handleRecipeClick(x)
                                    }}>
                                        <div className={x == recipe ? style.recipe_select_box_container_selected : style.recipe_select_box_container}>
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
            </BasicGameLayout>
        )
    }

    //Renders game screen with given recipe, multiples to test and function when finished with questions
    const GameScreen = ({questionType,onFinish}) => {
        //Generate questions to asked
        var questions = [];
        
        if(questionType == "basic") {
            if(recipe.ingredients.length == 4) {
                /*TODO: potencially change if other langs were added*/
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
                <QuestionLayout
                    onBack={() => setState("recipe_select")}
                    questions={questions}
                    onFinish={() => {
                        onFinish()}}> 
                    <SmallRecipeCard/>
                </QuestionLayout>
            </>
        );}


    //Component where user imputs how many members in their family
    const FamileSelect = () => {
        /*TODO: potencially change if other langs were added*/
        var questions = [{
            en: "How many people should we cook for?",
            es: "¿Para cuántas personas vamos a cocinar?",
            
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
            <QuestionLayout
                onBack={() => setState("recipe_select")}
                questions={questions}
                onFinish={() => {
                    setState("family_game")
                    return(<></>)}}>
                <div className={style.fs_aunt_container}>
                    <Image
                        priority={true}
                        layout="fill"
                        src={"/img/aunt_house/aunt_house_speaker.png"}
                    />
                </div>
            </QuestionLayout>
            
        )
    }

    
    //Renders screen depending on the state in quick Aunt is in
    switch(state) {
        case "intro_dialog" : //Intro dialog that introduces user to aunt game
            return (
                <Dialog 
                    scriptId={"aunt_intro"} 
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
                    scriptId={"aunt_outro"} 
                    onEnd={() => setState("end_choice")}/>)
                    
        case "end_choice" : //Screen where user can continue to play aunt or go to map
            return(
                <FinishScreen
                    lang={lang}
                    game_name={"aunt_house"}
                    restart_text={"recipe_select"}
                    handleRestart={() => setState("recipe_select")}/>);
    }    
} 