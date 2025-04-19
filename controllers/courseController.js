const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      page_name: 'courses',
      status: 'success',
      course,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(201).render('courses', {
      page_name: 'courses',
      courses,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({slug: req.params.slug});

    res.status(201).render('course', {
      page_name: 'courses',
      course,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
};
