import { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion";
import createGameQuestion from "@utils/game/quiz/questionGeneration/createGameQuestion";
const BasketballL1Questions = (questions, randomGenerator) => {
  const { randomInt, randomChoice } = randomGenerator;

  // question 1
  // James Harden played against the Chicago Bulls and scored [14-21] points. The next game he played against the Atlanta Hawks and scored [twice, three times] the amount against the Bulls. How many total points did James score in the two games?
  const randomNumberq1 = randomInt(14, 22);
  const optionsq1 = {
    2: {
      en: `twice`,
      es: `dos veces`,
    },
    3: {
      en: `three times`,
      es: "tres veces",
    },
  };
  const randomKeyq1 = randomInt(2, 4);
  const optionq1 = optionsq1[randomKeyq1];
  let x = randomNumberq1 * randomKeyq1;
  let answer = x + randomNumberq1;

  questions.push(
    createGameQuestion(
      {
        en:
          "James Harden played against the Chicago Bulls and scored " +
          randomNumberq1 +
          " points. The next game he played against the Atlanta Hawks and scored " +
          optionq1.en +
          " the amount against the Bulls. How many total points did James score in the two games?",
        es:
          "James Harden jugó contra los Chicago Bulls y anotó " +
          randomNumberq1 +
          " puntos. El siguiente juego jugó contra los Atlanta Hawks y anotó " +
          optionq1.es +
          " la cantidad contra los Bulls. ¿Cuántos puntos anotó James en los dos juegos?",
      },
      answer,
      [
        {
          en: "Points against Hawks = points against Bulls * Hawks multiplying factor\n Total points = points against Bulls + points against Hawks",
          es: "Puntos contra Hawks = puntos contra Bulls * factor de multiplicación de Hawks\n Puntos totales = puntos contra Bulls + puntos contra Hawks",
        },
        {
          en: `${randomNumberq1} * ${randomKeyq1} = ${x}\nTotal points = ${x} + ${randomNumberq1} = ${answer}`,
          es: `${randomNumberq1} * ${randomKeyq1} = ${x}\nPuntos totales = ${x} + ${randomNumberq1} = ${answer}`,
        },
      ],
      "wholeNumber",
      null,
      null
    )
  );

  //   question 2
  //   The following table shows different items available at the NBA Store. If your parents give you $1000 to spend on [5-9] figurines, [2-9] posters, 1 jersey, and 1 basketball, then how much money will you have leftover?
  const budget = 1000;
  const amountFigurines = randomInt(5, 10);
  const amountPosters = randomInt(2, 10);
  const amountJersey = 1;
  const amountBasketball = 1;
  const prices = {
    figurines: 40,
    posters: 10,
    jersey: 100,
    basketball: 400,
  };

  const moneySpent =
    amountFigurines * prices.figurines +
    amountPosters * prices.posters +
    amountJersey * prices.jersey +
    amountBasketball * prices.basketball;
  const moneyLeft = budget - moneySpent;

  questions.push(
    createGameQuestion(
      {
        en: `The following table shows different items available at the NBA Store. If your parents give you $1000 to spend on ${amountFigurines} figurines, ${amountPosters} posters, 1 jersey, and 1 basketball, then how much money will you have leftover?`,
        es: `La siguiente tabla muestra diferentes artículos disponibles en la tienda de la NBA. Si tus padres te dan $1000 para gastar en ${amountFigurines} figuras, ${amountPosters} carteles, 1 camiseta y 1 baloncesto, ¿cuánto dinero te quedará?`,
      },
      moneyLeft,
      [
        {
          en: "Money spent = (# of figurines * price per figurine) + (# of posters * price per poster) + (# of jerseys * price per jersey) + (# of balls * price per ball) Money left = Total money – Money Spent",
          es: "Dinero gastado = (# de figuras * precio por figura) + (# de carteles * precio por cartel) + (# de camisetas * precio por camiseta) + (# de balones * precio por balón) Dinero restante = Dinero total - Dinero gastado",
        },
        {
          en: `Money spent = (${amountFigurines} * ${prices.figurines}) + (${amountPosters} * ${prices.posters}) + (${amountJersey} * ${prices.jersey}) + (${amountBasketball} * ${prices.basketball}) = ${moneySpent}\nMoney left = ${budget} - ${moneySpent} = ${moneyLeft}`,
          es: `Dinero gastado = (${amountFigurines} * ${prices.figurines}) + (${amountPosters} * ${prices.posters}) + (${amountJersey} * ${prices.jersey}) + (${amountBasketball} * ${prices.basketball}) = ${moneySpent}\nDinero restante = ${budget} - ${moneySpent} = ${moneyLeft}`,
        },
      ],
      "wholeNumber",
      null,
      "level1CourtQ2"
    )
  );

  //   question 3
  // Nikola Jokic and the Denver Nuggets are playing a home game against the New York Knicks. At this game, Nikola claimed his NBA Player of the Month award. If the award trophy is a rectangular plaque that is [6-10] inches long and [2-10] inches wide, what is the area of the trophy in square inches? Hint: rectangle area = length * width.
    const long = randomInt(6, 11);
    const wide = randomInt(2, 11);
    const area = long * wide;
    questions.push(
        createGameQuestion(
            {
                en: `Nikola Jokic and the Denver Nuggets are playing a home game against the New York Knicks. At this game, Nikola claimed his NBA Player of the Month award. If the award trophy is a rectangular plaque that is ${long} inches long and ${wide} inches wide, what is the area of the trophy in square inches? Hint: rectangle area = length * width.`,
                es: `Nikola Jokic y los Denver Nuggets están jugando un partido en casa contra los New York Knicks. En este juego, Nikola reclamó su premio al Jugador del Mes de la NBA. Si el trofeo del premio es una placa rectangular que mide ${long} pulgadas de largo y ${wide} pulgadas de ancho, ¿cuál es el área del trofeo en pulgadas cuadradas? Pista: área del rectángulo = longitud * ancho.`,
            },
            area,
            [
                {
                    en: "Area = length * width",
                    es: "Área = longitud * ancho",
                },
                {
                    en: `Area = ${long} * ${wide} = ${area}`,
                    es: `Área = ${long} * ${wide} = ${area}`,
                }
            ],
            "wholeNumber",
            null,
            null
        )
    );

    //  question 4
    //Erik Spoelstra is the head coach of the Miami Heat. To show gratitude to his players, he spent $[5-9] for each of the [5-10] players and bought them some protein bars. How much money did Erik spend in total?
    const amountPlayers = randomInt(5, 11);
    const amountMoney = randomInt(5, 10);
    const totalMoney = amountPlayers * amountMoney;

    questions.push(
        createGameQuestion(
            {
                en:`Erik Spoelstra is the head coach of the Miami Heat. To show gratitude to his players, he spent $${amountMoney} for each of the ${amountPlayers} players and bought them some protein bars. How much money did Erik spend in total?`,
                es:`Erik Spoelstra es el entrenador en jefe de Miami Heat. Para mostrar gratitud a sus jugadores, gastó $${amountMoney} por cada uno de los ${amountPlayers} jugadores y les compró algunas barras de proteínas. ¿Cuánto dinero gastó Erik en total?`,
            },
            totalMoney,
            [
                {
                    en: "Total money = (# of players * amount of money spent per player)",
                    es: "Dinero total = (# de jugadores * cantidad de dinero gastado por jugador)",
                },
                {
                    en:`Total money = ${amountPlayers} * ${amountMoney} = ${totalMoney}`,
                    es:`Dinero total = ${amountPlayers} * ${amountMoney} = ${totalMoney}`,
                }
            ],
            "wholeNumber",
            null,
            null
        )
    );

    // question 5
    //Anthony Edwards is a star player for the Minnesota Timberwolves. He bought smoothies after practice for his teammates for $[4,6,8] each. If he spent a total of [24,48,72] dollars, how many smoothies did Anthony buy?
    const priceSmoothie = randomChoice([4, 6, 8]);
    const totalSpent = randomChoice([24, 48, 72]);
    const amountSmoothies = totalSpent / priceSmoothie;

    questions.push(
        createGameQuestion(
            {
                en:`Anthony Edwards is a star player for the Minnesota Timberwolves. He bought smoothies after practice for his teammates for $${priceSmoothie} each. If he spent a total of ${totalSpent} dollars, how many smoothies did Anthony buy?`,
                es:`Anthony Edwards es un jugador estrella de los Minnesota Timberwolves. Compró batidos después de la práctica para sus compañeros de equipo por $${priceSmoothie} cada uno. Si gastó un total de ${totalSpent} dólares, ¿cuántos batidos compró Anthony?`,
            },
            amountSmoothies,
            [
                {
                    en:`Amount of smoothies = (Total money spent) / (Price per smoothie)`,
                    es:`Cantidad de batidos = (Dinero total gastado) / (Precio por batido)`,
                },
                {
                    en:`Amount of smoothies = ${totalSpent} / ${priceSmoothie} = ${amountSmoothies}`,
                    es:`Cantidad de batidos = ${totalSpent} / ${priceSmoothie} = ${amountSmoothies}`,
                }
            ],
            "wholeNumber",
            null,
            null
        )
    );

    // question 6
    //There are [3-6] basketball courts at the Charlotte Hornets practice facility. Today the coach assigned [2-7] players to each court for practice and told each player to bring [2-6] basketballs. How many basketballs are there in total?
    const amountCourtsq6 = randomInt(3, 7);
    const amountPlayersq6 = randomInt(2, 8);
    const amountBasketballsq6 = randomInt(2, 7);

    const totalBasketballs = amountCourtsq6 * amountPlayersq6 * amountBasketballsq6;

    questions.push(
        createGameQuestion(
            {
                en:`There are ${amountCourtsq6} basketball courts at the Charlotte Hornets practice facility. Today the coach assigned ${amountPlayersq6} players to each court for practice and told each player to bring ${amountBasketballsq6} basketballs. How many basketballs are there in total?`,
                es:`Hay ${amountCourtsq6} canchas de baloncesto en la instalación de práctica de los Charlotte Hornets. Hoy el entrenador asignó ${amountPlayersq6} jugadores a cada cancha para practicar y le dijo a cada jugador que trajera ${amountBasketballsq6} balones de baloncesto. ¿Cuántas pelotas de baloncesto hay en total?`,
            },
            totalBasketballs,
            [
                {
                    en:`Total basketballs = (# of courts * # of players per court * # of basketballs per player)`,
                    es:`Balones totales = (# de canchas * # de jugadores por cancha * # de balones por jugador)`,
                },
                {
                    en:`Total basketballs = ${amountCourtsq6} * ${amountPlayersq6} * ${amountBasketballsq6} = ${totalBasketballs}`,
                    es:`Balones totales = ${amountCourtsq6} * ${amountPlayersq6} * ${amountBasketballsq6} = ${totalBasketballs}`,
                }
            ],
            "wholeNumber",
            null,
            null
        )
    );

    // question 7
    // An NBA basketball court is a rectangle that is 94 feet long and 50 feet wide. What is the perimeter of an NBA court in feet? 
    const lengthq7 = 94;
    const widthq7 = 50;
    const perimeterq7 = 2 * (lengthq7 + widthq7);

    questions.push(
        createGameQuestion(
            {
                en:`An NBA basketball court is a rectangle that is ${lengthq7} feet long and ${widthq7} feet wide. What is the perimeter of an NBA court in feet?`,
                es:`Una cancha de baloncesto de la NBA es un rectángulo de ${lengthq7} pies de largo y ${widthq7} pies de ancho. ¿Cuál es el perímetro de una cancha de la NBA en pies?`,
            },
            perimeterq7,
            [
                {
                    en:`Perimeter = 2 * (Length + Width) OR length + length + width + width`,
                    es:`Perímetro = 2 * (Largo + Ancho) O largo + largo + ancho + ancho`,
                },
                {
                    en:`Perimeter = 2 * (${lengthq7} + ${widthq7}) = ${perimeterq7}`,
                    es:`Perímetro = 2 * (${lengthq7} + ${widthq7}) = ${perimeterq7}`,
                }
            ],
            "wholeNumber",
            null,
            null
        )
    );


    // question 8
    // Shaquille “Shaq'' O'neal is one of the greatest centers to ever play basketball and Muggsy Bogues is the shortest player to ever play in the NBA. If Shaq is 7 feet 1 inches tall and Muggsy Bogues is 5 feet 3 inches tall, then how many inches taller is Shaq than Muggsy? Hint: 1 foot = 12 inches.
    const heightShaq = 85;
    const heightMuggsy = 63;
    const heightDifference = heightShaq - heightMuggsy;

    questions.push(
        createGameQuestion(
            {
                en:"Shaquille “Shaq'' O'neal is one of the greatest centers to ever play basketball and Muggsy Bogues is the shortest player to ever play in the NBA. If Shaq is 7 feet 1 inches tall and Muggsy Bogues is 5 feet 3 inches tall, then how many inches taller is Shaq than Muggsy? Hint: 1 foot = 12 inches.",
                es:"Shaquille “Shaq'' O'neal es uno de los mejores centros que han jugado al baloncesto y Muggsy Bogues es el jugador más bajo que ha jugado en la NBA. Si Shaq mide 7 pies y 1 pulgada de alto y Muggsy Bogues mide 5 pies y 3 pulgadas de alto, ¿cuántas pulgadas más alto es Shaq que Muggsy? Pista: 1 pie = 12 pulgadas.",
            },
            heightDifference,
            [
                {
                    en:"Height in inches = (height in feet * inches per 1 foot) + remaining inches\nHeight difference = Shaq’s height in inches – Muggsy’s height in inches",
                    es:"Altura en pulgadas = (altura en pies * pulgadas por 1 pie) + pulgadas restantes\nDiferencia de altura = Altura de Shaq en pulgadas - Altura de Muggsy en pulgadas",
                },
                {
                    en:"Shaq Height inches = (7 * 12) + 1 = 85 inches\nMuggsy Height inches = (5 * 12) + 3 = 63 inches\nHeight difference = 85 - 63 = 22 inches",
                    es:"Altura de Shaq en pulgadas = (7 * 12) + 1 = 85 pulgadas\nAltura de Muggsy en pulgadas = (5 * 12) + 3 = 63 pulgadas\nDiferencia de altura = 85 - 63 = 22 pulgadas",
                }
            ],
            "wholeNumber",
            null,
            null
        )
    );


    // question 9
    //An official NBA game has 4 quarter periods and each quarter is 12 minutes long. During Miami Heat’s last home game, Bam Adebayo played the entire game. How many total minutes did Bam play?

    const quartersq9 = 4;
    const minutesq9 = 12;
    const totalMinutesq9 = quartersq9 * minutesq9;

    questions.push(
        createGameQuestion(
            {
                en:"An official NBA game has 4 quarter periods and each quarter is 12 minutes long. During Miami Heat’s last home game, Bam Adebayo played the entire game. How many total minutes did Bam play?",
                es:"Un juego oficial de la NBA tiene 4 períodos de cuarto y cada cuarto dura 12 minutos. Durante el último juego en casa de Miami Heat, Bam Adebayo jugó todo el juego. ¿Cuántos minutos totales jugó Bam?",
            },
            totalMinutesq9,
            [
                {
                    en:"Total minutes = (# of quarters * # of minutes per quarter)",
                    es:"Minutos totales = (# de cuartos * # de minutos por cuarto)",
                },
                {
                    en:`Total minutes = ${quartersq9} * ${minutesq9} = ${totalMinutesq9}`,
                    es:`Minutos totales = ${quartersq9} * ${minutesq9} = ${totalMinutesq9}`,
                }
            ],
            "wholeNumber",
            null,
            null
        )
    );


    // question 10
    // On average Kyrie Irving makes [eight, nine] tenths of his free throws while Zion Williamson makes [six, seven] tenths of his free throws. Of the two former Duke players, who is better at shooting free throws? Type the full name of the right player in the answer box. 
    const kyrieFreeThrows = randomChoice([0.8, 0.9]);
    const zionFreeThrows = randomChoice([0.6, 0.7]);
    const betterFreeThrows = kyrieFreeThrows > zionFreeThrows ? "kyrie irving" : "zion williamson";

    questions.push(
        createGameQuestion(
            {
                en:`On average Kyrie Irving makes ${kyrieFreeThrows*10} tenths of his free throws while Zion Williamson makes ${zionFreeThrows*10} tenths of his free throws. Of the two former Duke players, who is better at shooting free throws? Type the full name of the right player in the answer box.`,
                es:`En promedio, Kyrie Irving hace ${kyrieFreeThrows*10} décimos de sus tiros libres mientras que Zion Williamson hace ${zionFreeThrows*10} décimos de sus tiros libres. De los dos ex jugadores de Duke, ¿quién es mejor para lanzar tiros libres? Escribe el nombre completo del jugador correcto en el cuadro de respuesta.`,
            },
            betterFreeThrows,
            [
                {
                    en:"Compare Kyrie’s fraction of made free throws to Zion’s. Which fraction is bigger?",
                    es:"Compara la fracción de tiros libres de Kyrie con la de Zion. ¿Qué fracción es más grande?",
                },
                {
                    en:`${kyrieFreeThrows*10}/10 > ${zionFreeThrows*10}/10 so Kyrie irving is better at shooting free throws.`,
                }
            ],
            "text",
            null,
            null
        )
    );

    // question 11
    // In the last NBA season, the three highest scoring players in a game were Damian Lillard, Donovan Mitchell, and Luka Doncic. Damian Lillard and Donovan Mitchell each scored 71 points while Luka Doncic scored 60. How many total points were scored by these 3 players?
    const damianPoints = 71;
    const donovanPoints = 71;
    const lukaPoints = 60;
    const totalPoints = damianPoints + donovanPoints + lukaPoints;

    questions.push(
        createGameQuestion(
            {
                en:`In the last NBA season, the three highest scoring players in a game were Damian Lillard, Donovan Mitchell, and Luka Doncic. Damian Lillard and Donovan Mitchell each scored ${damianPoints} points while Luka Doncic scored ${lukaPoints}. How many total points were scored by these 3 players?`,
                es:`En la última temporada de la NBA, los tres jugadores con más puntos en un partido fueron Damian Lillard, Donovan Mitchell y Luka Doncic. Damian Lillard y Donovan Mitchell anotaron ${damianPoints} puntos cada uno, mientras que Luka Doncic anotó ${lukaPoints}. ¿Cuántos puntos totales anotaron estos 3 jugadores?`,
            },
            totalPoints,
            [
                {
                    en:"Total points = Damian Lillard + Donovan Mitchell + Luka Doncic",
                    es:"Puntos totales = Damian Lillard + Donovan Mitchell + Luka Doncic",
                },
                {
                    en:`Total points = ${damianPoints} + ${donovanPoints} + ${lukaPoints} = ${totalPoints}`,
                    es:`Puntos totales = ${damianPoints} + ${donovanPoints} + ${lukaPoints} = ${totalPoints}`,
                }
            ],
            "wholeNumber",
            null,
            null
        )
    );

    // question 12
    // The Portland Trail Blazers won their game against the Houston Rockets in overtime. If the Trail Blazers scored 131 total points and Damian Lillard scored 71 of them, how many more points did Damian score than all of his teammates combined?
    const totalPointsq12 = 131;
    const damianPointsq12 = 71;
    const teammatesPointsq12 = totalPointsq12 - damianPointsq12;
    const differencePointsq12 = damianPointsq12 - teammatesPointsq12;

    questions.push(
        createGameQuestion(
            {
                en:`The Portland Trail Blazers won their game against the Houston Rockets in overtime. If the Trail Blazers scored ${totalPointsq12} total points and Damian Lillard scored ${damianPointsq12} of them, how many more points did Damian score than all of his teammates combined?`,
                es:`Los Portland Trail Blazers ganaron su juego contra los Houston Rockets en tiempo extra. Si los Trail Blazers anotaron ${totalPointsq12} puntos en total y Damian Lillard anotó ${damianPointsq12} de ellos, ¿cuántos puntos más anotó Damian que todos sus compañeros de equipo juntos?`,
            },
            differencePointsq12,
            [
                {
                    en:'Teammates points = Team’s points – Damian’s points\nPoint difference = Damian’s points – Teammates points',
                    es:"Puntos de los compañeros de equipo = Puntos del equipo - Puntos de Damian\nDiferencia de puntos = Puntos de Damian - Puntos de los compañeros de equipo",
                },
                {
                    en:`Teammates points = ${totalPointsq12} - ${damianPointsq12} = ${teammatesPointsq12}\nPoint difference = ${damianPointsq12} - ${teammatesPointsq12} = ${differencePointsq12}`,
                    es:`Puntos de los compañeros de equipo = ${totalPointsq12} - ${damianPointsq12} = ${teammatesPointsq12}\nDiferencia de puntos = ${damianPointsq12} - ${teammatesPointsq12} = ${differencePointsq12}`,
                }
            ],
            "wholeNumber",
            null,
            null
        )
    );

};

export default BasketballL1Questions;
