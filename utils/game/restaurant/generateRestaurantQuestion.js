//Generate questions with the order state
import createGameQuestion from '@utils/game/createGameQuestion.js'
import { simplifyFraction } from "@utils/imports/commonImports"
import validateOrder from '@utils/validation/game/restaurant/validateOrder';
import generateBasicOrderQuestions from './restaurantQuestionGenerators/generateBasicOrderQuestions';
import generateMultiplyDishQuestions from './restaurantQuestionGenerators/generateSingleMultiplyDishQuestions';
export default function generateRestaurantQuestions(order,randomGenerator) {
    /******
     * Make sure time answers are always in this format
     *  ex. HH:MMAM or HH:MMPM
     * and make sure to omit the 0 in HH when not needed since simplifyAnswer() will always remove it first if the user adds it,
     *  ex. 03:15PM -> 3:15PM
     * thus the final answer must be 3:15PM, this is not true if 0 is in MM,
     *  ex. 10:03PM -> 10:03PM
     *
     * 
     * Make sure inequality answers always use the less than symbol, < , or, <=
     *  ex. 1/2<3/4, 1/2<=3/4
     * any answer with the greater than symbol, > , or, >=, will be swapped to the less than symbol, < , or, <=,
     *  ex. 3/4>1/2 -> 1/2<3/4, 3/4>=1/2 -> 1/2<=3/4
    *******/

    var questions = [];
    if(!validateOrder(order)) {
        return [createGameQuestion()];
    }

    const level = 5

    var questions = [];

    const basicOrderQuestions = generateBasicOrderQuestions(order)
    questions = questions.concat(basicOrderQuestions)
    
    const multiplyDishQuestions = generateMultiplyDishQuestions(order,level,randomGenerator)
    questions = questions.concat(multiplyDishQuestions)

    return questions 
    /*
    let randomItem;
    let randomItemEs;
    let randomOrderObj;
    let randEnDrDe = getRandomInt(1, 3);
    switch(randEnDrDe){
        case 1:
            randomItem = "entrée";
            randomItemEs = "entrada";
            randomOrderObj = order.entree;
            break;
        case 2:
            randomItem = "drink";
            randomItemEs = "bebida";
            randomOrderObj = order.drink;
            break;
        case 3:
            randomItem = "dessert";
            randomItemEs = "postre";
            randomOrderObj = order.dessert;
            break;
    }

    questions[questions.length] = createGameQuestion(
        {
            en:"How much will you pay for your " + randomItem + ", " + randomOrderObj.en + ", if you share half of it with Elena and split the cost evenly?",
            es:"¿Cuánto pagará por su " + randomItemEs + ", " + randomOrderObj.es + ", si comparte la mitad con Elena y divide el costo en partes iguales?",
        },
        randomOrderObj.price / 2,
        [{
            en: "(" + randomOrderObj.en + ") ÷ 2 = ???",
            es: "(" + randomOrderObj.es + ") ÷ 2 = ???",
        },{
            en: "(" + randomOrderObj.en + ") ÷ 2 = " + randomOrderObj.price / 2,
            es: "(" + randomOrderObj.es + ") ÷ 2 = " + randomOrderObj.price / 2,
        }],
        "decimal"
    )

    randomValue = getRandomInt(1, 10);
    secondRandomValue = getRandomInt(10, 30);
    questions[questions.length] = createGameQuestion(
        {
            en:"Elena’s budget is " + secondRandomValue + " dollars. If her entrée costs " + randomValue + (randomValue === 1 ? " dollar" : " dollars") +
                ", how many entrees can she buy? ",
            es:"El presupuesto de Elena es " + secondRandomValue + " dólares. Si su entrada cuesta  " + randomValue + (randomValue === 1 ? " dólar" : " dólares") +
                ", ¿cuántas entradas puede comprar?",
        },
        Math.floor(secondRandomValue / randomValue),
        [{
            en: secondRandomValue + " ÷ " + randomValue + " = ???",
            es: secondRandomValue + " ÷ " + randomValue + " = ???",
        },{
            en: secondRandomValue + " ÷ " + randomValue + " = " + Math.floor(secondRandomValue / randomValue),
            es: secondRandomValue + " ÷ " + randomValue + " = " + Math.floor(secondRandomValue / randomValue),
        }],
        "decimal"
    )

    secondRandomValue = getRandomInt(10, 30);
    questions[questions.length] = createGameQuestion(
        {
            en:"Your budget is now " + secondRandomValue + " dollars. If you order the $" + order.drink.price + " " + order.drink.en +
                " and $" + order.dessert.price + " " + order.dessert.en +  ", how much money do you have left over?",
            es:"Su presupesto es ahora "  + secondRandomValue + " dólares. Si ordena la bebida de " + order.drink.price + " dólares y el postre de " + order.dessert.price + " dólares, " +
                "¿cuánto dinero le sobra?"
            ,
        },
        secondRandomValue - (order.dessert.price + order.drink.price),
        [{
            en: secondRandomValue + " - ((" + order.drink.en + " + (" + order.dessert.en + ")) = ???",
            es: secondRandomValue + " - ((" + order.drink.es + " + (" + order.dessert.es + ")) = ???",
        },{
            en: secondRandomValue + " - (" + order.drink.en + " + " + order.dessert.en + ") = " + (secondRandomValue - (order.dessert.price + order.drink.price)),
            es: secondRandomValue + " - (" + order.drink.es + " + " + order.dessert.es + ") = " + (secondRandomValue - (order.dessert.price + order.drink.price)),
        }],
        "decimal"
    )

    randomValue = getRandomInt(1, 10);
    secondRandomValue = getRandomInt(10, 30);
    questions[questions.length] = createGameQuestion(
        {
            en:"If your budget is " + secondRandomValue + " dollars, how many " + randomValue + " dollar drinks can you order? ",
            es:"Si su presupuesto es " + secondRandomValue + " dólares, ¿cuántas bebidas en dólares " + randomValue + " puede pedir?",
        },
        Math.floor(secondRandomValue / randomValue),
        [{
            en: secondRandomValue + " ÷ " + randomValue + " = ???",
            es: secondRandomValue + " ÷ " + randomValue + " = ???",
        },{
            en: secondRandomValue + " ÷ " + randomValue + " = " + Math.floor(secondRandomValue / randomValue),
            es: secondRandomValue + " ÷ " + randomValue + " = " + Math.floor(secondRandomValue / randomValue),
        }],
        "decimal"
    )

    randomValue = getRandomInt(2, 10);
    questions[questions.length] = createGameQuestion(
        {
            en:"How much will you pay for the entrée, " + order.entree.en + ", if you share it with " + randomValue + " friends and you all equally split the cost? Hint: Write your answer as a fraction.",
            es:"¿Cuánto pagará por el plato principal, " + order.entree.es + ", si lo comparte con " + randomValue + " amigos y todos dividen el costo por igual? Pista: escribe tu respuesta como una fracción.",
        },
        simplifyFraction(order.entree.price, (randomValue + 1)),
        [{
            en: "(" + order.entree.en + ") ÷ (Total number of people) = ???",
            es: "(" + order.entree.es + ") ÷ (Número total de personas) = ???",
        },{
            en: "(" + order.entree.en + ") ÷ (" + randomValue + " + 1) = " + (order.entree.price / (randomValue + 1)),
            es: "(" + order.entree.es + ") ÷ (" + randomValue + " + 1) = " + (order.entree.price / (randomValue + 1)),
        }],
        "decimal"
    )

    randomValue = getRandomInt(10, 30);
    secondRandomValue = getRandomInt(1, 10);
    questions[questions.length] = createGameQuestion(
        {
            en:"Elena’s budget is " + randomValue + " dollars. She orders the $" + order.drink.price + " " +
                order.drink.en + " and the $" + order.dessert.price + " " +
                order.dessert.en + ". How many entrees can she buy if the entrée costs " + secondRandomValue + (secondRandomValue === 1 ? " dollar?" : " dollars?"),
            es:"El presupuesto de Elena es " + randomValue + " dólares. Ella ordena la bebida de " + order.drink.price + " dólares y el postre de " + order.dessert.price +" dólares. " +
                "¿Cuántas entradas puede comprar si la entrada cuesta " + secondRandomValue + (secondRandomValue === 1 ? " dólar?" : " dólares?"),
        },
        Math.floor((randomValue - (order.drink.price + order.dessert.price)) / secondRandomValue),
        [{
            en: "Elena's new budget = " + randomValue + " -  ((" + order.drink.en + ") + (" + order.dessert.price + "))",
            es: "Nuevo presupuesto de Elena = " + randomValue + " -  ((" + order.drink.es + ") + (" + order.dessert.price + "))" ,
        },{
            en: "Elena’s New Budget ÷ Entrée Cost (round down to the nearest entrée) = " + Math.floor((randomValue - (order.drink.price + order.dessert.price)) / secondRandomValue),
            es: "Nuevo presupuesto de Elena ÷ Costo de la entrada (redondear hacia abajo al plato principal más cercano) = " + Math.floor((randomValue - (order.drink.price + order.dessert.price)) / secondRandomValue),
        }],
        "decimal"
    )

    questions[questions.length] = createGameQuestion(
        {
            en:"Elena ordered the same entrée, " + order.entree.en + ", as you. What is the total cost of the two entrées?",
            es:"Elena pidió la misma entrada, "  + order.entree.es + ", que tú. ¿Cuál es el costo total de las dos entradas?",
        },
        order.entree.price * 2,
        [{
            en: "(" + order.entree.en + ") + (" + order.entree.en + ") = Total cost OR (" + order.entree.en + ") x 2 = Total cost",
            es: "(" + order.entree.es + ") + (" + order.entree.es + ") = Costo total O (" + order.entree.es + ") x 2 = Costo total",
        },{
            en: "(" + order.entree.en + ") + (" + order.entree.en + ") = " + order.entree.price * 2 + " OR (" + order.entree.en + ") x 2 = " + order.entree.price * 2,
            es: "(" + order.entree.es + ") + (" + order.entree.es + ") = " + order.entree.price * 2 + " O (" + order.entree.es + ") x 2 = " + order.entree.price * 2,
        }],
        "decimal"
    )
    questions[questions.length] = createGameQuestion(
        {
            en:"Elena wants to order some food to bring home to her family. She ordered the same entrée and dessert as you for her father, mother, and brother. How much will this food cost Elena?",
            es:"Elena quiere pedir algo de comida para llevar a casa a su familia. Pidió la misma entrada y postre que tú para su padre, su madre y su hermano. ¿Cuánto le costará a Elena esta comida?",
        },
        order.entree.price * 3 + order.dessert.price * 3,
        [{
            en: "Sum of Entrees + Sum of Desserts = Total Cost",
            es: "Suma de entradas + Suma de postres = Costo total",
        },{
            en: order.entree.price + " + " + order.entree.price + " + " + order.entree.price + " + " + order.dessert.price + " + " + order.dessert.price + " + " + order.dessert.price + " = " + (order.entree.price * 3 + order.dessert.price * 3),
            es: order.entree.price + " + " + order.entree.price + " + " + order.entree.price + " + " + order.dessert.price + " + " + order.dessert.price + " + " + order.dessert.price + " = " + (order.entree.price * 3 + order.dessert.price * 3),
        }],
        "decimal"
    )
    questions[questions.length] = createGameQuestion(
        {
            en:"Elena’s mother and father did not want a dessert. What is the total cost for Elena’s order after removing her parents’ desserts?",
            es:"La madre y el padre de Elena no querían postre. ¿Cuál es el costo total del pedido de Elena después de eliminar los postres de sus padres?",
        },
        order.entree.price * 3 + order.dessert.price * 1,
        [{
            en: "Initial Cost – ("+ order.dessert.en + " x 2) = New Cost  OR  Initial Cost – ("+ order.dessert.en + " + "+ order.dessert.en + ") = New Cost",
            es: "Costo inicial – ("+ order.dessert.en + " x 2) = Nuevo costo  O  Costo inicial – ("+ order.dessert.en + " + "+ order.dessert.en + ") = Nuevo costo",
        },{
            en: order.entree.price * 3 + order.dessert.price * 3 + " - " + order.dessert.price * 2 + " = " + (order.entree.price * 3 + order.dessert.price * 1),
            es: order.entree.price * 3 + order.dessert.price * 3 + " - " + order.dessert.price * 2 + " = " + (order.entree.price * 3 + order.dessert.price * 1),
        }],
        "decimal"
    )
    questions[questions.length] = createGameQuestion(
        {
            en:"Elena would like to taste half of your entrée. How much of your food will you be sharing with her? Hint: write your answer as a fraction.",
            es:"A Elena le gustaría probar la mitad de tu entrada. ¿Cuánto de tu comida compartirás con ella? Pista: escribe tu respuesta como una fracción.",
        },
        simplifyFraction(1, 2),
        [{
            en: "Half = ½",
            es: "Mitad = ½",
        }],
        "decimal"
    )
    randomValue = getRandomInt(0, 2);
    let fractionArrayEN = ["third", "fourth", "sixth"];
    let fractionArrayES = ["tercio", "cuarto", "sexto"];
    questions[questions.length] = createGameQuestion(
        {
            en:"Elena would like to taste a " + fractionArrayEN[randomValue] + " of your entrée. How much of your food will you be sharing with her? Hint: write your answer as a fraction.",
            es:"A Elena le gustaría probar un " + fractionArrayES[randomValue] + " de tu plato principal. ¿Cuánto de tu comida compartirás con ella? Pista: escribe tu respuesta como una fracción.",
        },
        randomValue == 0 ? "1/3" : randomValue == 1 ? "1/4" : "1/6",
        [{
            en: randomValue == 0 ? fractionArrayEN[randomValue] + " = 1/3" : randomValue == 1 ? fractionArrayEN[randomValue] + " = 1/4" : fractionArrayEN[randomValue] + " = 1/6",
            es: randomValue == 0 ? fractionArrayES[randomValue] + " = 1/3" : randomValue == 1 ? fractionArrayES[randomValue] + " = 1/4" : fractionArrayES[randomValue] + " = 1/6",
        }],
        "decimal"
    )
    questions[questions.length] = createGameQuestion(
        {
            en:"Elena would like to taste an eighth of your entrée. How much of your food will you be sharing with her? Hint: write your answer as a fraction.",
            es:"A Elena le gustaría probar una octava parte de tu plato principal. ¿Cuánto de tu comida compartirás con ella? Pista: escribe tu respuesta como una fracción.",
        },
        "1/8",
        [{
            en: "Eigth = 1/8",
            es: "Octavo = 1/8",
        }],
        "decimal"
    )
    randomValue = getRandomInt(0, 4);
    secondRandomValue = getRandomInt(0, 4);
    let fractionArray = ["1/2", "1/3", "1/4", "1/6", "1/8"]
    questions[questions.length] = createGameQuestion(
        {
            en:"If you ate " + fractionArray[randomValue] + " and Elena ate " + fractionArray[secondRandomValue] + ", who ate more, you or Elena? Express your answers as fractions and compare them using <, >, = (i.e. 1/3 < 1/2).",
            es:"Si comiste " + fractionArray[randomValue] + " y Elena comió " + fractionArray[secondRandomValue] + ", ¿quién comió más, tú o Elena? Exprese sus respuestas como fracciones y compárelas usando <,>,= (es decir, 1/3 < 1/2)."
            },
        parseInt(fractionArray[randomValue][2]) > parseInt(fractionArray[secondRandomValue][2]) ?
                    fractionArray[randomValue] + "<" + fractionArray[secondRandomValue] :
            parseInt(fractionArray[randomValue][2]) === parseInt(fractionArray[secondRandomValue][2]) ?
                fractionArray[randomValue] + "=" + fractionArray[secondRandomValue] :
                    fractionArray[secondRandomValue] + "<" + fractionArray[randomValue],
        [],
        "decimal"
    )
    randomValue = getRandomInt(0, 4);
    secondRandomValue = getRandomInt(0, 4);
    questions[questions.length] = createGameQuestion(
        {
            en:"If you ate " + fractionArray[randomValue] + " and Elena ate " + fractionArray[secondRandomValue] + ". Who ate more, you or Elena? Express your answers as fractions and compare them using <, >, = (i.e. 1/3 < 1/2).",
            es:"Si comiste " + fractionArray[randomValue] + " y Elena comió " + fractionArray[secondRandomValue] + ", ¿quién comió más, tú o Elena? Exprese sus respuestas como fracciones y compárelas usando <,>,= (es decir, 1/3 < 1/2)."
            },
        parseInt(fractionArray[randomValue][2]) > parseInt(fractionArray[secondRandomValue][2]) ?
            fractionArray[randomValue] + "<" + fractionArray[secondRandomValue] :
            parseInt(fractionArray[randomValue][2]) === parseInt(fractionArray[secondRandomValue][2]) ?
                fractionArray[randomValue] + "=" + fractionArray[secondRandomValue] :
                fractionArray[secondRandomValue] + "<" + fractionArray[randomValue],
        [],
        "decimal"
    )

    let randomValue = getRandomHrInt(); //generates random hour
    let secondRandomValue = getRandomInt(0, 0); //generates random minutes
    let thirdRandomValue = getRandomInt(5, 15); //generates random number to add to the time
    let time = randomValue + ":" + (secondRandomValue < 10 ? "0" + secondRandomValue : secondRandomValue) + "PM"; //formats the random H and random M
    let newMinuteAns = secondRandomValue + thirdRandomValue > 60 ? thirdRandomValue - (60 - secondRandomValue) : secondRandomValue + thirdRandomValue;
    let newHourAns = secondRandomValue + thirdRandomValue > 60 ? randomValue + 1 : randomValue;
    questions[questions.length] = createGameQuestion(
        {
            en:"You and Elena arrive at the restaurant at " + time + ". If it takes you both " + thirdRandomValue + " minutes to order, at what time will you place the order?",
            es:"Elena y Tú llegan al restaurante a las " + time + ". Si les toma a ambos " + thirdRandomValue + " minutos en hacer el pedido, ¿a qué hora realizarán el pedido?"
        },
        newHourAns + ":" + (newMinuteAns < 10 ? "0" + newMinuteAns : newMinuteAns) + "PM",
        [{
            en: "Add minutes to the hour when you arrive at the restaurant. If you arrive at 2 PM and it takes you 12 minutes to order, you will place the order at 2:00PM + 12 minutes which is 2:12PM. ",
            es: "Suma minutos a la hora cuando llegas al restaurante. Si llegas a las 2:00PM y tardas 12 minutos en hacer el pedido, harás el pedido a las 2:00PM + 12 minutos que son las 2:12PM",
        }],
        "decimal"
    )

    randomValue = getRandomHrInt();
    secondRandomValue = getRandomInt(0, 0);
    thirdRandomValue = getRandomInt(30, 59);
    time = randomValue + ":" + (secondRandomValue < 10 ? "0" + secondRandomValue : secondRandomValue) + "PM";
    newMinuteAns = secondRandomValue + thirdRandomValue > 60 ? thirdRandomValue - (60 - secondRandomValue) : secondRandomValue + thirdRandomValue;
    newHourAns = secondRandomValue + thirdRandomValue > 60 ? randomValue + 1 : randomValue;
    questions[questions.length] = createGameQuestion(
        {
            en:"You and Elena arrive at the restaurant at " + time + ". If it takes you both " + thirdRandomValue + " minutes to order, at what time will you place the order?",
            es:"Elena y Tú llegan al restaurante a las " + time + ". Si les toma a ambos " + thirdRandomValue + " minutos en hacer el pedido, ¿a qué hora realizarán el pedido?"
        },
        newHourAns + ":" + (newMinuteAns < 10 ? "0" + newMinuteAns : newMinuteAns) + "PM",
        [{
            en: "Arrival Hour + Minutes Spent = Time",
            es: "Hora de Llegada + Minutos Pasados = Tiempo",
        }],
        "decimal"
    )

    randomValue = getRandomHrInt();
    secondRandomValue = getRandomInt(0, 0);
    time = randomValue + ":" + (secondRandomValue < 10 ? "0" + secondRandomValue : secondRandomValue) + "PM";
    thirdRandomValue = getRandomInt(5, 20);
    let fourthRandomValue = getRandomInt(5, 15);

    newMinuteAns = secondRandomValue + thirdRandomValue + fourthRandomValue > 60 ? (thirdRandomValue + fourthRandomValue) - (60 - secondRandomValue) : secondRandomValue + thirdRandomValue + fourthRandomValue;
    newHourAns = secondRandomValue + thirdRandomValue + fourthRandomValue > 60 ? randomValue + 1 : randomValue;
    questions[questions.length] = createGameQuestion(
        {
            en:"The server tells you and Elena that your food will be ready in " + thirdRandomValue + " minutes. " +
                "If your food order took " + fourthRandomValue + " minutes and you arrived at the restaurant at " + time + ", " +
                "how many total minutes did you wait to receive your food?",
            es:"El mesero les dice a Elena y a ti que tu comida estará lista en " + thirdRandomValue + " minutos. " +
                "Si su pedido de comida tardó " + fourthRandomValue + " minutos y llegó al restaurante a las " + time + ", " +
                "¿cuántos minutos esperó en total para recibir su comida? ¿Qué hora era cuando recibiste tu comida?"
        },
        thirdRandomValue + fourthRandomValue,
        [{
            en: "Food Ready Time + Order Time = Total Time",
            es: "Tiempo de preparación de alimentos + Tiempo del pedido = Tiempo Total",
        }],
        "decimal"
    )
    questions[questions.length] = createGameQuestion(
        {
            en:"The server tells you and Elena that your food will be ready in " + thirdRandomValue + " minutes. " +
                "If your food order took " + fourthRandomValue + " minutes and you arrived at the restaurant at " + time + ", " +
                "what time was it when you received your food?",
            es:"El mesero les dice a Elena y a ti que tu comida estará lista en " + thirdRandomValue + " minutos. " +
                "Si su pedido de comida tardó " + fourthRandomValue + " minutos y llegó al restaurante a las " + time + ", " +
                "¿cuántos minutos esperó en total para recibir su comida? ¿Qué hora era cuando recibiste tu comida?"
        },
        newHourAns + ":" + (newMinuteAns < 10 ? "0" + newMinuteAns : newMinuteAns) + "PM",
        [{
            en: "Add total time to the hour when you arrived at restaurant to calculate what time it is when you receive your order. ",
            es: "Sume el tiempo total a la hora en que llegó al restaurante para calcular a qué hora es cuando recibe su pedido.",
        }],
        "decimal"
    )
    questions[questions.length] = createGameQuestion(
        {
            en:"If you and Elena can only stay 1 hour at the restaurant, how many minutes do you have left to finish your meal and pay for your food? " +
                "Remember that you spent " + fourthRandomValue + " minutes to order and the food arrived in " + thirdRandomValue + " minutes. " +
                "Hint: 1 hour is equal to 60 minutes.",
            es:"Si Elena y Tú solo pueden quedarse 1 hora en el restaurante, ¿cuántos minutos te quedan para terminar tu comida y pagar tu comida? " +
                "Recuerde que pasó  " + fourthRandomValue + " minutos para ordenar y la comida llegó en " + thirdRandomValue + " minutos. " +
                "Pista: 1 hora es igual a 60 minutos."
        },
        60 - fourthRandomValue - thirdRandomValue,
        [{
            en: "Calculate Time spent waiting for food. Order Time + Food Ready Time = Time Spent",
            es: "Calcular el tiempo de espera para la comida. Tiempo de espera = Tiempo del pedido + Tiempo de preparación de alimentos.",
        },{
            en: "60 - (" + fourthRandomValue + " + " + thirdRandomValue + ") = " + (60 - fourthRandomValue - thirdRandomValue),
            es: "60 - (" + fourthRandomValue + " + " + thirdRandomValue + ") = " + (60 - fourthRandomValue - thirdRandomValue),
        }],
        "decimal"
    )
    let randomNum = getRandomInt(10, 50);
    let randomNumMult = getRandomInt(2, 9);
    questions[23] = createGameQuestion(
        {
            en:"The restaurant is hosting a monthly food drive event. Elena and you are helping collect and organize various food items. " +
                "On the first day, you collected " + randomNum + " food items and on the second day you collected " + randomNumMult + " times as many items. " +
                "How many items did you and Elena collect on the second day?",
            es:"",
        },
        randomNum * randomNumMult,
        [{
            en: randomNum + " x " + randomNumMult + " = 2nd Day Items",
            es: ""
        },{
            en: randomNum + " x " + randomNumMult + " =  " + randomNumMult * randomNum,
            es: ""
        }],
        "time"
    )
    randomNum = getRandomInt(10, 30)
    randomNumMult = getRandomInt(2, 5);
    let amtOfMoney = getRandomInt(0, 1); //randomly chooses T or F. if 0 then it's less, if 1 then it's more
    if(randomNum % randomNumMult !== 0){ amtOfMoney = 1}
    questions[24] = createGameQuestion(
        {
            en:"Today your parents gave you " + randomNum + " dollars to order food at the restaurant. " +
                "If next time they gave you " + randomNumMult + " times " + (amtOfMoney === 0 ? " less" : " more") + " money, what is your new budget?",
            es:"",
        },
        amtOfMoney === 0 ? randomNum / randomNumMult : randomNum * randomNumMult,
        [{
            en: (amtOfMoney === 0 ? randomNum + " ÷ " + randomNumMult: randomNum + " x " + randomNumMult) +  " = New Budget" ,
            es: ""
        },{
            en: (amtOfMoney === 0 ? randomNum + " ÷ " + randomNumMult + " = " + (randomNum / randomNumMult): randomNum + " x " + randomNumMult + " = " + randomNum * randomNumMult),
            es: ""
        }],
        "time"
    )

    randomNum = getRandomInt(2, 50)
    questions[25] = createGameQuestion(
        {
            en:"Elena’s lucky number is " + randomNum + ". How many factors does her lucky number have?",
            es:"",
        },
        countFactors(randomNum),
        [{
            en: "If Elena's lucky number is 6, then the factors are 6, 3, 2, 1",
            es: ""
        },{
            en: "If Elena's lucky number is 6, then the factors are 6, 3, 2, 1. The answer is 4.",
            es: ""
        }],
        "time"
    )
    let sRanNum = getRandomInt(1, 9)
    questions[26] = createGameQuestion(
        {
            en:"Is Elena’s lucky number, "  + randomNum + ", a multiple of " + sRanNum + "? Enter 0 for “no” and 1 for “yes”",
            es:"",
        },
        (randomNum % sRanNum === 0 ? 1 : 0),
        [{
            en: "If Elena's lucky number is 6, then the factors are 6, 3, 2, 1",
            es: ""
        },{
            en: "If Elena's lucky number is 6, then the factors are 6, 3, 2, 1. The answer is 4.",
            es: ""
        }],
        "time"
    )
    let primeArray = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
    questions[27] = createGameQuestion(
        {
            en:"Elena wants to know if her lucky number, "  + randomNum + ", is prime or composite. Enter 0 in the answer box if the number is prime and 1 if the number is composite.",
            es:"",
        },
        (primeArray.includes(randomNum) ? 0 : 1),
        [{
            en: "If Elena's lucky number is 6, then it has four factors and is composite",
            es: ""
        },{
            en: "If Elena's lucky number is 7, then it has only two factors, 7 and 1, and is prime",
            es: ""
        }],
        "time"
    )
    questions[28] = createGameQuestion(
        {
            en:"The restaurant receives two thousand three hundred and fifty pounds of rice and beans per month to supply the kitchen. " +
                "Next month the restaurant will increase its rice and beans supply by 10 times. What is next month’s supply?",
            es:"",
        },
        23500,
        [{
            en: "2350 x 10 = Next Month Supply",
            es: ""
        },{
            en: "2350 x 10 = 23,500 pounds",
            es: ""
        }],
        "time"
    )
    questions[29] = createGameQuestion(
        {
            en:"If the restaurant orders one thousand two hundred and fifteen kilograms of tomatoes and one thousand fifteen kilograms of flour, " +
                "which quantity is larger? Please type the correct quantity number in the answer box. ",
            es:"",
        },
        1215,
        [{
            en: "1,215 kg of tomatoes > 1,015 kg of flour",
            es: ""
        },{
            en: "1,215",
            es: ""
        }],
        "time"
    )
    randomNum = getRandomInt(500, 2000)
    randomNumMult = getRandomInt(5, 20);
    questions[30] = createGameQuestion(
        {
            en:"Last week the restaurant chef ran out of onions. The monthly supply of onions at the restaurant is " + randomNum + " pounds. " +
                "How many pounds of onions will the chef have if the new onion supply is increased " + randomNumMult + " times?",
            es:"",
        },
        randomNum * randomNumMult,
        [{
            en: randomNum + " x " + randomNumMult + " = New supply",
            es: ""
        },{
            en: randomNum + " x " + randomNumMult + " = " + (randomNum * randomNumMult),
            es: ""
        }],
        "time"
    )
    return questions

}

function getRandomInt(min, max) {
    //inclusive to min &  max, will keep generating a number until it fits in the range of min <= num <= max
    let randVar = Math.floor(Math.random() * (max + 1));
    while (randVar < min) {
        randVar = Math.floor(Math.random() * (max + 1));
    }
    return randVar;
}

function getRandomHrInt() {
    //goes through an array of random times
    let randTimeHr = [12, 1, 2, 3, 4, 5, 6];
    let randVar = Math.floor(Math.random() * (6 + 1));
    return randTimeHr[randVar];
}

function countFactors(num) {
    let factors = [];

    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            factors.push(i);
        }
    }

    return factors.length;
    */
}