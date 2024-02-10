const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getLoggedInUser
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-loggedin-user', getLoggedInUser);

module.exports=router;