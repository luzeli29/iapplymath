//TODO: DELETE THIS FILE as it is useless, PLEASE DONT ADD TO THIS FILE!


const dialog_scripts = {
    error: {
        stage: "ayu",
        lines: [
            {
                en:"Hi, if you're seeing this there was an error with the website's code. Click or press enter to go to the index page.",
                es:"Por favor cambia al idioma inglés, hubo un error con el código de la página",
            },
        ],
    },

    game_intro: {
        stage: "ayu",
        lines: [
            {
                en:"Hi, my name is Ayuda but all my friends call me Ayu. “Ayuda” means “help” in Spanish. I am here to help you during the game.",
                es:"Hola, mi nombre es Ayuda, pero puedes llamarme Ayu. Yo estoy aquí para ayudarte durante el juego.",
            },{
                
                en:"You can take a break from problem solving and find relaxation with your pet or with me, we are always there to support you.",
                es:"Puedes tomar un descanso de resolver problemas y encontrar relajación con tu mascota o conmigo, siempre estamos ahí para apoyarte.",
            },{
                en:"Math problems can be challenging, so we have built in some other game features to help you with solving math in your world.",
                es:"Los problemas de matemática pueden sentirse complicados y por eso hemos incorporado algunas otras características " +
                    "en este juego para ayudarte a resolver problemas matemáticos en tu mundo.",
            },{
                en: "You can use the game's calculator and turn music on or off anytime. Also, feel free to share how you feel or return to the map for a new adventure.",
                es: "Puedes usar la calculadora del juego y activar o desactivar la música en cualquier momento. Además, siéntete libre de compartir cómo te sientes o volver al mapa para una nueva aventura.",
            },{
                en: "The game will save your progress for your next visit, but you need to log out when you are done playing.",
                es: "El juego guardará tu progreso para tu próxima visita, pero debes cerrar tu sesión cuando termines de jugar.",
            },{
                en:"This game has different levels - Level 1 is for beginners, Level 2 is for advanced, and Level 3 is for experts.",
                es:"Este juego tiene diferentes niveles: el Nivel 1 es para principiantes, el Nivel 2 es para avanzados y el Nivel 3 es para expertos."
            },{
                en:"We know that soon you will be saying “I Apply Math in my World”",
                es:"Sabemos que pronto estarás diciendo “Yo Aplicó Matemáticas en mi Mundo”",
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
                es:"Tomemos tres respiraciones profundas lentamente.",
            }, {
                en:"Breathe in slowly through your nose for 4, 3, 2, 1\nBreathe out slowly through your mouth for 5, 4, 3, 2, 1",
                es:"Inhala lentamente por tu nariz 4, 3, 2, 1\nExhala lentamente por tu boca 5, 4, 3, 2, 1",
                stg: "ayuDeepBreathContinuous"
            },{
                en:"Breathe in slowly through your nose for 5, 4, 3, 2, 1\nBreathe out slowly through your mouth for 6, 5, 4, 3, 2, 1",
                es:"Inhala lentamente por tu nariz 5, 4, 3, 2, 1\nExhala lentamente por tu boca 6, 5, 4, 3, 2, 1",
                stg: "ayuDeepBreathContinuous"
            },{
                en:"Breathe in slowly through your nose for 6, 5, 4, 3, 2, 1\nBreathe out slowly through your mouth for 7, 6, 5, 4, 3, 2, 1",
                es:"Inhala lentamente por tu nariz 6, 5, 4, 3, 2, 1\nExhala lentamente por tu boca 7, 6, 5, 4, 3, 2, 1",
                stg: "ayuDeepBreathContinuous"
            }
        ],
    },
    
    ayu_relaxation_1: {
            stage: "ayu",
            lines:   [
            {
                en:"Let’s stretch our back muscles like a cat after a relaxing nap! breathe in and reach your arms up overhead then breathe out and relax your hands by your sides.",
                es:"¡Estiremos los músculos de la espalda como un gato después de una siesta relajante! Respira hondo y alza los brazos por encima de la cabeza, luego exhala y relaja tus manos a los costados."
            }, {
                en:"Slowly breathe in and bring your shoulders up towards your head and when you breathe out push your head down into your shoulders.",
                es:"Respira lentamente y eleva los hombros hacia la cabeza, y cuando exhales presiona la cabeza hacia los hombros."
            },{
                en:"Now slowly breathe in and reach your shoulders up and back then breathe out and let your shoulders come back down, do this three times.",
                es:"Ahora inhala lentamente y levanta tus hombros hacia arriba y hacia atrás, luego exhala y deja que tus hombros vuelvan a bajar, repite esto tres veces.",
            },{
                en:"Imagine you have two juicy lemons in each hand. Begin to squeeze all the juice out of the lemons using your hands, your arms, your legs, your toes, and even your face. Squeeze and tense up every muscle in your body for 3…2…1… Then stop squeezing and release the tension in your whole body",
                es:"Imagina que tienes dos limones jugosos en cada mano. Comienza a exprimir todo el jugo del limón usando tus manos, tus brazos, tus piernas, tus dedos de los pies, incluso con tu cara. Aprieta y tensa los músculos en tu cuerpo por 3…2…1… Despues deja de apretar y suelta toda la tensión en tu cuerpo."
            },{
                en:"Release the tension in your body and relax.",
                es:"Suelta la tensión en tu cuerpo y relájate"
            },
        ],
    },

    resturant_intro: {
        stage: "restaurant",
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
        lines: [
            {
                en: "Wow, I’m so full!",
                es: "Guau, estoy muy satisfecha!"
            },{
                en: "The food was really good!",
                es: "La comida estaba muy buena!",
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
    },

    school_intro: {
        stage: "school",
        lines: [
            {
                en: 'Welcome to Ms. Garcia’s math classroom!',
                es: '¡Bienvenidos a la clase de matemáticas de la Sra. García!'
            },
            {
                en: 'At the end of the year we have a very fun math contest in my class.',
                es: 'Al final del año tendremos un concurso de matemáticas muy divertido.'
            },
            {
                en: 'Here you can practice multiplying, dividing, adding, and subtracting numbers!',
                es: '¡Aquí puedes practicar la multiplicación, división, suma y resta de números!'
            },
            {
                en: 'Math can be challenging sometimes, so do your best and take a break when you need to. I know you can do it!',
                es: 'Las matemáticas pueden ser desafiantes a veces, así que haz tu mejor esfuerzo y tómate un descanso cuando lo necesites. ¡¡Sé que puedes hacerlo!!'
            },
        ]
    },

    school_outro: {
        stage: "school",
        lines: [
            {
                en: 'Thank you for practicing math with me today, you were amazing!',
                es: 'Gracias por practicar matemáticas conmigo hoy, ¡estuvo increíble!'
            },
            {
                en: 'You are going to do awesome on your test!',
                es: '¡Te va  a ir súper bien en tu prueba!'
            },
            
        ]
    },
    stadium_intro: {
        stage: "stadium",
        lines: [
            {
                en: "Hey, welcome to the stadium!",
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

    stadium_outro: {
        stage: "sradium",
        lines: [
            {
                en: "Wow, I’m so full!",
                es: "Guau, estoy muy satisfecha!"
            },{
                en: "The food was really good!",
                es: "La comida estaba muy buena!"
            },{
                en: "It was! Let’s come again soon.",
                es: "Sí siempre, cuando quieras volvemos!"
            },{
                en: "Sure! I’ll see you later!",
                es: "¡Claro, nos vemos luego!"
            }
        ]
    },
    
}

export default dialog_scripts;