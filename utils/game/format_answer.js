export default function formatAnswer(format, value) {
    switch(format) {
       case "money":
          if(value) {
             return "$" + Number(value).toFixed(2)
          } else {
             return "$0.00"
          }
        case "numb":
          //todo: add error catching for diff formats
       default:
          return value
    }
}