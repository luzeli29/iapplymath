export function AnswerFormater(format, value) {
    switch(format) {
       case "money":
          if(value) {
             return "$" + value + ".00"
          } else {
             return "$0.00"
          }
       default:
          return value
    }
}

//simplifys answer given to allow for correct but different fractions
export function SimplifyAnswer(answer) {
   if(isNaN(answer)) { //answer contains fraction 
      var numer = answer.split("/")[0]
      var dinomi = answer.split("/")[1]
      return SimplifyFraction(numer,dinomi)
   } else {
      return answer //if no fraction, answer is simple as it gets
   }
}

//Helper function to simplify fractions
export function SimplifyFraction(number,denomin) {
      if((number/denomin)% 1 == 0) {
         return number/denomin
      } else {
         var gcd = function gcd(a,b){
            return b ? gcd(b, a%b) : a;
         };
         gcd = gcd(number,denomin);
         return number/gcd + "/" + denomin/gcd;
      }
}