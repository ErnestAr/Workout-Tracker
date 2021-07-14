const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: Date,
  exercises:[{ 
    type: {
    type: String,
    trim: true,
    required: "Enter type of exercise"
  },
  name: {
    type: String,
    trim: true,
    required: "Enter name of the exercise"
  },
  duration: {
    type: Number,
    required: "Enter min"
  },
  weight: {
    type: Number,
    required: "Enter in lb"
  },
  reps: {
    type: Number,
    required: "Enter reps"
  },
  sets: {
    type: Number,
    required: "Enter sets"
  },
  date: {
    type: Date,
    default: Date.now
  }}]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;


