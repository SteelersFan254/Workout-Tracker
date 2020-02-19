const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

// Sets up port for server, either on Heroku or localhost:3000.
const PORT = process.env.PORT || 3000;

const app = express();

// This requires all of our models and seeder.
const db = require("./models");
// const seeder = require("./seeders");


app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// MongoDB_URI referenced in .env
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//Create New exercises in the databasedb.Workout.create({})



// Require the routes so the app knows what to load
require("./backend/api-routes.js")(app);
require("./backend/routes.js")(app);

// Start the server
app.listen(PORT, () => {
    console.log(`App running on http://localhost${PORT}`);
});