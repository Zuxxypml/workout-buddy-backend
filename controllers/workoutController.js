const { default: mongoose } = require("mongoose");
const Workout = require("../models/Workouts");

// Gets All Workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  res.status(200).json({ msg: workouts });
};

// Creates A New Workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  let emptyFieldsArray = [];
  if (!title) {
    emptyFieldsArray.push("title");
  } else if (!load) {
    emptyFieldsArray.push("load");
  } else if (!reps) {
    emptyFieldsArray.push("reps");
  }

  if (emptyFieldsArray > 0) {
    return res
      .status(400)
      .json({ error: "Please all fields are required", emptyFieldsArray });
  }

  // add to the database
  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: "Please all Fields are required" });
  }
};

// Gets A Single Workout Document
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};
// Deletes A Workout Document
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};
// Update A Workout Doc
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// Exporting Controllers
module.exports = {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
};
