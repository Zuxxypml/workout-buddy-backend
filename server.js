//Creating Prerequisites
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;
app.use((req, res, next) => {
  const corsWhitelist = [
    "https://zuxxy-workout-buddy.netlify.app",
    "http://localhost:3000",
  ];
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  }

  next();
});

// Middleware
app.use(express.json());

//Routes
app.use("/api/workouts", workoutRoutes);

// Initiating Database Connection
async function run() {
  await mongoose.connect(process.env.MONGO_URI);
}
run()
  .then((d) => {
    console.log("Connected to DB");
    //Listener
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.log("Unable to connect to Database");
  });
