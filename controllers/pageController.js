const nodemailer = require("nodemailer");
exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render('index', {
    page_name: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {

  const outputMessage = ` 
  <h1>Mail Details </h1>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <h1>Mail Details </h1>
  <p>${req.body.message} </p>
  `

  try{

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "enverbilalbirinci2@gmail.com",
      pass: "vclyjroxobpimjayxx",
    },
  });
  
  await transporter.sendMail({
    from: '"Smart Edu Contact Form" <enverbilalbirinci2@gmail.com>',
    to: "enverbilalbirinci@gmail.com",
    subject: "Smart Edu Contact Form Message",
    html: outputMessage,
  });

  req.flash("success", "We received your message successfully!");
  res.status(200).redirect('/contact');
} catch (err) {
  console.error("Error sending email:", err);
  req.flash("error", `Something went wrong: ${err.message}`);
  res.status(500).redirect('/contact');
}
};