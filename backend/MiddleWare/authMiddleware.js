// authMiddleware.js

const jwt = require('jsonwebtoken');

JWT_SECRET=  "siorehamh200323[]itsu}{||]ha--63049398whi279101nwg149diwgu002";


function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ error: 'Forbidden here' });
    req.user = decoded;
    console.log(req.user);
    next();
  });
}

module.exports = authenticateToken;
