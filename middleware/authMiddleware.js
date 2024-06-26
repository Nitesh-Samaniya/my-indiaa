const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next)=>{
    if(!req.header('Authorization')){
        return res.status(400).json({message: 'Token required to proceed.'})
    }
    const token = req.header('Authorization').replace('Bearer', '');

    if(!token){
        return res.status(401).json({message: 'Authorization denied'});
    }

    try {
        const decodeJWT_token = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodeJWT_token;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Need to login again.'})
    }
}

module.exports = authMiddleWare;