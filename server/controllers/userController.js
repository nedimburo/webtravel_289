const User=require('../models/User');

const registerUser=async (req, res)=>{
    const { username, email, password, firstName, lastName } = req.body;
    try{
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already in use' });
        }
        const newUser = new User({
            username,
            email,
            password,
            firstName,
            lastName,
            role: 'USER',
            status: 'ACTIVE'
        });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });
    }catch(error){
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const loginUser=async (req, res)=>{
    const {email, password} =req.body;
    try{
        User.findOne({email: email})
        .then
    }catch(error){
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
}

module.exports={registerUser, loginUser};