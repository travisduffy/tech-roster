const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sanitizer = require("express-sanitizer");
const app = express();

// Enable .env variables
require('dotenv').config()

const PORT = process.env.PORT || 8080;

// ------------------------------------------------------------------------------------ Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(sanitizer());

// For deployment
//app.use(express.static('./dist'));

// ------------------------------------------------------------------------------------ Routes
app.use("/get", require("./routes/get"));
app.use("/techs", require("./routes/techs"));
app.use("/courses", require("./routes/courses"));

//--- Start server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
