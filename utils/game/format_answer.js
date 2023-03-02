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
        case "numb":
          //todo: add error catching for diff formats
       default:
          return value
    }
}