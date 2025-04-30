const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {

    const category = await Category.findByIdAndDelete(req.params.id)

    req.flash("success", `${category.name} has been removed succesfully`);

    res.status(200).redirect('/users/dashboard');
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
};