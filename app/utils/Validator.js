
const { check, validationResult } = require('express-validator');
const validator = require('validator');
const mongoose = require('mongoose');
const userSchema = require("../models/user.model");






const signupValidationRules = () => {
    return [
        check('name').notEmpty().withMessage('Name is required'),
        check('email').isEmail().withMessage('Enter a valid email address'),
        check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        check('role').isIn(['Patient', 'Doctor', 'Admin']).withMessage('Invalid role provided'),
        check('phone').isMobilePhone().withMessage('Enter a valid phone number'),
        check('dob').notEmpty().withMessage('Date of birth is required'),
        check('address').notEmpty().withMessage('Address is required'),
    ];
}

const loginValidationRules = () => {
    return [
        check('email').notEmpty().withMessage('Email is required'),
        check('password').notEmpty().withMessage('Password is required')
    ];
};

const updateValidationRules = () => {
    return [
        check('name').optional().isString().withMessage('Name must be a string'),
        check('role')
            .optional()
            .isIn(['Patient', 'Doctor', 'Admin'])
            .withMessage('Role must be one of Patient, Doctor, or Admin'),
        check('phone')
            .optional()
            .isMobilePhone()
            .withMessage('Enter a valid phone number'),
        check('dob')
            .optional()
            .isISO8601()
            .withMessage('Enter a valid date of birth (YYYY-MM-DD format)'),
        check('address')
            .optional()
            .isString()
            .withMessage('Address must be a string'),
        check('profilePics')
            .optional()
            .isString()
            .withMessage('Profile picture path must be a valid string')
    ];
};











const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}






module.exports = {
     signupValidationRules,
     loginValidationRules,
     updateValidationRules,
    validate,
};
