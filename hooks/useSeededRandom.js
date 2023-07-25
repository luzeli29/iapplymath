import { use, useEffect, useState } from "react";
import { randomBytes } from "crypto";
import hashSTR from "@utils/crypto/hashSTR";
import sfc32 from "@utils/crypto/sfc32";

const useSeededRandom = (initSeed) => {
    const [seed, setSeed] = useState(initSeed)
    const [hashedSeed, setHashedSeed] = useState([]);
    const [loading, setLoading] = useState(true)
    let randFunction = null;

    useEffect(() => {
        if (!seed) {
            generateSeed()
        } else {
            setHashedSeed(hashSTR(seed))
            randFunction = sfc32(hashedSeed[0], hashedSeed[1], hashedSeed[2], hashedSeed[3])
            setLoading(false)
            if(!hashedSeed) {
                setHashedSeed(hashSTR(seed))
            }
        }
    }, [seed])

    const generateSeed = () => {
        const generatedSeed = randomBytes(8).toString("hex");
        setSeed(generatedSeed)
        setHashedSeed(hashSTR(generatedSeed))
        randFunction = sfc32(hashedSeed[0], hashedSeed[1], hashedSeed[2], hashedSeed[3])
    }

    const checkSeed = () => {
        if (!seed) {
            generateSeed()
        }
    }


    const getRandom = () => {
        checkSeed()
        // checkHashedSeed()
        // checkRand()
        let randomNumberFromSeed = randFunction()
        return randomNumberFromSeed
    }

    const randomInt = (min, max) => {
        if (max == undefined || max <= 0) {
            return 0
        }

        if (min == undefined || min <= 0) {
            return Math.floor(getRandom() * max)
        }

        return Math.floor(getRandom() * (max - min) + min);
    }

    const randomFloat = (min, max) => {
        if (max == undefined || max <= 0) {
            return 0
        }

        if (min == undefined || min <= 0) {
            return getRandom() * max
        }

        return getRandom() * (max - min) + min;
    }


    const hoursArray = [12, 1, 2, 3, 4, 5, 6];

    function randomHr() {
        const randVar = Math.floor(getRandom() * (hoursArray.length));
        return hoursArray[randVar];
    }

    function randomDishType() {
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
        randomInt: randomInt,
        randomHr: randomHr,
        randomDishType: randomDishType,
        randomSchoolTopic: randomSchoolTopic,
        randomFloat: randomFloat,
    }

    return {
        loading: loading,
        seed: seed,
        randomGenerator: randomGenerator
    }
}

export default useSeededRandom