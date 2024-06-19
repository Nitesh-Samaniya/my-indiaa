const User = require("../models/User");

exports.checkRoute = (req,res)=>{
    res.send("check")
}

exports.getProfile = async (req,res)=>{
    const userId = req.params.id;
    try {
        const user = await User.findById(userId, {password: 0});
        if(!user){
            return res.status(400).json({message: 'User not found'});
        }
        return res.status(200).json({message: 'user found successfully', user});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.updateProfile = async (req,res)=>{
    const {id, name, email} = req.body;
    try {
        const user = await User.findById(id);
        if(!user){
            return res.status(400).json({message: 'user not found'});
        }

        user.name = name || user.name;
        user.email = email || user.email;

        user.save();
        return res.status(200).json({message: 'user updated successfully', user});
    } catch (error) {
        return res.status(500).json(error.message);
    }
}