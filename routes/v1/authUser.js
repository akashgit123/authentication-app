const express = require('express');
const route = express.Router();
const controller = require('../../controllers/v1/authUser')
const {upload} = require('../../utils/multer')
const Validation = require('../../utils/validation');
const validationHandler = require('../../middlewares/validationHandler');

route.post('/register',upload.single("image"),controller.registerUser);
route.get('/all',controller.allUsers);

module.exports = route;