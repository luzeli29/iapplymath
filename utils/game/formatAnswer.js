export default function formatAnswer(format, value) {
    switch(format) {
       case "money":
          if(value) {
             return "$" + Number(value) + ".00"
          } else {
             return "$0.00"
          }
        case "decimal":
            if(value) {
                return Number(value).toFixed(2)
            } else {
                return "0.00"
            }
        case "decimalMoney":
            if(value) {
                return "$" + Number(value).toFixed(2)
            } else {
                return "0.00"
            }
        case "timeNum":
            if(value) {
                return value;
            } else {
                return "00:00"
            }
        case "equality":
            if(value) {
                return value;
            } else {
                return "0<1"
            }
        case "numb":
          //todo: add error catching for diff formats
       default:
          return value
    }
}