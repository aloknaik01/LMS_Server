const express = require("express");
const router = express.router;
const {
  addNewCourse,
  getCourseDetails,
  updateCourseByid,
  getAllCourses,
} = require("../course/course.controller");

router.post("/add", addNewCourse);
router.get("/get", getAllCourses);
router.get("/get/details", getCourseDetails);
router.put("/update", updateCourseByid);

module.exports = router;
