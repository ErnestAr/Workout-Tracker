const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path')
const dbWorkouts = require("./models/Workout");


const PORT = process.env.PORT || 3000

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, './public/stats.html'))
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, './public/exercise.html'))
});



app.get('/api/workouts', (req, res) => {

  dbWorkouts.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      }
    }
  ]).then(dbWorkouts => {
    res.json(dbWorkouts)
  })
})


// Get (get workout in range)
app.get('/api/workouts/range', (req, res) => {
  dbWorkouts.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      }
    }
  ]).then(dbWorkouts => {
    res.json(dbWorkouts)
  })
})

// Post (create workout)
app.post('/api/workouts', (req, res) => {
  dbWorkouts.create({})
    .then(dbWorkouts => {
      res.json(dbWorkouts)
    })
});

app.put('/api/workouts/:id', ({ body, params }, res) => {
  dbWorkouts.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true })
    .then(dbWorkouts => {
      res.json(dbWorkouts)
    })
});



app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}/ !`);
});

