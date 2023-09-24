//require("dotenv").config();
const express = require("express");
const Studentsmodel = require("./mongooseConnect");
const addData = require("./headersMiddleware");
const app = express();
const PORT = 5000;
//const PORT = process.env.PORT | 3000;
app.use(express.json());

app.get("/students/details", addData, async (req, res) => {
  let students = {};

  const id = req.query.id;
  const dates = req.query.dates;
  console.log(id);
  if (dates != 0 && id != 0) {
    let dateFrom = new Date(dates);
    let nextDay = new Date(dateFrom);
    nextDay.setDate(dateFrom.getDate() + 1);
    console.log(dateFrom);
    console.log(nextDay);
    students = await Studentsmodel.find({
      UserId: id,
      SubmitDateTime: { $gte: dateFrom, $lt: nextDay },
    });
  } else if (id == 0 && dates == 0) {
    students = await Studentsmodel.find();
  } else if (id == 0 && dates) {
    let dateFrom = new Date(dates);
    let nextDay = new Date(dateFrom);
    nextDay.setDate(dateFrom.getDate() + 1);
    console.log(dateFrom);
    console.log(nextDay);
    students = await Studentsmodel.find({
      SubmitDateTime: { $gte: dateFrom, $lt: nextDay },
    });
  } else if (id && dates == 0) {
    students = await Studentsmodel.find({ UserId: id });
  }
  res.send(students);
});

app.get("/students", addData, async (req, res) => {
  let students = {};
  if (req.query.dates) {
  } else {
    students = await Studentsmodel.distinct("UserId");
  }
  res.send(students);
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...!`);
});
