const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getAllUsers,
    updateUser,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-users', getAllUsers);
router.put('/update-user/:userId', updateUser);

module.exports=router;