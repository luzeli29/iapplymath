import { randomBytes } from "crypto";
import hashSTR from "@utils/crypto/hashSTR";
import sfc32 from "@utils/crypto/sfc32";

const serverSeededRandom = (initSeed) => {
    let seed = initSeed ? initSeed : randomBytes(8).toString("hex");
    let hashedSeed = hashSTR(seed)
    let randFunction = sfc32(hashedSeed[0], hashedSeed[1], hashedSeed[2], hashedSeed[3])


    function getRandom() {
        const randomNumberFromSeed = randFunction()
        return randomNumberFromSeed
    }

    function randomInt(min, max) {
        if (max == undefined || max <= 0) {
            return 0
        }

        if (min == undefined || min <= 0) {
            return Math.floor(getRandom() * max)
        }

        return Math.floor(getRandom() * (max - min) + min);
    }

    const hoursArray = [12, 1, 2, 3, 4, 5, 6];

    const randomHr = () => {
        const randVar = Math.floor(getRandom() * (hoursArray.length));
        return hoursArray[randVar];
    }

    const randomDishType = () => {
        const rand = Math.floor(getRandom() * 3)
        switch (rand) {
            case 0: return 'mainDish'
            case 1: return 'drink'
            case 2: return 'dessert'
        }
    }

    const randomSchoolTopic = () => {
        const rand = Math.floor(getRandom() * 4)
        switch (rand) {
            case 0: return 'addition'
            case 1: return 'subtraction'
            case 2: return 'multiplication'
            case 3: return 'division'
        }
    }
    
    const randomGenerator = {
        seed: seed,
        getRandom: getRandom,
        randomInt: randomInt,
        randomHr: randomHr,
        randomDishType: randomDishType,
        randomSchoolTopic: randomSchoolTopic
    }

    return {
        seed: seed,
        randomGenerator: randomGenerator
    }
}

export default serverSeededRandom