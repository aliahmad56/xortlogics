const env = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoutes");
const db = require('./config/db.config'); // db connection
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Enable CORS for all routes
app.use(cors());
// Hafizo sar bshar korelik
// Routes
app.use('/api', userRoutes);

// Listen for MongoDB events
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected to the database!");
});



const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
