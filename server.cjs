const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
var fs = require('fs');
var sys = require('sys');
var engines = require('consolidate');
var path = require ('path');

const app = express();
dotenv.config();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.logger());
app.set("view options", {layout: false});
app.use(express.static(path.join(__dirname + '/views')));
app.use("/controllers", express.static('./controllers/'));
app.use("/models", express.static('./models/'));
app.use("/business-logic", express.static('./business-logic/'));
app.engine('html', engines.mustache);
app.set('view engine', 'html');

// simple route
app.get('/', function(req, res){
  res.render('index.html');
});

app.get('/sheet-api', function(req, res){
  res.render('sheet-api.html');
});

app.get('/gmail-api', function(req, res){
  res.render('gmail-api.html');
});

app.get('/forms', function(req, res){
  res.render('forms.html');
});


require("./routes/proposal.routes.cjs")(app);
require("./routes/contact.routes.cjs")(app);
require("./routes/news.routes.cjs")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started at: ${process.env.HOST_URL}`))

const db = require("./models/index.cjs");
db.sequelize.sync();
