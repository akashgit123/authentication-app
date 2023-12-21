const { body, check } = require('express-validator');

class Validation{
    static registerUser = [
        check('name').notEmpty().withMessage("Name is required").escape(),
        check('email').notEmpty().withMessage("Email is required").isEmail().withMessage("Enter valid email"),
        check('password').notEmpty().withMessage("Password is required").isLength({min:5}).withMessage("Must be minimum 5 characters")
    ]
}

module.exports = Validation;