const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://divyanianerao97:divyanianerao97@cluster0.bncoejp.mongodb.net/snappet?retryWrites=true&w=majority";
//const mongoUrl = process.env.MONGO_URL | "mongodb://127.0.0.1:27017/snappet";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database...!");
  });
  
const studentSchema = new mongoose.Schema({
  SubmittedAnswerId: {
    type: Number,
    default: null,
  },
  SubmitDateTime: Date,
  Correct: {
    type: Number,
    default: null,
  },
  Progress: {
    type: Number,
    default: null,
  },
  UserId: {
    type: Number,
    default: null,
  },
  ExerciseId: Number,
  Difficulty: {
    type: String,
    default: null,
  },
  Subject: String,
  Domain: String,
  LearningObjective: String,
});

const Studentsmodel = new mongoose.model("studentportal", studentSchema);
module.exports = Studentsmodel;
