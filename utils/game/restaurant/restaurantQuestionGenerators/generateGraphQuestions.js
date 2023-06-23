import createGameQuestion from '@utils/game/quiz/questionGeneration/createGameQuestion'
import translations from '@public/text/translations';


function generateDefaultGraphQuestion(randomGenerator) {
    const dishIndex = randomGenerator.randomInt(1,11)
    let answer = getDefaultPriceByIndex(dishIndex)
    
    const question = createGameQuestion(
        {
            en:'This is a graph that shows the cost for each main dish. The x-axis represents the different main dishes on the menu and the y-axis is the price for each main dish. How much was main dish ' + dishIndex + '.', 
            es:'Este es un gráfico que muestra el costo de cada plato principal. El eje x representa los diferentes platos principales en el menú y el eje y es el precio de cada plato principal. ¿Cuánto cuesta el plato principal ' + dishIndex + '.',
        },
        answer,
        [{
            en: 'x = y; x = main dish and y = price',
            es: 'x = y; x = plato principal y y = precio',
        },{
            en: 'x = y; x = ' + dishIndex + ' and y = ' + answer,
            es: 'x = y; x = ' + dishIndex + ' y y = ' + answer,
        }],
        "wholeNumber",
        null,
        'defaultGraphQuestion'
        )
        return question
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

    // You and Elena arrive at the restaurant at [“random time from 12-6 PM”]. If it takes you both [“5-15 random number”] minutes to order, at what time will you place the order? 

    // choose a random time from 12-18 PM
    // let randomTimeHour = Math.floor(Math.random() * 7) + 12;
    let randomTimeHour = randomInt(12,19)
    
    // choose a random number from 5-15
    // let randomNumberMinutes = Math.floor(Math.random() * 11) + 5;
    let randomNumberMinutes = randomInt(5,16)

    // if minutes is less than 10, add a 0 in front of it
    if (randomNumberMinutes < 10) {
        randomNumberMinutes = "0" + randomNumberMinutes;
    }
    // answer
    answer = `${randomTimeHour}:${randomNumberMinutes}`;
    
    // hint
    let hint = {
        en: "Write your answer in the format HH:MM. For example, 13:30.",
        es: "Escribe tu respuesta en el formato HH:MM. Por ejemplo, 13:30.",
    }

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`You and Elena arrive at the restaurant at ${randomTimeHour}. If it takes you both ${randomNumberMinutes} minutes to order, at what time will you place the order?`,
            es:`Tú y Elena llegan al restaurante a las ${randomTimeHour}. Si les toma ${randomNumberMinutes} minutos ordenar, ¿a qué hora harán el pedido?`,
        },
        answer,
        [{
            en:  "Add minutes to the hour when you arrive at the restaurant. If you arrive at 2  and it takes you 12 minutes to order, you will place the order at 2:00  + 12 minutes which is 2:12 ." ,
            es: "Agregue minutos a la hora cuando llegue al restaurante. Si llega a las 14:00 y tarda 12 minutos en hacer el pedido, hará el pedido a las 14:00 + 12 minutos, que son las 14:12 .",
        },{
            en: "Write your answer in the format HH:MM. For example, 13:30.",
            es: "Escribe tu respuesta en el formato HH:MM. Por ejemplo, 13:30.",
        
        }],
        "time",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 2
    
    // If you and Elena arrived at the restaurant at [“random time from 12-6 PM”] and spent [“30-59”] minutes to eat and pay, at what time will you leave the restaurant?

    // choose a random time from 12-18 PM
    // randomTimeHour = Math.floor(Math.random() * 7) + 12;
    randomTimeHour = randomInt(12,19);

    // choose a random number from 30-59
    // randomNumberMinutes = Math.floor(Math.random() * 30) + 30;
    randomNumberMinutes = randomInt(30,60);

    // if minutes is less than 10, add a 0 in front of it
    if (randomNumberMinutes < 10) {
        randomNumberMinutes = "0" + randomNumberMinutes;
    }


    // answer
    answer = `${randomTimeHour}:${randomNumberMinutes}`;
    
    // hint
    hint = {
        en: "Write your answer in the format HH:MM. For example, 13:30.",
        es: "Escribe tu respuesta en el formato HH:MM. Por ejemplo, 13:30.",
    }

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`If you and Elena arrived at the restaurant at ${randomTimeHour} and spent ${randomNumberMinutes} minutes to eat and pay, at what time will you leave the restaurant?`,
            es:`Si tú y Elena llegaron al restaurante a las ${randomTimeHour} y se tardaron ${randomNumberMinutes} minutos en comer y pagar, ¿a qué hora saldrán del restaurante?`,
        },
        answer,
        [{
            en:  "Add minutes to the hour when you arrive at the restaurant. If you arrive at 2  and it takes you 12 minutes to eat and pay, you will leave at 2:00  + 12 minutes which is 2:12." ,
            es: "Agregue minutos a la hora cuando llegue al restaurante. Si llega a las 14:00 y tarda 12 minutos en hacer comer y pagar, saldrán del restaurante a las 14:00 + 12 minutos, que son las 14:12.",
        },{
            en: "Write your answer in the format HH:MM. For example, 13:30.",
            es: "Escribe tu respuesta en el formato HH:MM. Por ejemplo, 13:30.",
        
        }],
        "time",
    ))
    
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 3

    // The server tells you and Elena that your food will be ready in [“5-20” random number] minutes. 
    // If your food order took [“5-15 random number”] minutes and you arrived at the restaurant at [“random time from 12-6 PM”], 
    // how many total minutes did you wait to receive your food? What time was it when you received your food?

    // choose a random number from 5-20
    // let foodReadyTime = Math.floor(Math.random() * 16) + 5;
    let foodReadyTime = randomInt(5,21);
    
    // choose a random number from 5-15
    // let foodOrderTime = Math.floor(Math.random() * 11) + 5;
    let foodOrderTime = randomInt(5,16);
    
    // choose a random time from 12-18 PM
    // randomTimeHour = Math.floor(Math.random() * 7) + 12;
    randomTimeHour = randomInt(12,19);
    
    let minutes = foodReadyTime + foodOrderTime;

    // if minutes is less than 10, add a 0 in front of it
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    // answer
    answer = `${randomTimeHour}:${minutes}`;
    
    // hint
    hint = {
        en: "Write your answer in the format HH:MM. For example, 13:30.",
        es: "Escribe tu respuesta en el formato HH:MM. Por ejemplo, 13:30.",
    }

    // create question
    generatedQuestions.push(createGameQuestion(
        {
            en:`The server tells you and Elena that your food will be ready in ${foodReadyTime} minutes. If your food order took ${foodOrderTime} minutes and you arrived at the restaurant at ${randomTimeHour}, at what time was it when you received your food?`,
            es:`El mesero les dice a ti y a Elena que su comida estará lista en ${foodReadyTime} minutos. Si su orden tardó ${foodOrderTime} minutos y llegaron al restaurante a las ${randomTimeHour}, ¿a qué hora recibieron su comida?`,
        },
        answer,
        [{
            en:  "Step 1. Total Time = Food Ready Time + Order Time",
            es: "Paso 1. Tiempo total = Tiempo de comida lista + Tiempo de pedido",
        },{
            en: "Step 2. Add total time to the hour when you arrived at restaurant to calculate what time it is when you receive your order",
            es: "Paso 2. Sume el tiempo total a la hora en que llegó al restaurante para calcular qué hora es cuando reciben su pedido",
        },{
            en: "Write your answer in the format HH:MM. For example, 13:30.",
            es: "Escribe tu respuesta en el formato HH:MM. Por ejemplo, 13:30.",
        
        }],
        "time",
        ))

        
        
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
            en:`The restaurant receives ${x} kilograms of fresh rice every day. If the chef cooked ${y} kilograms of rice today, how much fresh rice is left over at the end of the day?`,
            es:`El restaurante recibe ${x} kilogramos de arroz fresco todos los días. Si el chef cocinó ${y} kilogramos de arroz hoy, ¿cuánto arroz fresco queda al final del día?`,
        },
        answer+"kg",
        [
            {
                en: `Answer using the unit "kg". example answer: 5kg`,
                es: `Responde usando la unidad "kg". ejemplo de respuesta: 5kg`,
            }
        ],
        "unitKiloGrams",
    ))
    
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 2

    // Elena received a new water bottle from her parents. Her bottle can hold up to 1,000 milliliters of water. If she fills her bottle using a [range: x = 100-250] milliliter container, how many containers will she need to completely fill her bottle?

    // choose a random number from 100-250
    // x = Math.floor(Math.random() * 151) + 100;
    x = randomInt(100,251);

    // answer
    answer =parseFloat( 1000 / x);

    // fix answer to 2 decimal place
    answer = answer.toFixed(2);

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena received a new water bottle from her parents. Her bottle can hold up to 1,000 milliliters of water. If she fills her bottle using a ${x} milliliter container, how many containers will she need to completely fill her bottle?`,
            es:`Elena recibió una nueva botella de agua de sus padres. Su botella puede contener hasta 1,000 mililitros de agua. Si llena su botella usando un recipiente de ${x} mililitros, ¿cuántos recipientes necesitará para llenar completamente su botella?`,
        },
        answer+"ml",
        [
            {
                en: `Answer using the unit "millimiters". example answer: 5.2ml`,
                es: `Responde usando la unidad "mililitros". ejemplo de respuesta: 5.2ml`,
            }
        ],
        "unitMilliLiters",
    ))


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
        [
            {
                en: `Answer using the unit "meters". example answer: 5.2m`,
                es: `Responde usando la unidad "metros". ejemplo de respuesta: 5.2m`,
            }
        ],
        "unitMeters",
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 4

    // Your bottle can hold up to 1.5 liters of liquid. If you filled your bottle with water and drank [range: x = 100 – 1,400] milliliters, how many milliliters of water are left in the bottle?

    // choose a random number from 100 - 1400
    // x = Math.floor(Math.random() * 1301) + 100;
    x = randomInt(100,1401);

    // answer
    answer = 1500 - x;

    // generate question
    generatedQuestions.push(createGameQuestion(
        {
            en:`Your bottle can hold up to 1.5 liters of liquid. If you filled your bottle with water and drank ${x} milliliters, how many milliliters of water are left in the bottle?`,
            es:`Tu botella puede contener hasta 1.5 litros de líquido. Si llenaste tu botella con agua y bebiste ${x} mililitros, ¿cuántos mililitros de agua quedan en la botella?`,
        },
        answer+"ml",
        [
            {
                en: `Answer using the unit "milliliters". example answer: 5.2ml`,
                es: `Responde usando la unidad "mililitros". ejemplo de respuesta: 5.2ml`,
            }
        ], 
        "unitMilliLiters",
    ))


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
            en:`Your restaurant table is rectangular. After measuring it, you determined that the table is ${x} centimeters long and ${y} centimeters wide. What is the perimeter of your table?`,
            es:`La mesa del restaurante es rectangular. Despues de medirla, determinaste que la mesa tiene ${x} centímetros de largo y ${y} centímetros de ancho. ¿Cuál es el perímetro de tu mesa?`,
        },
        answer,
        [

        ],
        "wholeNumber",

    ))
    
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 6

    // Elena asked you for help with one of her math problems and gave you the angle diagram below. Angle ∠ABC measures 120° and angle ∠ABD measures 37°. What is the measurement of angle ∠DBC in degrees? 
    
    // answer
    answer = 120 - 37;

    generatedQuestions.push(createGameQuestion(
        {
            en:`Elena asked you for help with one of her math problems and gave you the angle diagram below. Angle ∠ABC measures 120° and angle ∠ABD measures 37°. What is the measurement of angle ∠DBC in degrees?`,
            es:`Elena te pidió ayuda con uno de sus problemas de matemáticas y te dio el diagrama de ángulos a continuación. El ángulo ∠ABC mide 120° y el ángulo ∠ABD mide 37°. ¿Cuál es la medida del ángulo ∠DBC en grados?`,
        },
        answer,
        [

        ],
        "wholeNumber",
        null,
        "degreesLevel2DRestaurant"
    ))

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // question 7

    // If you and Elena arrived at the restaurant at [range: 12PM-6 PM; any time including minutes] and spent [range: 45-90] minutes to eat and pay, at what time would you leave the restaurant? Hint: please type your answer in time format (i.e., 1:09PM).

    // choose a random number from 12 - 18
    // x = Math.floor(Math.random() * 7) + 12;
    x = randomInt(12,19);

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
        answer = hour + ":" + minutes;
    }
    else {
        hour = hour + 1;
        minutes = minutes - 60;
        // if minutes is less than 10, add a 0 in front of it
        if(minutes < 10) {
            minutes = "0" + minutes;
        }
        answer = hour + ":" + minutes;
    }

    generatedQuestions.push(createGameQuestion(
        {
            en:`If you and Elena arrived at the restaurant at ${x}and spent ${y} minutes to eat and pay, at what time would you leave the restaurant?`,
            es:`Si tú y Elena llegaron al restaurante a las ${x} y pasaron ${y} minutos para comer y pagar, ¿a qué hora saldrían del restaurante?`,
        },
        answer,
        [
            {
                en: `Answer using the unit "hours". example answer: 13:09`,
                es: `Responde usando la unidad "horas". ejemplo de respuesta: 13:09`,
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

        let generatedQuestions =[];
        generatedQuestions.push(generateDefaultGraphQuestion(randomGenerator));
        questions = questions.concat(generatedQuestions);
    }


    return questions;

}
