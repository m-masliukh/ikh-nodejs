const express = require('express');
const app = express();
const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server started at port: " + PORT + " and works at localhost:" + PORT))