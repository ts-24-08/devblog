const e = require("express");

function validator(
  title,
  content,
  teaser,
  date,
  author,
  imagepath,
  imagealt,
  tags,
  response
) {
  // Error Handling
  let missingField = [];
  !title ? missingField.push("Title") : null;
  !content ? missingField.push("Content") : null;
  !teaser ? missingField.push("Teaser") : null;
  !date ? missingField.push("Date") : null;
  !author ? missingField.push("Author") : null;
  !imagepath ? missingField.push("Image Path") : null;
  !imagealt ? missingField.push("Image Alt") : null;
  !tags ? missingField.push("Tags") : null;

  return {
    error: missingField.length > 0,
    message: "Missing Fields: " + missingField.join(", "),
  };
}

module.exports = validator;
