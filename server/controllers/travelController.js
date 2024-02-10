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

module.exports={ createTravel };