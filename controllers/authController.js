const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      page_name: 'user',
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const same = await bcrypt.compare(password, user.password);

      if (same) {
        req.session.userID = user._id;
        res.status(200).redirect('/users/dashboard');
      } else {
        res.status(401).send('Şifre yanlış');
      }
    } else {
      res.status(404).send('Kullanıcı bulunamadı');
    }

  } catch (err) {
    res.status(500).json({
      status: 'fail',
      error: err.message,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
}

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id:req.session.userID})
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
  });
};