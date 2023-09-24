require("dotenv").config();
const express = require("express");
const Studentsmodel = require("./mongooseConnect");
const addData = require("./headersMiddleware");
const fs = require('fs');
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
//const PORT = process.env.PORT | 3000;
app.use(express.json());
const func = async()=>{
const data = fs.readFileSync('./work.json', 'utf8');

    let fileData1= JSON.parse(data);
    //console.log(fileData1);

    fileData1.map(async(fileData)=>{
        //let fileData = fileData1[0];
        let dateTemp = fileData.SubmitDateTime.replaceAll(/\s/g,'');
        let dateFor = new Date(dateTemp);
          const data1 = new Studentsmodel(
            {
              "SubmittedAnswerId":fileData.SubmittedAnswerId,
              "SubmitDateTime":dateFor,
              "Correct":fileData.Correct,
              "Progress":fileData.Progress,
              "UserId":fileData.UserId,
              "ExerciseId":fileData.ExerciseId,
              "Difficulty":fileData.Difficulty,
              "Subject":fileData.Subject,
              "Domain":fileData.Domain,
              "LearningObjective":fileData.LearningObjective
            })
            
            console.log(data1)
           // mongoose.set('debug',true);
            /*let result =  await data1.save();

            mongoose.set('debug',(cal,method,query,doc)=>{
                console.log(JSON.stringify(query))
                    })
            console.log(result)*/
    })
}
func();
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
