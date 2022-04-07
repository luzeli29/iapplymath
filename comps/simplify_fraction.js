const SimplifyFraction = (number,denomin) => {
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

export default SimplifyFraction