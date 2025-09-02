const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  instructorId: String,
  instructorName: String,
  date: Date,
  title: String,
  category: String,
  level: String,
  PrimaryLanguage: String,
  subtitle: String,
  descrition: String,
  Image: String,
  welcomeMessage: String,
  pricing: Number,
  objective: String,
  students: [
    {
      studentId: String,
      studentName: String,
      studentEmail: String,
    },
  ],
  curriculum: [LectureSchema],
});
