var db = require("../models");

// Routes
module.exports = function(app) {

  // GET route for getting all of the requests
  app.get("/api/requests/", function(req, res) {
    // Sequelize code to find all requests, and return them to the user with res.json
    db.Request.findAll({}).then(function(dbRequest) {
      res.json(dbRequest);
    });
  });

  // POST route for saving a new request
  app.post("/api/requests/", function(req, res) {
    db.Request.create({
      storeName: req.body.storeName,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      dates: req.body.dates,
      comments: req.body.comments
    }).then(function(dbRequest) {
      res.json(dbRequest);
    });
  });
};
