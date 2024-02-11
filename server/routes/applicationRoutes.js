const express = require('express');
const router = express.Router();
const {
    createApplication,
    getApplications
} = require('../controllers/applicationController');

router.post('/create-application', createApplication);
router.get('/get-user-applications/:userId', getApplications);

module.exports=router;