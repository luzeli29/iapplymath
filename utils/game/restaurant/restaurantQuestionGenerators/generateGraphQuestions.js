import createGameQuestion from '@utils/game/quiz/questionGeneration/createGameQuestion'
import translations from '@public/text/translations';


function generateDefaultGraphQuestion(randomGenerator) {

    const generatedQuestions = [];
    let indexSelected = [];

    for(let i = 0; i < 3; i++) {

        // generate a random index
        let index = randomGenerator.randomInt(1,11)
        if(indexSelected.includes(index)) {
            i--;
            continue;
        }else{
            indexSelected.push(index);
            let answer = getDefaultPriceByIndex(index);

            const question = createGameQuestion(
                {
                    en:'This is a graph that shows the cost for each main dish. The x-axis represents the different main dishes on the menu and the y-axis is the price for each main dish. How much was main dish ' + index + '.',
                    es:'Este es un gráfico que muestra el costo de cada plato principal. El eje x representa los diferentes platos principales del menú y el eje y es el precio de cada plato principal. ¿Cuánto fue el plato principal ' + index + '.',
                },
                answer,
                [{
                    en: 'x = y; x = main dish and y = price',
                    es: 'x = y; x = plato principal y y = precio',
                },{
                    en: 'x = y; x = ' + index + ' and y = ' + answer,
                    es: 'x = y; x = ' + index + ' y y = ' + answer,
                }],
                "wholeNumber",
                null,
                'defaultGraphQuestion'
                )
                generatedQuestions.push(question)

        }

    }



    return generatedQuestions;
}
    
function getDefaultPriceByIndex(index) {
    switch (index) {
        case 1:
            return 9
            case 2:
                return 7
        case 3:
            return 8
        case 4:
            return 5
            case 5:
                return 6
        case 6:
            return 9
        case 7:
            return 7
            case 8:
                return 5
                case 9:
                    return 4
                    case 10:
                        return 5
                    }
}


function generateLevel1DQuestions(dishes,order,randomInt){
    // Time questions
    let generatedQuestions = [];
    let answer=0;

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    // question 1

    // You and Elena arrive at the restaurant at [“random time from 13-6 PM”]. If it takes you both [“5-15 random number”] minutes to order, at what time will you place the order? 

    // choose a random time from 1-6 PM
    // let randomTimeHour = Math.floor(Math.random() * 7) + 12;
    let randomTimeHour = randomInt(1,7)
    
    // choose a random number from 5-15
    // let randomNumberMinutes = Math.floor(Math.random() * 11) + 5;
    let randomNumberMinutes = randomInt(5,16)

    // if minutes is less than 10, add a 0 in front of it
    if (randomNumberMinutes < 10) {
        randomNumberMinutes = "0" + randomNumberMinutes;
    }
    // answer
    answer = `${randomTimeHour}:${randomNumberMinutes}pm`;
    
    // hint
    let hint = {
        en: "Write your answer in the format HH:MM. For example, 1:30pm.",
        es: "Escribe tu respuesta en el formato HH:MM. Por ejemplo, 1:30pm.",
    }

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`You and Elena arrive at the restaurant at ${randomTimeHour}pm. If it takes you both ${randomNumberMinutes} minutes to order, at what time will you place the order?`,
            es:`Tú y Elena llegan al restaurante a las ${randomTimeHour}pm. Si les toma ${randomNumberMinutes} minutos ordenar, ¿a qué hora harán el pedido?`,
        },
        answer,
        [{
            en:  "Add minutes to the hour when you arrive at the restaurant. If you arrive at 2:00pm  and it takes you 12 minutes to order, you will place the order at 2:00  + 12 minutes which is 2:12pm." ,
            es: "Agregue minutos a la hora cuando llegue al restaurante. Si llega a las 2:00pm y tarda 12 minutos en hacer el pedido, hará el pedido a las 2:00 + 12 minutos, que son las 2:12pm.",
        },{
            en: answer+"",
            es: answer+"",
        
        }],
        "time",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 2
    
    // If you and Elena arrived at the restaurant at [“random time from 12-6 PM”] and spent [“30-59”] minutes to eat and pay, at what time will you leave the restaurant?

    // choose a random time from 13-18 PM
    // randomTimeHour = Math.floor(Math.random() * 7) + 12;
    randomTimeHour = randomInt(1,7);

    // choose a random number from 30-59
    // randomNumberMinutes = Math.floor(Math.random() * 30) + 30;
    randomNumberMinutes = randomInt(30,60);

    // if minutes is less than 10, add a 0 in front of it
    if (randomNumberMinutes < 10) {
        randomNumberMinutes = "0" + randomNumberMinutes;
    }


    // answer
    answer = `${randomTimeHour}:${randomNumberMinutes}pm`;
    
    // hint
    hint = {
        en: "Write your answer in the format HH:MM. For example, 3:30pm.",
        es: "Escribe tu respuesta en el formato HH:MM. Por ejemplo, 3:30pm.",
    }

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If you and Elena arrived at the restaurant at ${randomTimeHour}pm and spent ${randomNumberMinutes} minutes there, at what time will you leave the restaurant?`,
            es:`Si tú y Elena llegaron al restaurante a las ${randomTimeHour}pm y se tardaron ${randomNumberMinutes} minutos ahi, ¿a qué hora saldrán del restaurante?`,
        },
        answer,
        [{
            en:  "Add minutes to the hour when you arrive at the restaurant. If you arrive at 2  and it takes you 12 minutes to eat and pay, you will leave at 2:00  + 12 minutes which is 2:12pm." ,
            es: "Agregue minutos a la hora cuando llegue al restaurante. Si llega a las 14:00 y tarda 12 minutos en hacer comer y pagar, saldrán del restaurante a las 14:00 + 12 minutos, que son las 2:12pm.",
        },{
            en: answer+"",
            es: answer+"",
        
        }],
        "time",
    ))
    
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        
    return generatedQuestions;

}

function generateLevel2DQuestions(dishes,order,randomInt){
let generatedQuestions = [];
let answer = "";
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// question 1

    // The restaurant receives [range: x = 10-30] kilograms of fresh rice every day. If the chef cooked [range: y = 7-25; y must be < x) kilograms of rice today, how much fresh rice is left over at the end of the day? 

    // choose a random number from 10-30
    // let x = Math.floor(Math.random() * 21) + 10;
    let x = randomInt(10,31);

    // choose a random number from 7-25
    // let y = Math.floor(Math.random() * 19) + 7;
    let y = randomInt(7,26);


    while(y >= x){
        y -= 1;

    }

    // answer
    answer = x - y;

    // generate question
    
    generatedQuestions.push(createGameQuestion(
        {
            en:`The restaurant gets ${x} kilograms of fresh rice every day. If the chef cooked ${y} kilograms of rice today, how much fresh rice is left over at the end of the day?`,
            es:`El restaurante recibe ${x} kilogramos de arroz fresco todos los días. Si el chef cocinó ${y} kilogramos de arroz hoy, ¿cuánto arroz fresco queda al final del día?`,
        },
        answer+"kg",
        [{
            en: "Fresh Rice Remaining = (initial fresh rice) - (rice cooked)",
            es: "Arroz fresco restante = (arroz fresco inicial) - (arroz cocinado)",
        },{
            en: "Fresh Rice Remaining = "+answer+"kg",
            es: "Arroz fresco restante = "+answer+"kg",
        }],
        "unitKiloGrams",
    ))
    
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 3

    // Your house is [range: 0.2-5.0] kilometers away from the restaurant. Calculate the same distance in meters. (Hint: 1 kilometer = 1,000 meters or 1 meter = 0.001 kilometers).

    // choose a random number from 0.2 - 5.0
    // x = Math.floor(Math.random() * 4801) + 200;
    x = randomInt(200,5001);
    x = x / 1000;

    // answer
    answer = x * 1000;

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Your house is ${x} kilometers away from the restaurant. Calculate the same distance in meters. (Hint: 1 kilometer = 1,000 meters or 1 meter = 0.001 kilometers).`,
            es:`Tu casa está a ${x} kilómetros de distancia del restaurante. Calcula la misma distancia en metros. (Pista: 1 kilómetro = 1,000 metros o 1 metro = 0.001 kilómetros).`,
        },
        answer+"m",
        [{
            en: "Multiply the distance from your house to the restaurant by 1,000 since 1 kilometer equals 1,000 meters.",
            es: "Multiplica la distancia de tu casa al restaurante por 1.000 ya que 1 kilómetro equivale a 1.000 metros.",
        },{
            en: `Distance in meters = ${answer}m`,
            es: `Distancia en metros = ${answer}m`,
        }],
        "unitMeters",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 5

    // Your restaurant table is rectangular. After measuring it, you determined that the table is [range: x = 50 – 120] centimeters long and [range: y = 50 – 100] centimeters wide. What is the perimeter of your table?

    // choose a random number from 50 - 120
    // x = Math.floor(Math.random() * 71) + 50;
    x = randomInt(50,121);

    // choose a random number from 50 - 100
    // y = Math.floor(Math.random() * 51) + 50;
    y = randomInt(50,101);

    // answer
    answer = (2*x) + (2*y);

    generatedQuestions.push(createGameQuestion(
        {
            en:`Your restaurant table is rectangular.The table is ${x} centimeters long and ${y} centimeters wide. What is the perimeter of your table?`,
            es:`La mesa del restaurante es rectangular.La mesa tiene ${x} centímetros de largo y ${y} centímetros de ancho. ¿Cuál es el perímetro de tu mesa?`,
        },
        answer,
        [{
            en: "Perimeter of table = (2 x length) + (2 x width)",
            es: "Perímetro de la mesa = (2 x largo) + (2 x ancho)",

        },
        {
            en: "Perimeter of table = "+answer ,
            es: "Perímetro de la mesa = "+answer,

        }],
        "wholeNumber",

    ))
    
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 7

    // If you and Elena arrived at the restaurant at [range: 12PM-6 PM; any time including minutes] and spent [range: 45-90] minutes to eat and pay, at what time would you leave the restaurant? Hint: please type your answer in time format (i.e., 1:09PM).

    // choose a random number from 12 - 18
    // x = Math.floor(Math.random() * 7) + 12;
    x = randomInt(1,7);

    // choose a random number from 45 - 90

    // y = Math.floor(Math.random() * 46) + 45;
    y = randomInt(45,91);

    // answer
    // if minutes are less than 60, then add minutes to x
    // if minutes are more than 60, then add 1 to x and subtract 60 from minutes
    let hour = x;
    let minutes = y;

    if(minutes < 60) {
        // if minutes is less than 10, add a 0 in front of it
        if(minutes < 10) {
            minutes = "0" + minutes;
        }
        answer = hour + ":" + minutes+"pm";
    }
    else {
        hour = hour + 1;
        minutes = minutes - 60;
        // if minutes is less than 10, add a 0 in front of it
        if(minutes < 10) {
            minutes = "0" + minutes;
        }
        answer = hour + ":" + minutes+"pm";
    }

    generatedQuestions.push(createGameQuestion(
        {
            en:`If you and Elena arrived at the restaurant at ${x}pm and spent ${y} minutes to eat and pay, at what time would you leave the restaurant?  Hint: please type your answer in time format (i.e., 1:09pm)`,
            es:`Si tú y Elena llegaron al restaurante a las ${x}pm y pasaron ${y} minutos para comer y pagar, ¿a qué hora saldrían del restaurante? Pista: por favor escriba su respuesta en formato de tiempo (es decir, 1:09pm)`,
        },
        answer,
        [{
                en: `Answer using the unit "hours". example answer: 3:09pm`,
                es: `Responde usando la unidad "horas". ejemplo de respuesta: 3:09pm`,
        },{
            en: `Answer: ${answer}`,
            es: `Respuesta: ${answer}`,
        }
        ],
        "time",
    ))



    return generatedQuestions;

}


export default function generateMeasurementAndDataQuestions(order, level, randomGenerator) {
    // const questions = []
    // questions[0] = generateDefaultGraphQuestion(randomGenerator)

    // return questions

    let questions = [];
    let dishes = ["mainDish","drink","dessert"];

    const { randomInt } = randomGenerator;

    if(level === '1') {

        let generatedQuestions = generateLevel1DQuestions(dishes,order, randomInt);
        questions = questions.concat(generatedQuestions);
    }
    if(level === '2') {

        let generatedQuestions = generateLevel2DQuestions(dishes,order, randomInt);
        questions = questions.concat(generatedQuestions);
    }
    if(level === '3') {

        let generatedQuestions = generateDefaultGraphQuestion(randomGenerator);
        questions = questions.concat(generatedQuestions);
    }


    return questions;

}
