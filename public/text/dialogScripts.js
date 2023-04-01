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
                en:"Hi, my name is Ayuda but all my friends call me Ayu. “Ayuda” means “help” in Spanish.",
                es:"Hola, mi nombre es Ayuda pero mis amistades me llaman Ayu. “Ayuda” significa “help” en inglés.",
            },{
                en:"I am here to help you during the game. If you need a break from solving problems, pet me and I will be there to help you relax. ",
                es:"Yo estoy aquí para ayudarte durante el juego. Si necesitas un descanso mientras resuelves problemas, acaríciame y allí estaré " +
                    "para ayudarte a relajar.",
            },{
                en:"You can also click on your pet to get support while you are finding solutions.",
                es:"También puedes hacer clic sobre tu mascota para que te apoye mientras consigues tus soluciones.",
            },{
                en:"Math problems can be challenging, so we have built in some other game features to help you with solving math in your world.",
                es:"Los problemas de matemática pueden sentirse complicados y por eso hemos incorporado algunas otras características " +
                    "en este juego para ayudarte a resolver problemas matemáticos en tu mundo.",
            },{
                en:"We know that soon you will be saying “I Apply Math in my World”",
                es:"Sabemos que pronto estarás diciendo “Yo Aplicó Matemáticas en mi Mundo”",
            },{
                en: "The game has a calculator that you can use at any time." +
                    "The music can be turned on or off whenever you want.",
                es: "El juego tiene una calculadora que puedes usar en cualquier momento." +
                    "La música se puede apagar y prender cuando tú quieras.",
            },{
                en: "The game will save your progress for your next visit, but you need to log out when you are done playing.",
                es: "El juego guardará tu progreso para tu próxima visita, pero debes cerrar tu sesión cuando termines de jugar.",
            },{
                en: "At any point during the game you can tell us how you feel." +
                    "You can also return to the map if you’d like to go on a different adventure.",
                es: "En cualquier momento durante el juego nos puedes decir cómo te sientes." +
                    "También puedes volver al mapa si deseas intentar una aventura diferente.",
            },{
                en:"This game has different levels (Level 1, Level 2 and Level 3) Level 1 is for beginners, " +
                    "Level 2 is for advanced, and Level 3 is for experts. ",
                es:"Este juego tiene diferentes niveles (Nivel 1, Nivel 2 y Nivel 3) El Nivel 1 es para principiantes, " +
                    "el Nivel 2 es para avanzados y el Nivel 3 es para expertos.",
            }
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
                es:"Inhala lentamente por tu nariz 5, 4, 3, 2, 1\Exhala lentamente por tu boca 6, 5, 4, 3, 2, 1",
                stg: "ayuDeepBreathContinuous"
            },{
                en:"Breathe in slowly through your nose for 6, 5, 4, 3, 2, 1\nBreathe out slowly through your mouth for 7, 6, 5, 4, 3, 2, 1",
                es:"Inhala lentamente por tu nariz 6, 5, 4, 3, 2, 1\Exhala lentamente por tu boca 7, 6, 5, 4, 3, 2, 1",
                stg: "ayuDeepBreathContinuous"
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
                en: "Thanks for coming! Delicia is my favorite restaurant!",
                es: "¡Gracias por venir! ¡Delicia es mi restaurante favorito!"
            },{
                en: "All right, let’s explore their menu. I heard the menu changes every time you visit!",
                es: "Exploremos el menú. ¡Escuché que el menú cambia cada vez que visitas!"
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