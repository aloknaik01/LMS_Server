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
    const coursesList = await Course.find();
    res.status(201).json({
      sucess: true,
      message: "Courses fetched successfully",
      data: coursesList,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "some error occured!",
    });
  }
};
const getCourseDetails = async (req, res) => {
  try {
    const id = req.params;
    const courseDetail = await Course.findByid(id);
    if (!coursesList) {
      return res.status(404).json({
        sucess: false,
        message: "course not found!",
      });
    }

    res.status(200).json({
      sucess: true,
      message: "Course Detail fetched Successfully.",
      data: courseDetail,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "some error occured!",
    });
  }
};
const updateCourseByid = async (req, res) => {
  try {
    const id = req.params;
    const updatedCourseData = req.body;

    const updatedCourse = await Course.findByidAndUpdate(
      id,
      updatedCourseData,
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        sucess: false,
        message: "Course Not Found!",
      });
    }

    res.status(200).json({
      sucess: true,
      message: "course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
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
