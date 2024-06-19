const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.REFRESH_SECRET_TOKEN,
    { expiresIn: "30d" }
  );

  return { accessToken, refreshToken };
};

exports.register = async (req,res) => {
    const {name, email, password, role} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        const user = new User({name, email, password, role});
        await user.save();

        const { accessToken, refreshToken } = generateTokens(user);

        res.status(201).json({
            message: 'User Registered Successfully',
            accessToken,
            refreshToken
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const { accessToken, refreshToken } = generateTokens(user);

        res.status(201).json({
            message: 'User Registered Successfully',
            accessToken,
            refreshToken
        });

    } catch (error) {
        
    }
}

exports.refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token)
    return res.status(401).json({ message: "Refresh token required" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET_TOKEN);
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(401).json({ message: "Invalid refresh token" });

    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};