import { err, log } from "@utils/debug/log";
import { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import { randomBytes } from "crypto";
const defaultSeed = '42'

export default function useSeededRandom(initSeed) {
    const [seed, setSeed] = useState(initSeed)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!seed) {
            generateSeed()
        } else {
            setLoading(false)
        }
    }, [seed])

    function generateSeed() {
        const generatedSeed = randomBytes(4).toString("hex");
        log('Generated seed ' + generatedSeed + ' for useSeededRandom().')
        setSeed(generatedSeed)
    }

    function checkSeed() {
        if(!seed) {
            log('No "seed" was defined in useSeededRandom() hook.')
            generateSeed()
        }
    }

    function getRandom() {
        /*
        checkSeed()
        const seedRng = seedrandom(seed);
        return seedRng()
        */
       return Math.random()
    }

    function randomInt(min, max) {
        if(max == undefined || max <= 0) {
            return 0
        }
    
        if(min == undefined || min <= 0) {
            return Math.floor(getRandom()*max)
        }
    
        return Math.floor(getRandom() * (max - min) + min);
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

    const randomGenerator = {
        randomInt: randomInt,
        randomHr: randomHr,
        randomDishType: randomDishType
    }

    return {
        loading: loading,
        seed: seed,
        randomGenerator:randomGenerator
    }
}

