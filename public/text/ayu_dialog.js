
const dialog = {
    en: {
        intro_page: [
            "Hi, my name is Ayu!",
            "Click or press enter to advance.",
            "You can hover over me if you need help or encouragement.",
            //TODO: add fullscreen or remove dialog
            "For all math questions, just type your answer with your keyboard. And if you ever want to exit full screen, hit the escape key.",
            //TODO: add quit button or remove dialog 
            "At any time during the game, press the QUIT button in the top right corner to return to the Main Menu.",
            ],
    },
    es: {
        intro_page: [
            "Hola, mi nombre es Ayu y estoy aquí para ayudarte!",
            "Por favor haga clic o presione la tecla Enter para avanzar en el juego",
            "Puedes mover el cursor sobre mí si necesitas ayuda o apoyo.",
            "Para todas las preguntas de matemáticas, simplemente escribe tu respuesta usando el teclado. Y si quieres salir de la pantalla por completo, presiona la tecla Escape.",
            "En cualquier momento durante el juego, puedes presionar el botón SALIR en la esquina superior derecha para volver al menú principal.",
        ],
    },
    tags: {
        // index - line number - 1 
        //dialog_tags[0] - image tag
        //dialog_tags[1] - function tag
        intro_page: {
            4: ["","TO_AVATAR"],
        }
    }
  };
  


  export default dialog;