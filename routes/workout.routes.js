const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Workout = require("../models/Workout.model");
const Task = require("../models/Task.model");


router.post("/workouts", (req, res, next) => {
  const { title, reps,load } = req.body;

  Workout.create({ title, reps,load, tasks: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});


router.get("/workouts", (req, res, next) => {
  Workout.find()
    .populate("tasks")
    .then((allWorkouts) => res.json(allWorkouts))
    .catch((err) => res.json(err));
});


router.get("/workouts/:workoutId", (req, res, next) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

 
  Workout.findById(workoutId)
    .populate("tasks")
    .then((workout) => res.status(200).json(workout))
    .catch((error) => res.json(error));
});


router.put("/workouts/:workoutId", (req, res, next) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Workout.findByIdAndUpdate(workoutId, req.body, { new: true })
    .then((updatedWorkout) => res.json(updatedWorkout))
    .catch((error) => res.json(error));
});


router.delete("/workouts/:workoutId", (req, res, next) => {
  const { workoutId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Workout.findByIdAndRemove(workoutId)
    .then(() =>
      res.json({
        message: `Workout with ${workoutId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
