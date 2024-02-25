const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getAllUsers,
    updateUser,
    activateUser,
    deactivateUser,
    getSelectedUser
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-users', getAllUsers);
router.put('/update-user/:userId', updateUser);
router.put('/activate-user/:userId', activateUser);
router.put('/deactivate-user/:userId', deactivateUser);
router.get('/get-selected-user/:userId', getSelectedUser);

module.exports=router;