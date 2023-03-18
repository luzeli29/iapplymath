import { simplifyFraction } from "@utils/imports/commonImports"

//simplifys answer given to allow for correct but different fractions
export default function simplifyAnswer(answer) {
    if(isNaN(answer)) { //answer contains fraction 
       var numer = answer.split("/")[0]
       var dinomi = answer.split("/")[1]
       return simplifyFraction(numer, dinomi)
    } else {
       return answer //if no fraction, answer is simple as it gets
    }
 }
 