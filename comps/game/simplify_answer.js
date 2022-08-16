import SimplifyFraction from "./simplify_fraction"
//simplifys answer given to allow for correct but different fractions
const SimplifyAnswer = (answer) => {
   if(isNaN(answer)) { //answer contains fraction 
      var numer = answer.split("/")[0]
      var dinomi = answer.split("/")[1]
      return SimplifyFraction(numer,dinomi)
   } else {
      return answer //if no fraction, answer is simple as it gets
   }
}

export default SimplifyAnswer