const { err } = require("@utils/debug/devLog");

function fillTextTags(text, tags) {
  let filledText = text;
  for (var key in tags) {
    if (tags.hasOwnProperty(key)) {
      var keyTag = "%" + key.toUpperCase() + "%";
      filledText = filledText.replace(new RegExp(keyTag, "g"), tags[key]);
    }
  }
  return filledText;
}



export default fillTextTags