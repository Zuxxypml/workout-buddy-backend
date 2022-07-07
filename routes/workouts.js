const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

// Get and Post Workouts
router.route("/").get(getWorkouts).post(createWorkout);

// Gets a Workout  and Deletes a workout and Updates
router.route("/:id").get(getWorkout).delete(deleteWorkout).patch(updateWorkout);

module.exports = router;
