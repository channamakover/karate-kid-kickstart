
const {v1:uuidv1} = require('uuid');
const ToDoModel = require('../models')


const checkCookies = function(req, res, next) {
    if (!req.cookies) {
        const userId = uuidv1();
        res.cookie("userId", userId);
        res.sendStatus(200);
    }
    next();
}


module.exports = {checkCookies}