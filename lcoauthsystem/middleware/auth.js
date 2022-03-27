const jwt =  require('jsonwebtoken')

// model is optinal here

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '') || req.cookies.token || req.body.token;
    if(!token) return res.status(403).send('Access denied. No token provided.');
    try{
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    }catch(err){
        return res.status(401).send('Invalid token.');
    }
    return next();

};

module.exports = auth;