const Course = require("../course/course.model");

//add new course api
const addNewCourse = async (req, res) => {
  try {
    const courseData = req.body;
    const newlyCreatedCourse = new Course(courseData);
    const saveCourse = await newlyCreatedCourse.save();
    if (saveCourse) {
      return res.status(201).json({
        sucess: true,
        message: "Course saved successfully",
        data: saveCourse,
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "some error occured!",
    });
  }
};

// get All Courses api
const getAllCourses = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "some error occured!",
    });
  }
};
const getCourseDetails = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "some error occured!",
    });
  }
};
const updateCourseByid = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "some error occured!",
    });
  }
};

module.exports = {
  addNewCourse,
  getAllCourses,
  updateCourseByid,
  getCourseDetails,
};
