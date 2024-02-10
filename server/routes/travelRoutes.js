const express = require('express');
const router = express.Router();
const {
    createTravel,
} = require('../controllers/travelController');

router.post('/create-travel', createTravel);

module.exports=router;