const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const {body} = require('express-validator')
const User = require('../models/User')

const router = express.Router();

router.route('/signup').post(
    [

        body('name').not().isEmpty().withMessage(' Please Enter Your Name'),

        body('email').isEmail().withMessage(' Please Enter Valid Email').custom((userEmail)=>{
            return User.findOne({email: userEmail}).then(user => {
                if(user) {
                    return Promise.reject('Email is already exist!')
                }
            })
        }),
        body('password').not().isEmpty().withMessage(' Please Enter A Password'),

    ],
    authController.createUser); // http://localhost:3000/courses gidilmiş haldeyiz.
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage);
router.route('/:id').delete(authController.deleteUSer);

module.exports = router;