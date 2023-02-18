const dialog_scripts = {
    error: {
        stage: "ayu",
        lines: [
            {
                en:"Hi, if you're seeing this there was an error with the website's code. Click or press enter to go to the index page.",
                es:"Hola, please switch to english!",
            },
        ],
    },

    game_intro: {
        stage: "ayu",
        lines: [
            {
                en:"Hi, my name is Ayu and I am here to support you! Click or press enter to advance.",
                es:"Hola, mi nombre es Ayu y estoy aquí para apoyarte! Por favor haga clic o presione la tecla Enter para avanzar en el juego",
            },{
                en:"You can hover over me if you need support and you can click on me if you want to relax.",
                es:"Puedes mover el cursor sobre mí si necesitas apoyo y puedes hacer clic sobre mí si te quieres relajar.",
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
                en: "We had so much fun in the kitchen today!",
                es: "¡Nos divertimos mucho en la cocina hoy!",
            },{
                en: "All this food looks delicious, thank you for helping me in the kitchen today!",
                es: "Toda esta comida se ve deliciosa, ¡gracias por ayudarme en la cocina hoy!",
            },{
                en: "Please come back anytime.",
                es: "Por favor regresa cuando quieras.",
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
                en:"Slowly, let’s take three big belly breaths.",
                es:"Lentamente, tomemos tres respiraciones profundas.",
            }, {
                en:"Breathe in slowly through your nose for 4, 3, 2, 1\nBreathe out slowly through your mouth for 5, 4, 3, 2, 1",
                es:"Inhala lentamente por tu nariz 4, 3, 2, 1\Exhala lentamente por tu boca 5, 4, 3, 2, 1",
                stg: "ayuDeepBreathContinuous"
            },{
                en:"Breathe in slowly through your nose for 5, 4, 3, 2, 1\nBreathe out slowly through your mouth for 6, 5, 4, 3, 2, 1",
                es:"Inhala lentamente por tu nariz 5, 4, 3, 2, 1\Exhala lentamente por tu boca 6, 5, 4, 3, 2, 1"
            },{
                en:"Breathe in slowly through your nose for 6, 5, 4, 3, 2, 1\nBreathe out slowly through your mouth for 7, 6, 5, 4, 3, 2, 1",
                es:"Inhala lentamente por tu nariz 6, 5, 4, 3, 2, 1\Exhala lentamente por tu boca 7, 6, 5, 4, 3, 2, 1"
            }
        ],
    },
    
    ayu_relaxation_1: {
            stage: "ayu",
            lines:   [
            {
                en:"Let’s stretch our back muscles like a cat after a relaxing nap! breathe in and reach your arms up overhead then breathe out and relax your hands by your sides.",
                es:"Estiremos nuestros músculos de la espalda como un gato después de una siesta relajante! Inhala y levanta tus brazos por encima de tus cabeza, luego exhala y relaja tus manos a tus costados."
            }, {
                en:"Slowly breathe in and bring your shoulders up towards your head and when you breathe out push your head down into your shoulders.",
                es:"Lentamente inhala y levanta tus hombros hacia tu cabeza y cuando exhalas empuja tu cabeza para abajo hacia tus hombros.",
            },{
                en:"Now slowly breathe in and reach your shoulders up and back then breathe out and let your shoulders come back down, do this three times.",
                es:"Ahora inhala lentamente y levanta tus hombros hacia arriba y hacia atrás, luego exhala y deja que tus hombros vuelvan a bajar, haga esto tres veces.",
            },{
                en:"Imagine you have two juicy lemons in each hand. Begin to squeeze all the juice out of the lemons using your hands, your arms, your legs, your toes, and even your face. Squeeze and tense up every muscle in your body for 3…2…1… Then stop squeezing and release the tension in your whole body",
                es:"Imagina que tienes dos limones jugosos en cada mano. Comienza a exprimir todo el jugo del limón usando tus manos, tus brazos, tus piernas, tus dedos de los pies e incluso con tu cara. Aprieta y tensiona los músculos en tu cuerpo por 3…2…1… Despues deja de apretar y suelta toda la tensión en tu cuerpo."
            },{
                en:"Release the tension in your body and relax.",
                es:"Suelta la tensión en tu cuerpo y relájate"
            },
        ],
    },

    resturant_intro: {
        stage: "restaurant",
        no_speaker: true,
        lines: [
            {
                en: "Hey, I am so happy to see you here!",
                es: "¡Hola, estoy muy feliz de verte por aquí!"
            },{
                en: "Thanks for coming! Comida con Amor is my favorite restaurant!",
                es: "Gracias por venir! Comida con Amor es mi restaurante favorito!"
            },{
                en: "All right, let’s order some food!",
                es: "Vamos a pedir algo para comer!"
            },
        ]
    },

    resturant_outro: {
        stage: "restaurant",
        no_speaker: true,
        lines: [
            {
                en: "Wow, I’m so full!",
                es: "Guau, estoy muy satisfecha!"
            },{
                en: "The food was really good!",
                es: "Si, la comida estaba muy buena!",
                player_speaking: true,
            },{
                en: "It was! Let’s come again soon.",
                es: "Sí siempre, cuando quieras volvemos!"
            },{
                en: "Sure! I’ll see you later!",
                es: "¡Claro, nos vemos luego!",
                player_speaking: true,
            }
        ]
    }
    
}

export default dialog_scripts;