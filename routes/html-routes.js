//Dependencies
var path = require("path");

//Routes
module.exports = function(app) {

  //Index route loads form.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/form.html"));
  });

  //Route to the current-requests page 
  app.get("/current-requests", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/requests.html"));
  });

};
