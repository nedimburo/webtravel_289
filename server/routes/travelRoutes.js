const express = require('express');
const router = express.Router();
const {
    createTravel,
    getAllTravels,
    updateTravel,
    deleteTravel,
    getSelectedTravel,
} = require('../controllers/travelController');

router.post('/create-travel', createTravel);
router.get('/get-travels', getAllTravels);
router.put('/update-travel/:travelId', updateTravel);
router.delete('/delete-travel/:travelId', deleteTravel);
router.get('/get-selected-travel/:travelId', getSelectedTravel);

module.exports=router;