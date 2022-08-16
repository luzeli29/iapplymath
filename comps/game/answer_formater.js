const AnswerFormater = (format, value) => {
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

export default AnswerFormater