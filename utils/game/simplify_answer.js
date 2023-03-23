import { simplifyFraction } from "@common_imports"

//simplifys answer given to allow for correct but different fractions
export default function simplifyAnswer(answer) {
    if(answer.includes(':')){ //Answer is written as time 00:00AM
        if(answer[0] === '0'){ //removes the 0 if written as 01:15PM so it registers as 1:15PM
            answer = answer.slice(1);
        }
        return answer;
    }
    //double check if answer.split works properly for >=, <=
    else if(answer.includes('<') || answer.includes('>') || answer.includes("=")){
        const inequalityArray = answer.split(/([<>=])/);
        for (let i = 0; i < inequalityArray.length; i++) {
            if (inequalityArray[i].includes("/")) {
                const [numerator, denominator] = inequalityArray[i].split("/");
                const simplifiedFraction = simplifyFraction(parseInt(numerator), parseInt(denominator));
                inequalityArray[i] = simplifiedFraction;
            }
        }
        //swaps order (if num2 > num) so that it's always num < num2
        if(inequalityArray[1] === '>'){
            let firstNum = inequalityArray[0];
            inequalityArray[0] = inequalityArray[2];
            inequalityArray[2] = firstNum
            inequalityArray[1] = '<';
        }
        console.log(inequalityArray);
        return inequalityArray.join('');
    }
    else if(isNaN(answer)) { //answer contains fraction
       var numer = answer.split("/")[0]
       var dinomi = answer.split("/")[1]
        console.log("n: " + numer + " d: " + dinomi)
       return simplifyFraction(numer, dinomi)
    } else {
       return answer //if no fraction, answer is simple as it gets
    }
 }
 