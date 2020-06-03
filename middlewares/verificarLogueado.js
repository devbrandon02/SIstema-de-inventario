const jwt = require('jsonwebtoken');


let InLogging = (req, res, next) => {
    let token = req.get('token');
    console.log(token);
    console.log(res);
    next();
}

module.exports ={
    InLogging
}