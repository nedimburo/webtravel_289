const Travel=require('../models/Travel');
const Question = require('../models/Question');

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

const updateTravel=async (req, res)=>{
    const { travelId } = req.params;
    const { title, description, category, price } = req.body;
    try{
        const travel=await Travel.findById(travelId);
        if (!travel){
            return res.status(404).json({ message: 'Travel not found' });
        }
        travel.title = title;
        travel.description = description;
        travel.category = category;
        travel.price = price;
        await travel.save();
        return res.status(201).json({ message: 'Travel updated successfully', travel: travel });
    }catch (error) {
        console.error('Error updating travel:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteTravel=async (req, res)=>{
    const { travelId } = req.params;
    try{
        const deletedTravel = await Travel.findByIdAndDelete(travelId);
        if (!deletedTravel) {
        return res.status(404).json({ message: "Travel not found" });
        }
        await Question.deleteMany({ travelId });
        return res.status(200).json({ message: "Travel deleted successfully", deletedTravel });
    }catch (error) {
        console.error('Error deleting travel:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getSelectedTravel=async (req, res)=>{
    const { travelId } = req.params;
    try{
        const travel=await Travel.findById(travelId);
        if (!travel){
            return res.status(404).json({ message: 'Travel not found' });
        }
        return res.status(201).json({ travel: travel });
    }catch (error) {
        console.error('Error getting travel:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports={ createTravel, getAllTravels, updateTravel, deleteTravel, getSelectedTravel };