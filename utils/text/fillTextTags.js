const { err } = require("@utils/debug/log");

function fillTextTags(text, tags) {

  const filledText = text;


  var regex = /%([^%]+)%/g;
  var keys = [];
  var match;
  
  while ((match = regex.exec(text)) !== null) {
    console.log(match[1])
    keys.push(match[1]);
  }
  console.log(keys)

  return filledText;
}



export default fillTextTags