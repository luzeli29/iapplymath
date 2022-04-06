import React, {useState} from 'react';
import DialogScreen from '../../dialog_screen';
import ContextWrapper, {useWrapperContext} from '../../../context/context'
import GameLayout from '../game_layout'
import style from './aunt.module.css'
import Image from 'next/image'


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

    const generateQuestionText = (ing, num) => {
        return {
            en: ing.question.en + " to serve " + num + " people",
            es:""
        }
    }

    //generates the propper question JS object to be read by GameLayout
    const generateQuestion = (ing, num) => {
        var answer
        if(isNaN(ing.amount)) {
            //ing.amount is not a number
            var ingAmount = ing.amount.split("/")
            answer = getSimpleFraction((ingAmount[0] * num),ingAmount[1] * recipe.serving_size)
        } else {
            //ing.amount is a number
            answer = getSimpleFraction((ing.amount * num),recipe.serving_size)
        }

        return ([{
            t: generateQuestionText(ing,num),
            answer:answer,
            //TODO: Generate hint, convert hints to array of components :(
            hint: [{
                en: "equation",
                es: "equation"
            },{
                en: "equation with answer",
                es: "equation with answer",
            }],
        }].concat(feedback))
    }

    //Recipe card component for recipe card screen
    const RecipeCard = () => {
        return(
            <>
                <p>{recipe.name[lang]}</p>
                {recipe.ingredients.map((ing) => {
                    return(
                    <p key={ing[lang]}>
                        {ing.amount == "" ? ing[lang] : ing.amount + " " + ing[lang]}
                    </p>);})}
                <button onClick={() => setState("basic_game")}>Cook!</button>
            </>);}
    
    //Recipe selection component... allows user to select which recipe they want
    const RecipeSelect = () => {
        return(
            <>
                {/* TODO: Translate this */}
                <button className={style.back_to_map}onClick={() => backToMap()}><b>Back to Map</b></button>
                <p className={style.recipe_select_text}><b>Which recipe would you like to cook?</b></p>
                <table className={style.recipe_select_table}>
                    <tbody>
                        <tr>
                    {recipes.map((x) => {
                        return(
                            <td className={style.recipe_select_box}>
                                <button 
                                    key={x.name.en}
                                    onClick={() => {
                                        setRecipe(x);
                                        setState("recipe_card");
                                    }}>
                                        <div className={style.center}>
                                        <Image
                                            height={150}
                                            width={150}

                                            src="/img/aunt/tempRecipe.png"
                                        />
                                        </div>
                                </button>
                                </td>
                            )})}
                            </tr>
                    </tbody>
                </table>
                
            </>)}
    
    //Small recipe card component to be shown in GameLayout
    const SmallRecipeCard = () => {
        return(
            <>
                <p>{recipe.name[lang]}</p>
                {recipe.ingredients.map((ing) => {
                                return(
                                    <p key={ing[lang]}>{ing.amount + " " + ing[lang]}</p>
                                );
                })}
            </>
        );}
    
    //Renders game screen with given recipe, multiples to test and function when finished with questions
    const GameScreen = ({questionType,onFinish}) => {
        //Generate questions to asked
        var questions = [];
        if(questionType == "basic") {
            //basic questions
            recipe.set_questions.map((x) => {
                if(x[0] == -1) {
                    //do question on every ingredient with given multiple
                    recipe.ingredients.map((ing) => {
                        questions = questions.concat(generateQuestion(ing, x[1]))
                    })
                } else {
                    //do question with given ing and multiple
                    questions = questions.concat(generateQuestion(recipe.ingredients[x[0]], x[1]))
                }
                //goes through every ingredient for every multiple
            })
        } else {
            //family questions
            recipe.family_questions.map((x) => {
                if(x == -1) {
                    //do question on every ingredient
                    recipe.ingredients.map((ing) => {
                        questions = questions.concat(generateQuestion(ing, familySize))
                    })
                } else {
                    questions = questions.concat(generateQuestion(recipe.ingredients[x], familySize))

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
            t: {
                en: "How many people should we cook for?",
                es: "¿Para cuántas personas vamos a cocinar?",
            },
            
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
                {/*TODO: Create Aunt component */}
            </GameLayout>
            
        )
    }

    //Component where user can continue playing aunts or go to map
    const EndChoice = () => {
        return (
            <>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <button onClick={() => backToMap()}>Map</button>
                                <button onClick={() => setState("recipe_select")}>Recipe Select</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }

    //Renders screen depending on the state in quick Aunt is in
    const render = () => {
        switch(state) {
            case "intro_dialog" : //Intro dialog that introduces user to aunt game
                return (
                    <DialogScreen 
                        stage={"aunt_house"} 
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
                    <DialogScreen 
                        stage={"aunt_house"} 
                        scriptId={"aunt_outro"} 
                        onEnd={() => setState("end_choice")}/>)
                        
            case "end_choice" : //Screen where user can continue to play aunt or go to map
                return(<EndChoice/>);
        }
    }

    return (
            <>
                {render()}
            </>
    );
} 

const feedback = [ {
    t: {
        en: "Great Job! Press the checkmark button to continue.",
        es:"¡Muy bien! Pulse el botón de marca de verificación para continuar.",
    },
    
    answer: ""
}]




const getSimpleFraction = (number,denomin) => {
    if((number/denomin)% 1 == 0) {
        return number/denomin
    } else {
        var gcd = function gcd(a,b){
            return b ? gcd(b, a%b) : a;
          };
          gcd = gcd(number,denomin);
          return number/gcd + "/" + denomin/gcd;
    }
}

const recipes = [
    {
        name: {
            en: "Carrot-Orange Juice",
            es: "Jugo de zanahoria y naranja"
        },
        instructions: {
            en:"Blend the oranges and the carrots in a blender.",
            es:"Mezcle las naranjas y las zanahorias en la licuadora.",
        },
        serving_size: 1,
        ingredients: [
            {   
                en: "carrots",
                es: "zanahorias",
                question: {
                    en: "carrots",
                    es: "zanahorias"
                },
                amount: 3
            },
            { 
                en: "oranges",
                es: "naranjas",
                question: {
                    en: "oranges",
                    es: "naranjas"
                },
                amount: 2
            },

        ],
        set_questions: [[-1,1],[-1,2]],
        family_questions: [-1],
    }, {
        name: {
            en: "Tomatillo sauce and tortilla chips",
            es: "Salsa de tomatillo con chips de tortilla",
        },
        instructions: {
            en:"Put ingredients for the sauce in a blender. Pour the tomatillo sauce in a bowl with tortilla chips.",
            es:"Ponga todos los ingredientes para la salsa en una licuadora.",
        },
        serving_size: 6,
        ingredients: [
            {   
                en: "pound of tomatillos",
                es: "libra de tomatillos",
                question: {
                    en: "pounds of tomatillos",
                    es: "libras de tomatillos"
                },
                amount: 1
            },{ 
                en: "cup of chopped white onion",
                es: "taza de cebolla blanca picada",
                question: {
                    en: "cups of chopped white onion",
                    es: "tazas de cebolla blanca picada"
                },
                amount: "1/2" 
            },{
                en: "cup chopped cilantro leaves and stems",
                es: "taza de cilantro picado",
                question: {
                    en: "cups chopped cilantro leaves and stems",
                    es: "tazas de hojas y tallos de cilantro picados"
                },
                amount: "1/2" 
            }, 
            {
                en: "cloves of garlic",
                es: "dientes de ajo",
                question: {
                    en: "cloves of garlic",
                    es: "dientes de ajo"
                },
                amount: 2
            },{
                en: "tablespoon of fresh lime juice",
                es: "cucharada de jugo de limón",
                question: {
                    en: "tablespoons of fresh lime juice",
                    es: "cucharadas de jugo de limón"
                },
                amount: 1 
            },{
                en: "jalapeño or serrano peppers for spice (you can use whole for more heat if you want)",
                es: "chiles jalapeños o serranos para especias (dependiendo de qué tan picante lo deseas)",
                amount: "1-2" 
            },{
                en: "bag of tortilla chips",
                es: "bolsa de chips de tortilla ",
                question: {
                    en: "bags of tortilla chips",
                    es: "bolsas de chips de tortilla"
                },
                amount: 1 
            },{
                en: "Salt and spices to taste",
                es: "Sal y especias al gusto",
                amount: "" 
            }
            
            ],

        set_questions: [[3,6],[3,3],[1,3],[4,3],[2,3]],
        family_questions: [0,2]
    },{
        name: {
            en: "Black bean and sweet potato enchilada",
            es: "Enchilada de frijol negro y camote para hacer",
        },
        instructions: {
            en:"Fill the tortillas with mashed black beans and sweet potatoes then roll up each tortilla into a singular tube. Pour the tomatillo sauce on top of the tortillas and then bake for 30 minutes at 350 degrees.",
            es:"Rellene las tortillas con puré de frijoles negros y batatas, luego enrolle cada tortilla en forma de tubito. Póngale la salsa de tomatillo encima de las tortillas y luego hornee por 30 minutos a 350 grados.",
        },
        serving_size: 4,
        ingredients: [
            { 
                en:"cup of mashed black beans",
                es:"taza de puré de frijoles negros",
                question: {
                    en: "cups of mashed black beans",
                    es: "tazas de puré de frijoles negros"
                },
                amount: 1
            },{ 
                en:"onion",
                es:"cebolla",
                question: {
                    en: "onions",
                    es: "cebollas"
                },
                amount: "1/2"
            },{ 
                en: "cup of mashed sweet potato",
                es: "taza de puré de camote",
                question: {
                    en: "cups of mashed sweet potato",
                    es: "tazas de puré de camote",
                },
                amount: 1
            },{ 
                en: "tortillas",
                es: "tortillas",
                question: {
                    en: "tortillas",
                    es: "tortillas",
                },
                amount: 4
            },{ 
                en: "cup of tomatillo sauce",
                es: "taza de salsa de tomatillo",
                question: {
                    en: "cups of tomatillo sauce",
                    es: "tazas de salsa de tomatillo"
                },
                amount: "1/4"
            },{ 
                en: "Salt and spices to taste",
                es: "Sal y especias al gusto",
                amount: ""
            },],

        set_questions: [[1,4],[0,4],[1,8],[1,2],[0,4]],
        family_questions: [3,0]
    },{
        name: {
            en: "Fruit salad",
            es: "Ensalada de frutas",
        },
        serving_size: 1,
        ingredients: [
            {
                en: "papaya",
                es: "papaya",
                question: {
                    en: "papayas",
                    es: "papayas"
                },
                amount: "1/4"
            },{ 
                en: "mango",
                es: "",
                question: {
                    en: "mango",
                    es: ""
                },
                amount: "1/4"
            },{ 
                en: "cup of strawberries",
                es: "",
                question: {
                    en: "cup of strawberries",
                    es: ""
                },
                amount: "1/3"
            },{ 
                en: "kiwi",
                es: "",
                question: {
                    en: "kiwi",
                    es: ""
                },
                amount: "1/2"
            },
        ],

        set_questions: [[3,1],[1,1],[2,2],[0,2],[3,2],[1,4]],
        family_questions: [0,3]
    }
]