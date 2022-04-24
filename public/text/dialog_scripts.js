const dialog_scripts = {
    game_intro: {
        stage: "ayu",
        lines: [
            {
                en:"Hi, my name is Ayu! Click or press enter to advance.",
                es:"Hola, mi nombre es Ayu y estoy aquí para ayudarte! Por favor haga clic o presione la tecla Enter para avanzar en el juego",
            },{
                en:"You can hover over me if you need help or encouragement.",
                es:"Puedes mover el cursor sobre mí si necesitas ayuda o apoyo.",
            },{
                en:"For all math questions, just type your answer with your keyboard.",
                es:"Para todas las preguntas de matemáticas, simplemente escribe tu respuesta usando el teclado.",
            },
        ],
    },

    aunt_intro: {
        stage: "aunt_house",
        lines: [
            {
                en:"Welcome to my kitchen, I am so happy to see you here!",
                es:"¡Bienvenidos a mi cocina, estoy muy feliz de verte aquí!",
            }
        ],
    },

    aunt_outro: {
        stage: "aunt_house",
        lines:  [
            {
                en: "We had so much fun in the kitchen!",
                es: "¡Nos divertimos mucho en la cocina!",
            },{
                en: "All this food looks delicious, thank you for helping me in the kitchen today!",
                es: "Toda esta comida se ve deliciosa, ¡gracias por ayudarme en la cocina hoy!",
            },{
                en: "Come back anytime.",
                es: "Regresa cuando quieras.",
            },{
                en: "Thanks, Tia Maria. I’ll see you later!",
                es: "Gracias, Tía María. ¡Te veo luego!",
                player_speaking: true,
            },
        ],
    },
   
    ayu_relaxation_0: {
        stage: "ayu",
        lines:   [
        
            {
                en:"Let’s take three big belly breaths.",
                es:"Tomemos tres respiraciones profundas."
            }, {
                en:"Breathe in slowly for 4, 3, 2, 1\nBreathe out slowly for 5, 4, 3, 2, 1",
                es:"Inhala lentamente por 4, 3, 2, 1\Exhala lentamente por 5, 4, 3, 2, 1"
            },{
                en:"Breathe in slowly for 5, 4, 3, 2, 1\nBreathe out slowly for 6, 5, 4, 3, 2, 1",
                es:"Inhala lentamente por 5, 4, 3, 2, 1\Exhala lentamente por 6, 5, 4, 3, 2, 1"
            },{
                en:"Breathe in slowly for 6, 5, 4, 3, 2, 1\nBreathe out slowly for 7, 6, 5, 4, 3, 2, 1",
                es:"Inhala lentamente por 6, 5, 4, 3, 2, 1\Exhala lentamente por 7, 6, 5, 4, 3, 2, 1"
            }
        ],
    },
    
    ayu_relaxation_1: {
            stage: "ayu",
            lines:   [
            {
                en:"Let’s stretch our muscles like a cat after a relaxing nap.",
                es:"Estiremos nuestros músculos como un gato después de una siesta relajante."
            }, {
                en:"Slowly bring your shoulders up towards your head and push your head down into your shoulders 5, 4, 3, 2, 1.",
                es:"Levante lentamente los hombros hacia la cabeza y empuje la cabeza hacia abajo contra los hombros 5, 4, 3, 2, 1.",
            },{
                en:"Now slowly let your shoulders relax and come down and back 5, 4, 3, 2, 1 and arch your back to stretch like a cat, 5, 4, 3, 2, 1.",
                es:"Ahora deja que tus hombros se relajen lentamente y baje y retroceda 5, 4, 3, 2, 1 y arquee la espalda para estirarse como un gato, 5, 4, 3, 2, 1.",
            },{
                en:"Imagine you have two juicy lemons in both your hands. Begin to squeeze all the juice out of the lemon with your hands, your arms, your legs, your toes, and even your face. Squeeze and tense up every muscle in your body for 3…2…1…",
                es:"Imagina que tienes dos limones jugosos en ambas manos. Comienza a exprimir todo el jugo del limón con las manos, los brazos, las piernas, los dedos de los pies e incluso con la cara. Aprieta y tensiona los músculos en tu cuerpo por 3…2…1…"
            },{
                en:"Release the tension in your body and relax.",
                es:"Libera la tensión en tu cuerpo y relájate"
            },
        ],
    },
    
}

export default dialog_scripts;