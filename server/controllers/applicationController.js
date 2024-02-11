const Application = require('../models/Application');

const createApplication = async(req, res)=>{
    const { startDate, endDate, userId, travelId } = req.body;
    try {
        const newApplication = new Application({ startDate, endDate, userId, travelId });
        await newApplication.save();
        return res.status(201).json({ message: "Application created successfully", newApplication });
    } catch (error) {
        console.error('Error creating application:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getApplications = async(req, res)=>{
    const { userId } = req.params;
    try {
        const applications = await Application.find({userId}).populate({
          path: 'travelId',
          select: 'title category',
        }).populate('userId');
        return res.status(201).json({ applications });
    } catch (error) {
        console.error('Error getting applications:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports={ createApplication, getApplications };