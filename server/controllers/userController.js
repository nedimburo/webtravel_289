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
        const user= await User.findOne({email: email});
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        let passwordMatch=false;
        if (password===user.password){
            passwordMatch=true;
        }
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        req.session.user = {
            userId: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            status: user.status
        };
        if (user.status==="DEACTIVATED"){
            return res.status(200).json({ message: 'Your account is deactivated and you can\'t login.', redirect:"LOGIN" });
        }else if (user.role==="USER"){
            return res.status(200).json({ message: 'Login successful', redirect:"HOME" });
        }else if (user.role==="ADMIN"){
            return res.status(200).json({ message: 'Login successful', redirect:"ADMIN" });
        }else{
            return res.status(200).json({ message: 'Unknown role', redirect:"LOGIN" });
        }
    }catch(error){
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
}

const getLoggedInUser=async(req, res)=>{
    if (req.session.user) {
        return res.json(req.session.user);
    } else {
        return res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports={registerUser, loginUser, getLoggedInUser};