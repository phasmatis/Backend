const express = require("express");
const cors = require("cors");
const dbConfig = require("node-json-db");
const workoutDB = new dbConfig.JsonDB(
  new dbConfig.Config("workouts", true, true)
);
const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.get("/save-workout", (request, response) => {
  response.send("<h1>GorillaBootyWorkouts</h1>");
});
app.post("/save-workout", async (req, res) => {
  const workouts = await workoutDB.getObjectDefault("/workout", []);
  console.log(workouts);
  await workoutDB.push("/workout", [...workouts, req.body]);
  res.json({ userInput: "" });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
