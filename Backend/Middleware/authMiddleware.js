const jwt = require('jsonwebtoken');

exports.authenticate= (req, res, next)=>{
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token){
        return res.status(401).json({MESSAGE:'Access Denied', SUCCESS:false})
    }
    try{
        const verified = jwt.verify(token, process.env.JWT_SECRETKey);
        req.user = verified;
        next()
    }catch(error){
        res.status(400).json({MESSAGE:'Invalid Token', SUCCESS:false})
    }
}
