const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name : req.body.name,
      description : req.body.description,
      category : req.body.category,
      user : req.session.userID
    });

    req.flash("success", `${course.name} has been create succesfully`);
    res.status(201).redirect('/courses');
  } catch (err) {
    req.flash("error", "Opps");
    res.status(400).redirect('/courses');
  }
};

exports.getAllCourses = async (req, res) => {
  try {

    const categorySlug = req.query.categories;
    const query = req.query.search;

    const category = await Category.findOne({slug:categorySlug});

    let filter = {};

    if(categorySlug) {
      filter = {category:category._id}
    }

    if (query) {
      filter = {name: query}
    }

    if (!query && !categorySlug) {
      filter.name = "",
      filter.category = null

    }

    const courses = await Course.find({
      $or: [
        {name: { $regex: '.*' + filter.name + '.*', $options: 'i'}},
        {category: filter.category}
      ]
    }).sort('-createdAt').populate('user')
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
    const user = await User.findById(req.session.userID);
    const categories = await Category.find();
    const { slug } = req.params;
    const course = await Course.findOne({ slug }).populate('user');
    

    if (!course) {
      return res.status(404).send('Course not found');
    }

    res.status(200).render('course', {
      page_name: 'courses',
      course,
      user,
      categories,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);

    if (!user.courses.includes(req.body.course_id)) {
      user.courses.push(req.body.course_id);
      await user.save();
    }

    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);

    if (user.courses.includes(req.body.course_id)) {
      user.courses.pull(req.body.course_id);
      await user.save();
    }

    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {

    const course = await Course.findOneAndDelete({slug:req.params.slug})

    req.flash("error", `${course.name} has been removed succesfully`);

    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {

    const course = await Course.findOne({slug:req.params.slug})
    course.name = req.body.name;
    course.category = req.body.category;
    course.description = req.body.description;
    course.save();

    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
};