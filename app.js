var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var config = require("./config.js");


app.use(express.static(__dirname + '/public'));




app.listen(config.PORT, function() {
  console.log("Listening on port " + config.PORT);
});
