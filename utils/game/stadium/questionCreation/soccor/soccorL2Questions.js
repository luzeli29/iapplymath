import createGameQuestion from "@utils/game/quiz/questionGeneration/createGameQuestion";
import { ErrorQuestion } from "@utils/game/quiz/questionGeneration/createGameQuestion";

const SoccorL2Questions = (questions, randomGenerator) => {
    
    const { randomInt, randomFloat } = randomGenerator;

    const q2Friends = randomInt(2, 6);
    const q2TicketPrice = randomFloat(125, 350);
    const q2Answer = q2TicketPrice * (q2Friends + 1);

    questions.push(createGameQuestion(
        {
            en: `You and ${q2Friends} other friends are buying tickets to go see your favorite soccer team. On the team website, the price for one ticket is $${q2TicketPrice}. How much money do you need to buy tickets for you and your friends?`,
            es: `Tú y otros ${q2Friends} amigos están comprando boletos para ir a ver a tu equipo de fútbol favorito. En el sitio web del equipo, el precio de un boleto es de $${q2TicketPrice}. ¿Cuánto dinero necesitas para comprar boletos para ti y tus amigos?`
        },
        q2Answer,
        [
            {
                en: 'Total people = friends + you \n Total price = price of one ticket * total people',
                es: 'Total de personas = amigos + tú \n Precio total = precio de una entrada * total de personas'
            },
            {
                en: `Total people = ${q2Friends} + 1 = ${q2Friends + 1} \n Total price = ${q2TicketPrice} * ${q2Friends + 1} = ${q2Answer}`,
                es: `Total de personas = ${q2Friends} + 1 = ${q2Friends + 1} \n Precio total = ${q2TicketPrice} * ${q2Friends + 1} = ${q2Answer}`
            },
        ],
        'decimal', 
        null,
        null
    ));

    const q3MinutesPlayed = randomInt(400, 600);
    const q3NumGames = randomInt(7, 9);
    const q3Answer = (q3MinutesPlayed / q3NumGames).toFixed(1);

    questions.push(createGameQuestion(
        {
            en: `You are the star player on your school’s soccer team! This season, you played for a total of ${q3MinutesPlayed} minutes. If you played ${q3NumGames} games, estimate how many minutes you played per game this season. Round your answer to the nearest tenth.`,
            es: `Eres la estrella del equipo de fútbol de tu escuela. Esta temporada, jugaste un total de ${q3MinutesPlayed} minutos. Si jugaste ${q3NumGames} partidos, estima cuántos minutos jugaste por partido esta temporada. Redondea tu respuesta al décimo más cercano.`
        },
        q3Answer,
        [
            {
                en: 'Total minutes = time played / total number of games played',
                es: 'Minutos totales = tiempo jugado / número total de juegos jugados'
            },
            {
                en: `Total minutes = ${q3MinutesPlayed} / ${q3NumGames} = ${q3Answer}`,
                es: `Minutos totales = ${q3MinutesPlayed} / ${q3NumGames} = ${q3Answer}`
            },
        ],
        'decimal', 
        null,
        null
    ));

    const q4Shots = randomInt(300, 400);
    const q4FractionList = ['3/5', '4/5'];
    const q4Fraction = q4FractionList[randomInt(0, 1)];
    const q4Saves = Math.floor(q4Shots * eval(q4Fraction));

    questions.push(createGameQuestion(
        {
            en: `Ederson Moraes is a goalie for Manchester City and Brazil’s national soccer team. When a goalie blocks an opponent’s shot, it is called a save. On average, Ederson saves about ${q4Fraction} of all shots in a game. If Ederson faced a total of ${q4Shots} shots this season, how many saves did he make? Round down to the nearest whole number.`,
            es: `Ederson Moraes es portero del Manchester City y del equipo nacional de fútbol de Brasil. Cuando un portero bloquea el tiro de un oponente, se llama parada. En promedio, Ederson para alrededor de ${q4Fraction} de todos los tiros en un partido. Si Ederson enfrentó un total de ${q4Shots} tiros esta temporada, ¿cuántas paradas hizo? Redondea hacia abajo al número entero más cercano.`
        },
        q4Saves,
        [
            {
                en: 'Total saves = total shots * fraction of shoots blocked',
                es: 'Paradas totales = tiros totales * fracción de tiros bloqueados'
            },
            {
                en: `Total saves = ${q4Shots} * ${q4Fraction} = ${q4Saves}`,
                es: `Paradas totales = ${q4Shots} * ${q4Fraction} = ${q4Saves}`
            },
        ],
        'wholeNumber', 
        null,
        null
    ));

    const q5MaxSpeed = randomInt(30, 34);
    const q5MaxSpeedKmPerMin = (q5MaxSpeed / 60).toFixed(1);

    questions.push(createGameQuestion(
        {
            en: `Son Heung-min is a Korean soccer star. During sprints he can reach a maximum speed of ${q5MaxSpeed} kilometers per hour (km/h). What is his maximum speed in kilometers per minute (km/min)? Hint: 1 hour = 60 min.`,
            es: `Son Heung-min es una estrella del fútbol coreano. Durante los sprints el puede alcanzar una velocidad máxima de ${q5MaxSpeed} kilómetros por hora (km/h). ¿Cuál es su velocidad máxima en kilómetros por minuto (km/min)? Pista: 1 hora = 60 min.`
        },
        q5MaxSpeedKmPerMin,
        [
            {
                en: 'Max speed km/min = max speed km/h / minutes per 1 hour',
                es: 'Velocidad máxima km/min = velocidad máxima km/h / minutos por 1 hora'
            },
            {
                en: `Max speed km/min = ${q5MaxSpeed} / 60 = ${q5MaxSpeedKmPerMin}`,
                es: `Velocidad máxima km/min = ${q5MaxSpeed} / 60 = ${q5MaxSpeedKmPerMin}`
            },
        ],
        'decimal', 
        null,
        null
    ));

    const q6NumGames = randomInt(3, 5);
    const q6NumMinutes = randomInt(55, 90);
    const q6TotalSeconds = q6NumGames * q6NumMinutes * 60;

    questions.push(createGameQuestion(
        {
            en: `Kylian Mbappé played ${q6NumGames} games last week. In each game, he played ${q6NumMinutes} minutes. How many total seconds did he play last week? Hint: 1 minute = 60 seconds.`,
            es: `Kylian Mbappé jugó ${q6NumGames} partidos la semana pasada. En cada partido, jugó ${q6NumMinutes} minutos. ¿En total, cuántos segundos jugó la semana pasada? Pista: 1 minuto = 60 segundos.`
        },
        q6TotalSeconds,
        [
            {
                en: 'Total minutes = number of games * minutes per 1 game \n Total seconds = total minutes * seconds per 1 minute',
                es: 'Minutos totales = número de juegos * minutos por 1 juego \n Segundos totales = minutos totales * segundos por 1 minuto'
            },
            {
                en: `Total minutes = ${q6NumGames} * ${q6NumMinutes} = ${q6NumGames * q6NumMinutes} \n Total seconds = ${q6NumGames * q6NumMinutes} * 60 = ${q6TotalSeconds}`,
                es: `Minutos totales = ${q6NumGames} * ${q6NumMinutes} = ${q6NumGames * q6NumMinutes} \n Segundos totales = ${q6NumGames * q6NumMinutes} * 60 = ${q6TotalSeconds}`
            },
        ],
        'wholeNumber', 
        null,
        null
    ));

    const q7MaxSpeedMeters = randomInt(3100, 3500);
    const q7MaxSpeedKmPerHour = (q7MaxSpeedMeters / 1000).toFixed(1);

    questions.push(createGameQuestion(
        {
            en: `Neymar’s maximum speed is ${q7MaxSpeedMeters} meters per hour. What is his maximum speed in kilometers per hour? Round to the nearest tenth. Hint: 1 kilometer (km) = 1,000 meters (m).`,
            es: `La velocidad máxima de Neymar es de ${q7MaxSpeedMeters} metros por hora. ¿Cuál es su velocidad máxima en kilómetros por hora? Redondea al décimo más cercano. Pista: 1 kilómetro (km) = 1,000 metros (m).`
        },
        q7MaxSpeedKmPerHour,
        [
            {
                en: 'Total speed km/h = max speed in meters / meters per 1 km',
                es: 'Velocidad total km/h = velocidad máxima en metros / metros por 1 km'
            },
            {
                en: `Total speed km/h = ${q7MaxSpeedMeters} / 1000 = ${q7MaxSpeedKmPerHour}`,
                es: `Velocidad total km/h = ${q7MaxSpeedMeters} / 1000 = ${q7MaxSpeedKmPerHour}`
            },
        ],
        'decimal', 
        null,
        null
    ));

    const q8MatchTimeEST = randomInt(10, 11) + ':' + (randomInt(0, 1) === 0 ? '00' : '30');
    const q8QatarTimeHour = parseInt(q8MatchTimeEST.split(':')[0]) + 7;
    const q8QatarTimeMin = parseInt(q8MatchTimeEST.split(':')[1]);
    const q8QatarTime = `${q8QatarTimeHour}:${q8QatarTimeMin < 10 ? '0' + q8QatarTimeMin : q8QatarTimeMin}`;

    questions.push(createGameQuestion(
        {
            en: `To watch a World Cup match, you have to calculate the time zone difference. The last World Cup was played in Qatar. If you live on the east coast, and the match began at ${q8MatchTimeEST} AM Eastern Standard Time (EST), at what time did the match start in Qatar? Hint: Qatar time zone is 7 hours ahead of EST.`,
            es: `Para ver un partido de la Copa del Mundo, tienes que calcular la diferencia horaria. La última Copa del Mundo se jugó en Qatar. Si vives en la costa este de Estados Unidos y el partido comenzó a las ${q8MatchTimeEST} AM hora estándar del este (EST), ¿a qué hora comenzó el partido en Qatar? Pista: la zona horaria de Qatar está 7 horas adelantada respecto a EST.`
        },
        q8QatarTime,
        [
            {
                en: 'Qatar time = match time EST + time zone difference to Qatar',
                es: 'Hora de Qatar = hora del partido EST + diferencia de zona horaria con Qatar'
            },
            {
                en: `Qatar time = ${q8MatchTimeEST} + 7 hours = ${q8QatarTime}`,
                es: `Hora de Qatar = ${q8MatchTimeEST} + 7 horas = ${q8QatarTime}`
            },
        ],
        'text',
        null,
        null
    ));

    const q10LengthMeters = randomInt(64, 72);
    const q10WidthMeters = randomInt(32, 36);
    const q10AreaCm2 = q10LengthMeters * 100 * q10WidthMeters * 100;

    questions.push(createGameQuestion(
        {
            en: `A soccer field size has a rectangular shape and its size is determined by the players’ age. The under 12 (U-12) league plays on a field with a length of ${q10LengthMeters} meters and a width of ${q10WidthMeters} meters. What is the area of the U-12 soccer field in square centimeters (cm2)? Hint: 1 meter (m) = 100 centimeters (cm).`,
            es: `Un campo de fútbol tiene una forma rectangular y su tamaño está determinado por la edad de los jugadores. La liga sub-12 juega en un campo con una longitud de ${q10LengthMeters} metros y una anchura de ${q10WidthMeters} metros. ¿Cuál es el área del campo de fútbol sub-12 en centímetros cuadrados (cm2)? Pista: 1 metro (m) = 100 centímetros (cm).`
        },
        q10AreaCm2,
        [
            {
                en: 'Length in cm = length in m * cm per 1 meter \n Width in cm = width in m * cm per 1 meter \n Area = length * width',
                es: 'Longitud en cm = longitud en m * cm por 1 metro \n Ancho en cm = ancho en m * cm por 1 metro \n Área = longitud * ancho'
            },
            {
                en: `Length in cm = ${q10LengthMeters} * 100 = ${q10LengthMeters * 100} \n Width in cm = ${q10WidthMeters} * 100 = ${q10WidthMeters * 100} \n Area = ${q10LengthMeters * 100} * ${q10WidthMeters * 100} = ${q10AreaCm2} (in cm2)`,
                es: `Longitud en cm = ${q10LengthMeters} * 100 = ${q10LengthMeters * 100} \n Ancho en cm = ${q10WidthMeters} * 100 = ${q10WidthMeters * 100} \n Área = ${q10LengthMeters * 100} * ${q10WidthMeters * 100} = ${q10AreaCm2} (en cm2)`
            },
        ],
        'wholeNumber', 
        null,
        null
    ));

    const q11LargeArea = 2925;
    const q11LargeLength = 65;
    const q11SmallLength = 39;
    const q11SmallWidth = Math.floor((q11LargeArea / q11LargeLength) * (3 / 5));
    const q11SmallArea = q11SmallLength * q11SmallWidth;

    questions.push(createGameQuestion(
        {
            en: `There are two soccer fields in your neighborhood. The larger field has an area of ${q11LargeArea} square meters and a length of ${q11LargeLength} meters. The smaller field has a length of ${q11SmallLength} and a width that is 3/5 of the width of the larger field. What is the area of the smaller field in square meters? Hint: rectangle area = length * width`,
            es: `Hay dos campos de fútbol en tu vecindario. El campo más grande tiene un área de ${q11LargeArea} metros cuadrados y una longitud de ${q11LargeLength} metros. El campo más pequeño tiene una longitud de ${q11SmallLength} metros y una anchura que es 3/5 de la anchura del campo más grande. ¿Cuál es el área del campo más pequeño en metros cuadrados? Pista: el área del rectángulo = longitud * anchura.`
        },
        q11SmallArea,
        [
            {
                en: 'Large Width = area large field / length of large field \n Small Width = large field width * size ratio \n Area of Small Field = small length * small width',
                es: 'Ancho grande = área de campo grande / longitud de campo grande \n Ancho pequeño = ancho grande * fracción de tamaño \n Área de campo pequeño = longitud pequeño * ancho pequeño'
            },
            {
                en: `Large Width = ${q11LargeArea} / ${q11LargeLength} = ${q11LargeArea / q11LargeLength} \n Small Width = ${q11LargeArea / q11LargeLength} * 3/5 = ${q11SmallWidth} \n Area of Small Field = ${q11SmallLength} * ${q11SmallWidth} = ${q11SmallArea} m2`,
                es: `Ancho grande = ${q11LargeArea} / ${q11LargeLength} = ${q11LargeArea / q11LargeLength} \n Ancho pequeño = ${q11LargeArea / q11LargeLength} * 3/5 = ${q11SmallWidth} \n Área de campo pequeño = ${q11SmallLength} * ${q11SmallWidth} = ${q11SmallArea} m2`
            },
        ],
        'wholeNumber',
        null,
        null
    ));

    const q12PremierLeagueArea = 105 * 68;
    const q12AreaFractionList = [1/2, 3/4, 4/5, 5/6];
    const q12AreaFraction = q12AreaFractionList[randomInt(0, 3)];
    const q12YourFieldArea = (q12PremierLeagueArea * q12AreaFraction).toFixed(1);

    questions.push(createGameQuestion(
        {
            en: `Premier League club teams typically play on rectangular soccer fields with the following dimensions: 105 meters by 68 meters. If your soccer team’s field area is ${q12AreaFraction} that of the Premier League’s field, what is the area of your team’s field?`,
            es: `Los equipos de clubes de la Premier League suelen jugar en campos de fútbol rectangulares con las siguientes dimensiones: 105 metros por 68 metros. Si el área del campo de fútbol de tu equipo es ${q12AreaFraction} de la del campo de la Premier League, ¿cuál es el área del campo de tu equipo?`
        },
        q12YourFieldArea,
        [
            {
                en: 'Premier League Area = length * width \n Your Field Area = premier league area * area fraction',
                es: 'Área de la Premier League = longitud * ancho \n Área de tu campo = área de la Premier League * fracción de área'
            },
            {
                en: `Premier League Area = 105 * 68 = ${q12PremierLeagueArea} m2 \n Your Field Area = ${q12PremierLeagueArea} * ${q12AreaFraction} = ${q12YourFieldArea} m2`,
                es: `Área de la Premier League = 105 * 68 = ${q12PremierLeagueArea} m2 \n Área de tu campo = ${q12PremierLeagueArea} * ${q12AreaFraction} = ${q12YourFieldArea} m2`
            },
        ],
        'decimal',
        null,
        null
    ));
}

export default SoccorL2Questions;