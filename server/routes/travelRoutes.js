const express = require('express');
const router = express.Router();
const {
    createTravel,
    getAllTravels,
    updateTravel
} = require('../controllers/travelController');

router.post('/create-travel', createTravel);
router.get('/get-travels', getAllTravels);
router.put('/update-travel/:travelId', updateTravel);

module.exports=router;