var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Nayan@isagood@boy';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({error : "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        // console.log(data);
        req.user = data.user; // When a token is created and signed, it's signed with a specific payload object, which in this case seems to contain the property find user
        next();
    }
    catch(error) {
        res.status(401).send({error : "Please authenticate using a valid token"});
    }
}

module.exports = fetchuser;