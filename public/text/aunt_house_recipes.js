const recipes = [
    {
        name: {
            en: "Carrot-Orange Juice",
            es: "Jugo de zanahoria y naranja"
        },
        path: "orange_carrot_juice",
        instructions: {
            en:"Blend the oranges and the carrots in a blender.",
            es:"Mezcla las naranjas y las zanahorias en la licuadora.",
        },
        serving_size: 1,
        serving_amount: {
            en: "1 Cup",
            es: "1 Vaso",
        },
        serving_of: {
            singular: {
                en: "cup of",
                es: "vaso de"
            },
            plural: {
                en: "cups of",
                es: "vasos de",
            }
        },
        ingredients: [
            {   
                en: "carrots",
                es: "zanahorias",
                question: {
                    en: "How many carrots",
                    es: "Cuántas zanahorias"
                },
                amount: 3,
                img: "carrots.png",
            },
            { 
                en: "oranges",
                es: "naranjas",
                question: {
                    en: "How many oranges",
                    es: "Cuántas naranjas"
                },
                amount: 2,
                img: "oranges.png",

            },

        ],
        set_questions: [[-1,1],[-1,2]],
        family_questions: [-1],
    }, {
        name: {
            en: "Tomatillo sauce and tortilla chips",
            es: "Salsa de tomatillo con chips de tortilla",
        },
        path:"tomatillo_chips",
        instructions: {
            en:"Put ingredients for the sauce in a blender. Pour the tomatillo sauce in a bowl with tortilla chips.",
            es:"Ponga todos los ingredientes para la salsa en una licuadora.",
        },
        serving_size: 6,
        serving_amount: {
            en: "6 Servings",
            es: "6 Porciones",
        },
        serving_of: {
            singular: {
                en: "serving of",
                es: "porción de"
            },
            plural: {
                en: "servings of",
                es: "porciones de",
            }
        },
        ingredients: [
            {   
                en: "pound of tomatillos",
                es: "libra de tomatillos",
                question: {
                    en: "How many pounds of tomatillos",
                    es: "Cuántas libras de tomatillos"
                },
                amount: 1,
                img: "tomatillo.png"
            },{ 
                en: "cup of chopped white onion",
                es: "taza de cebolla blanca picada",
                question: {
                    en: "How many cups of chopped white onion",
                    es: "Cuántas tazas de cebolla blanca picada"
                },
                amount: "1/2",
                img: "onions.png"
            },{
                en: "cup chopped cilantro",
                es: "taza de cilantro picado",
                question: {
                    en: "How many cups of chopped cilantro",
                    es: "Cuántas tazas de cilantro picado"
                },
                amount: "1/2",
                img: "cilantro.png"
            }, 
            {
                en: "cloves of garlic",
                es: "dientes de ajo",
                question: {
                    en: "How many cloves of garlic",
                    es: "Cuántos dientes de ajo"
                },
                amount: 2,
                img: "garlic.png"
            },{
                en: "tablespoon of fresh lime juice",
                es: "cucharada de jugo de limón",
                question: {
                    en: "How many tablespoons of fresh lime juice",
                    es: "Cuántas cucharadas de jugo de limón"
                },
                amount: 1,
                img: "lime.png"
            },/*{
                en: "Jalapeño or serrano peppers for spice (you can use whole for more heat if you want)",
                es: "Chiles jalapeños o serranos para especias (dependiendo de qué tan picante lo deseas)",
                amount: "1-2" 
            },*/{
                en: "bag of tortilla chips",
                es: "bolsa de chips de tortilla ",
                question: {
                    en: "How many bags of tortilla chips",
                    es: "Cuántas bolsas de chips de tortilla"
                },
                amount: 1,
                img: "tortillas.png"

            },/*{
                en: "Salt and spices to taste",
                es: "Sal y especias al gusto",
                amount: "" 
            }*/
            
        ],
        set_questions: [[3,6],[3,3],[1,3],[4,3],[2,3]],
        family_questions: [0,2]
    },{
        name: {
            en: "Black bean and Sweet Potato Enchilada",
            es: "Enchilada de Frijol Negro y Papa Dulce",
        },
        //TODO: make a enchilada image to replace burrito
        path: "burritos",
        instructions: {
            en:"Fill the tortillas with mashed black beans and sweet potatoes then roll up each tortilla into a singular tube. Pour the tomatillo sauce on top of the tortillas and then bake for 30 minutes at 350 degrees.",
            es:"Rellene las tortillas con puré de frijoles negros y papa dulce, luego enrolle cada tortilla en forma de tubito. Póngale la salsa de tomatillo encima de las tortillas y luego hornee por 30 minutos a 350 grados.",
        },
        serving_size: 2,
        serving_amount: {
            en: "4 Enchiladas",
            es: "4 Enchiladas",
        },
        serving_of: {
            singular: {
                en: "",
                es: "",
            },
            plural: {
                en: "people to each eat 2",
                es: "personas para que cada una coma 2",
            }
        },
        ingredients: [
            { 
                en:"cup of mashed black beans",
                es:"taza de puré de frijoles negros",
                question: {
                    en: "How many cups of mashed black beans",
                    es: "Cuántas tazas de puré de frijoles negros"
                },
                amount: 1,
                img: "black_beans.png"

            },{ 
                en:"onion",
                es:"cebolla",
                question: {
                    en: "How much onions",
                    es: "Cuánta cebollas"
                },
                amount: "1/2",
                img: "onions.png"

            },{ 
                en: "cup of mashed sweet potato",
                es: "taza de puré de papa dulce",
                question: {
                    en: "How many cups of mashed sweet potato",
                    es: "Cuántas tazas de puré de papa dulce",
                },
                amount: 1,
                img: "mashed_sweet_potato.png"

            },{ 
                en: "tortillas",
                es: "tortillas",
                question: {
                    en: "How many tortillas",
                    es: "Cuántas tortillas",
                },
                amount: 4,
                img: "tortillas.png"

            },{ 
                en: "cup of tomatillo sauce",
                es: "taza de salsa de tomatillo",
                question: {
                    en: "How many cups of tomatillo sauce",
                    es: "Cuántas tazas de salsa de tomatillo"
                },
                amount: "1/4",
                img: "tomatillo_sauce.png",
            },{ 
                en: "Salt and spices to taste",
                es: "Sal y especias al gusto",
                amount: "",
                img: "salt_pepper.png"
            },],
        set_questions: [[1,4],[0,4],[1,8],[1,2],[0,4]],
        family_questions: [3,0]
    },{
        name: {
            en: "Fruit Salad",
            es: "Ensalada de Frutas",
        },
        path:"fruit_salad",
        instructions: {
            en:"Cut the fruit into small pieces and serve on a plate.",
            es:"Corte la fruta en pedazos pequeños y servir en un plato.",
        },
        serving_size: 1,
        serving_amount: {
            en: "1 plate",
            es: "1 plato",
        },
        serving_of: {
            singular: {
                en: "plate of",
                es: "plato de"
            },
            plural: {
                en: "plates of",
                es:"platos de",
            }
        },
        ingredients: [
            {
                en: "papaya",
                es: "papaya",
                question: {
                    en: "How much papaya",
                    es: "Cuánta papayas"
                },
                amount: "1/4",
                img: "papaya.png",
            },{ 
                en: "mango",
                es: "mango",
                question: {
                    en: "How much mango",
                    es: "Cuánto mango"
                },
                amount: "1/4",
                img: "mango.png",
            },{ 
                en: "cup of strawberries",
                es: "taza de fresas",
                question: {
                    en: "How many cups of strawberries",
                    es: "Cuántas tazas de fresas",
                },
                amount: "1/3",
                img: "strawberry.png",
            },{ 
                en: "kiwi",
                es: "kiwi",
                question: {
                    en: "How much kiwi",
                    es: "Cuánto kiwi"
                },
                amount: "1/2",
                img: "kiwi.png",
            },
        ],
        set_questions: [[3,1],[1,1],[2,2],[0,2],[3,2],[1,4]],
        family_questions: [0,3],
    }
]


export default recipes