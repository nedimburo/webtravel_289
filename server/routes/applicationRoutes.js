const express = require('express');
const router = express.Router();
const {
    createApplication,
    getApplications
} = require('../controllers/applicationController');

app.post('/create-application', createApplication);
app.get('/get-user-applications', getApplications);

module.exports=router;