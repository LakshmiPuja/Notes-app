const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next)=>{
    const token= req.header("Authorization")?.replace('Bearer ','');
    if(!token){
        return res.status(401).json({message: 'Access denied'});
    }
    try{
        const decoded = jwt.verify(token,'secretKey');
        req.user = decoded;
        next();
    }catch(err){
        res.status(400).json({message: 'Token Expaired' });
    }
};

module.exports = authMiddleware;