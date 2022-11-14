const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to test application." });
});

require("./routes/proposal.routes")(app);
require("./routes/contact.routes")(app);
require("./routes/news.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started at: ${process.env.HOST_URL}`))

const db = require("./models");
db.sequelize.sync();
