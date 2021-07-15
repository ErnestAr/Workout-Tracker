const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const workoutDB = require('./models/Workout');
const app = express();
const PORT =  3000;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/exercise", (req, res) => res.sendFile(`${__dirname}/public/exercise.html`));

app.get("/stats", (req, res) => res.sendFile(`${__dirname}/public/stats.html`));

// Get (get last workout)
app.get("/api/workouts", (req, res) => {
  workoutDB.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});
// Put (add exercise)
app.put("/api/workouts/:id", ({body}, res) => {
  workoutDB.create(body)
    .then(({_id}) => workoutDB.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// Post (create workout)
app.post("/api/workouts", ({body}, res) => {
  workoutDB.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

// Get (get workout in range)
app.get("/api/workouts/range", (req, res) => {
  workoutDB.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});




mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true });



app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}/ !`);
});




