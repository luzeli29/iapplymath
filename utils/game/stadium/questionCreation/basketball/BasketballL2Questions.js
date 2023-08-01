import DevErr from "@utils/debug/devErr"
import createGameQuestion, { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion"
import simplifyFraction from "@utils/game/quiz/simplifyFraction";

const BasketballL2Questions = (questions,randomGenerator) => {
    const { randomInt } = randomGenerator;

    try{
        const q1Arr1 = [200, 216, 256, 272, 328, 376,400]
        const q1Arr2 = ['1/2','1/4' , '3/4', '1/8', '3/8']
        const q1Num1 = q1Arr1[randomInt(0, q1Arr1.length - 1)]
        const q1Num2 = q1Arr2[randomInt(0, q1Arr2.length - 1)]
        const q1Answer = q1Num1 - (q1Num1 * eval(q1Num2))
        questions.push(createGameQuestion(
            {
                en:'A total number of '+q1Num1+' fans came to the basketball arena to watch you play. If '+q1Num2+' of all fans are wearing blue shirts, how many fans are wearing other colors?',
                es:'Un total de '+q1Num1+' fanáticos vinieron a la arena de baloncesto para verte jugar. Si '+q1Num2+' de todos los fanáticos llevan camisas azules, ¿cuántos fanáticos llevan otros colores?'
            },
            q1Answer,
            [
                {
                    en:'Fans wearing blue = total fans * fraction of fans wearing blue\nFans wearing other colors = total fans – fans wearing blue',
                    es:'Fanáticos que usan azul = fanáticos totales * fracción de fanáticos que usan azul\nFanáticos que usan otros colores = fanáticos totales - fanáticos que usan azul'
                },{
                    en:'Fans wearing blue = '+q1Num1+' * '+q1Num2+' = ""\nFans wearing other colors = '+q1Num1+' – "x" = ' + q1Answer,
                    es:'Fanáticos que usan azul = '+q1Num1+' * '+q1Num2+' = ""\nFanáticos que usan otros colores = '+q1Num1+' - "x" = ' + q1Answer
                }
            ],
            "wholeNumber",
            null,
            null
        ));

        const q2Num1 = randomInt(30,51)
        const q2Num2 = randomInt(q2Num1,61)
        const q2Answer = simplifyFraction(q2Num2 - q2Num1,q2Num2)
        questions.push(createGameQuestion(
            {
                en:'Your favorite basketball team won '+q2Num1+' games out of '+q2Num2+'. What fraction of the games did your favorite team lose? Simplify your answer!',
                es:'Tu equipo de baloncesto favorito ganó '+q2Num1+' juegos de '+q2Num2+'. ¿Qué fracción de los juegos perdió tu equipo favorito? ¡Simplifica tu respuesta!'
            },
            q2Answer,
            [
                {
                    en:'Games lost = total games – total games won\nFraction lost games = games lost / total games',
                    es:'Juegos perdidos = juegos totales - juegos ganados totales\nFracción de juegos perdidos = juegos perdidos / juegos totales'
                },
                {
                    en:'Games lost = '+q2Num2+' – '+q2Num1+' = “x”\nFraction lost games = “x” / '+q2Num2+' = ' + q2Answer,
                    es:'Juegos perdidos = '+q2Num2+' - '+q2Num1+' = "x"\nFracción de juegos perdidos = "x" / '+q2Num2+' = ' + q2Answer
                },
            ],
            "fraction",
            null,
            null
        ));

        //TODO: Question 3

        const q4Num1 = randomInt(10,21)
        const q4Num2 = randomInt(10,21)
        const q4Answer = q4Num1*q4Num2
        questions.push(createGameQuestion(
            {
                en:'To enter the basketball arena you must go through security. The arena’s safety policy says that your bag must be equal to or less than '+q4Num1+' inches long and '+q4Num2+' inches wide. If your bag is rectangular, what is the largest possible area for your bag to be allowed in the arena?',
                es:'Para ingresar a la arena de baloncesto, debe pasar por seguridad. La política de seguridad de la arena dice que su bolso debe ser igual o menor a '+q4Num1+' pulgadas de largo y '+q4Num2+' pulgadas de ancho. Si su bolso es rectangular, ¿cuál es el área más grande posible para que su bolso sea permitido en la arena?'
            },
            q4Answer,
            [
                {
                    en:'Area = L * W',
                    es:'Área = L * W'
                },
                {
                    en:'Area = '+q4Num1+' * '+q4Num2+' = ' + q4Answer,
                    es:'Área = '+q4Num1+' * '+q4Num2+' = ' + q4Answer
                },
            ],
            "wholeNumber",
            null,
            null
        ));

        const q5Num1 = randomInt(10,13)
        const q5Num2 = randomInt(2,7)
        const q5Answer = q5Num1*q5Num2*4*60
        questions.push(createGameQuestion(
            {
                en:'An official basketball game is usually played for 4 quarters. If each quarter lasts '+q5Num1+' minutes, how many seconds will it take to play '+q5Num2+' full games? Hint: 1 minute = 60 seconds.',
                es:'Un juego oficial de baloncesto generalmente se juega durante 4 cuartos. Si cada cuarto dura '+q5Num1+' minutos, ¿cuántos segundos se tardará en jugar '+q5Num2+' juegos completos? Pista: 1 minuto = 60 segundos.'
            },
            q5Answer,
            [
                {
                    en:'Total time per game = time for 1 quarter * quarters in 1 game\nTotal time for all games = total time per game * number of games required\nTotal time in seconds = Total time for all games * seconds in 1 minute',
                    es:'Tiempo total por juego = tiempo para 1 cuarto * cuartos en 1 juego\nTiempo total para todos los juegos = tiempo total por juego * número de juegos requeridos\nTiempo total en segundos = Tiempo total para todos los juegos * segundos en 1 minuto'
                },
                {
                    en:'Total time per game = '+q5Num1+' * 4 = “x”\nTotal time for all games = “x” * '+q5Num2+' = “y”\nTotal time in seconds = “y” * 60 = ' + q5Answer,
                    es:'Tiempo total por juego = '+q5Num1+' * 4 = "x"\nTiempo total para todos los juegos = "x" * '+q5Num2+' = "y"\nTiempo total en segundos = "y" * 60 = ' + q5Answer
                },
            ],
            "wholeNumber",
            null,
            null
        ));

        const q7Num1 = randomInt(700,901)
        const q7Num2 = randomInt(5,10)
        const q7Answer = simplifyFraction(q7Num1,q7Num2)
        questions.push(createGameQuestion(
            {
                en:'This year, your school basketball team was awarded a $'+q7Num1+' prize for winning the championship! If your team has '+q7Num2+' players and the prize money is split evenly, how much will each player earn? Round your answer to the nearest hundredth.',
                es:'¡Este año, su equipo de baloncesto escolar recibió un premio de $'+q7Num1+' por ganar el campeonato! Si su equipo tiene '+q7Num2+' jugadores y el dinero del premio se divide por igual, ¿cuánto ganará cada jugador? Redondea tu respuesta al centésimo más cercano.'
            },
            q7Answer,
            [
                {
                    en:'Player earnings = total prize amount / number of teammates',
                    es:'Ganancias del jugador = cantidad total del premio / número de compañeros de equipo'
                },
                {
                    en:'Player earnings = '+q7Num1+' / '+q7Num2+' = ' + q7Answer, 
                    es:'Ganancias del jugador = '+q7Num1+' / '+q7Num2+' = ' + q7Answer
                },
            ],
            "fraction",
            null,
            null
        ));

        return true
    }
    catch(e){
        DevErr(e)
        questions.push(ErrorQuestion)
        return false
    }
}

export default BasketballL2Questions