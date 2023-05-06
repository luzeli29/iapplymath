import { err, log } from "@utils/debug/log";
import { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import { randomBytes } from "crypto";
const defaultSeed = '42'

export default function useSeededRandom(initSeed) {
    const [seed, setSeed] = useState(initSeed)
    const [hashedSeed, setHashedSeed] = useState([]);
    const [loading, setLoading] = useState(true)
    let randFunction = null;

    useEffect(() => {
        if (!seed) {
            generateSeed()
        } else {
            setLoading(false)
        }
    }, [seed])

    // hash function from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    // Difference, this is a 128 bit hash, not 64
    // used to hash the seed for use in seedrandom
    function hashSTR(str) {
        let h1 = 1779033703, h2 = 3144134277,
            h3 = 1013904242, h4 = 2773480762;
        for (let i = 0, k; i < str.length; i++) {
            k = str.charCodeAt(i);
            h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
            h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
            h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
            h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
        }
        h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
        h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
        h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
        h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
        return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
    }


    // seedrandom function from
    // https://pracrand.sourceforge.net/
    function sfc32(a, b, c, d) {
        return function() {
          a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
          var t = (a + b) | 0;
          a = b ^ b >>> 9;
          b = c + (c << 3) | 0;
          c = (c << 21 | c >>> 11);
          d = d + 1 | 0;
          t = t + d | 0;
          c = c + t | 0;
          return (t >>> 0) / 4294967296;
        }
    }



    function generateSeed() {
        const generatedSeed = randomBytes(8).toString("hex");
        const hshdSeed = hashSTR(generatedSeed)
        log('Generated seed ' + generatedSeed + ' for useSeededRandom().')
        log('Hashed seed ' + hshdSeed + ' for useSeededRandom().');
        setSeed(generatedSeed)
        setHashedSeed(hshdSeed)
    }

    function checkSeed() {
        if (!seed) {
            log('No "seed" was defined in useSeededRandom() hook.')
            generateSeed()
            randFunction = sfc32(hashedSeed[0], hashedSeed[1], hashedSeed[2], hashedSeed[3])
        }
    }

    function checkRand() {
        if (!randFunction) {
            checkSeed()
            randFunction = sfc32(hashedSeed[0], hashedSeed[1], hashedSeed[2], hashedSeed[3])
        }
    }

    function getRandom() {
        checkSeed()
        checkRand()
        let randomNumberFromSeed = randFunction()
        log('Random number generated: ' + randomNumberFromSeed)
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
        randomGenerator: randomGenerator
    }
}

