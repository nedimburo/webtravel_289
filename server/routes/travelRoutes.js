const express = require('express');
const router = express.Router();
const {
    createTravel,
    getAllTravels,
} = require('../controllers/travelController');

router.post('/create-travel', createTravel);
router.get('/get-travels', getAllTravels);

module.exports=router;