const recipes = [
    {
        name: {
            en: "Carrot-Orange Juice",
            es: "Jugo de zanahoria y naranja"
        },
        path: "o_c_juice",
        instructions: {
            en:"Blend the oranges and the carrots in a blender.",
            es:"Mezcle las naranjas y las zanahorias en la licuadora.",
        },
        serving_size: 1,
        serving_amount: {
            en: "1 Cup",
            es: "1 Vaso",
        },
        serving_of: {
            singular: {
                en: "cup of",
                es: "vaso"
            },
            plural: {
                en: "cups of",
                es: "vasosc",
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
                amount: 3
            },
            { 
                en: "oranges",
                es: "naranjas",
                question: {
                    en: "How many oranges",
                    es: "Cuántas naranjas"
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
                es: "porcione"
            },
            plural: {
                en: "servings of",
                es: "porciones",
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
                amount: 1
            },{ 
                en: "cup of chopped white onion",
                es: "taza de cebolla blanca picada",
                question: {
                    en: "How many cups of chopped white onion",
                    es: "Cuántas tazas de cebolla blanca picada"
                },
                amount: "1/2" 
            },{
                en: "cup chopped cilantro leaves and stems",
                es: "taza de cilantro picado",
                question: {
                    en: "How many cups of chopped cilantro leaves and stems",
                    es: "Cuántas tazas de hojas y tallos de cilantro picados"
                },
                amount: "1/2" 
            }, 
            {
                en: "cloves of garlic",
                es: "dientes de ajo",
                question: {
                    en: "How many cloves of garlic",
                    es: "Cuántos dientes de ajo"
                },
                amount: 2
            },{
                en: "tablespoon of fresh lime juice",
                es: "cucharada de jugo de limón",
                question: {
                    en: "How many tablespoons of fresh lime juice",
                    es: "Cuántas cucharadas de jugo de limón"
                },
                amount: 1 
            },{
                en: "Jalapeño or serrano peppers for spice (you can use whole for more heat if you want)",
                es: "Chiles jalapeños o serranos para especias (dependiendo de qué tan picante lo deseas)",
                amount: "1-2" 
            },{
                en: "bag of tortilla chips",
                es: "bolsa de chips de tortilla ",
                question: {
                    en: "How many bags of tortilla chips",
                    es: "Cuántas bolsas de chips de tortilla"
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
            en: "Black bean and Sweet Potato Enchilada",
            es: "Enchilada de Frijol Negro y Camote para Hacer",
        },
        path: "enchilada",
        instructions: {
            en:"Fill the tortillas with mashed black beans and sweet potatoes then roll up each tortilla into a singular tube. Pour the tomatillo sauce on top of the tortillas and then bake for 30 minutes at 350 degrees.",
            es:"Rellene las tortillas con puré de frijoles negros y batatas, luego enrolle cada tortilla en forma de tubito. Póngale la salsa de tomatillo encima de las tortillas y luego hornee por 30 minutos a 350 grados.",
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
                amount: 1
            },{ 
                en:"onion",
                es:"cebolla",
                question: {
                    en: "How much onions",
                    es: "Cuánta cebollas"
                },
                amount: "1/2"
            },{ 
                en: "cup of mashed sweet potato",
                es: "taza de puré de camote",
                question: {
                    en: "How many cups of mashed sweet potato",
                    es: "Cuántas tazas de puré de camote",
                },
                amount: 1
            },{ 
                en: "tortillas",
                es: "tortillas",
                question: {
                    en: "How many tortillas",
                    es: "Cuántas tortillas",
                },
                amount: 4
            },{ 
                en: "cup of tomatillo sauce",
                es: "taza de salsa de tomatillo",
                question: {
                    en: "How many cups of tomatillo sauce",
                    es: "Cuántas tazas de salsa de tomatillo"
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
            en: "Fruit Salad",
            es: "Ensalada de Frutas",
        },
        path:"fruit_salad",
        instructions: {
            en:"Cut the fruit into small pieces and serve in a bowl.",
            es:"Cortar la fruta en pedazos pequeños y servir en un bol.",
        },
        serving_size: 1,
        serving_amount: {
            en: "1 Bowl",
            es: "1 Tazón",
        },
        serving_of: {
            singular: {
                en: "bowl of",
                es: "tazón de"
            },
            plural: {
                en: "bowls of",
                es:"tazones de",
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
                amount: "1/4"
            },{ 
                en: "mango",
                es: "mango",
                question: {
                    en: "How much mango",
                    es: "Cuánto mango"
                },
                amount: "1/4"
            },{ 
                en: "cup of strawberries",
                es: "taza de fresas",
                question: {
                    en: "How many cups of strawberries",
                    es: "Cuántas tazas de fresas",
                },
                amount: "1/3"
            },{ 
                en: "kiwi",
                es: "kiwi",
                question: {
                    en: "How much kiwi",
                    es: "Cuánto kiwi"
                },
                amount: "1/2"
            },
        ],
        set_questions: [[3,1],[1,1],[2,2],[0,2],[3,2],[1,4]],
        family_questions: [0,3],
    }
]


export default recipes