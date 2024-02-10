const Travel=require('../models/Travel');

const createTravel=async (req, res)=>{
    const { title, description, category, price } = req.body;
    try {
        const newTravel = new Travel({ title, description, category, price });
        await newTravel.save();
        return res.status(201).json({ message: "Travel added successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getAllTravels=async (req, res)=>{
    try {
        const travels = await Travel.find();
        return res.status(200).json(travels);
    } catch (error) {
        console.error('Error fetching travels:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports={ createTravel, getAllTravels };