const Course = require('../models/Course');
const Category = require('../models/Category');

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

    const categorySlug = req.query.categories;

    const category = await Category.findOne({slug:categorySlug});

    let filter = {};

    if(categorySlug) {
      filter = {category:category._id}
    }

    const courses = await Course.find(filter);

    const categories = await Category.find();

    res.status(201).render('courses', {
      page_name: 'courses',
      courses,
      categories,
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
