const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = '7801996';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        console.error('Token verification failed:', err); // Log the error
        if (err) return res.sendStatus(403);
        req.user = user;
        console.log('Usuario autenticado:', user,token);
        next();
    });
};

module.exports = authenticateToken;
