//Given an anser, it simplifys the answer to the smallest fraction
export const SimplifyAnswer = (answer) => {
    //answer is a string, thus contains fraction 
    //TODO: THIS IS BAD LOGIC! Have it first detect if there is a fraction then do stuff to it
    if(isNaN(answer)) { 
       var numer = answer.split("/")[0]
       var dinomi = answer.split("/")[1]
       return SimplifyFraction(numer,dinomi)
    } else {
        //if no fraction, answer is simple as it gets
       return answer 
    }
 }
 
 export default SimplifyAnswer

//TODO: Change Value to a string or enum
export const AnswerFormater = (format, value) => {
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

//Helper function to simplify fractions
//TODO: There has to be a better way to do this, maybe js has something similar?
export const SimplifyFraction = ({number,denomin}) => {
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
 