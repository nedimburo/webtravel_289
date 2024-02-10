const express = require('express');
const router = express.Router();
const {
    createTravel,
    getAllTravels,
    updateTravel,
    deleteTravel
} = require('../controllers/travelController');

router.post('/create-travel', createTravel);
router.get('/get-travels', getAllTravels);
router.put('/update-travel/:travelId', updateTravel);
router.delete('/delete-travel/:travelId', deleteTravel);

module.exports=router;