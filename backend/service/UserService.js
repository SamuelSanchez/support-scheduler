const
    User    = require('../model/Users'),
    bcrypt  = require('bcryptjs'),
    salt    = bcrypt.genSaltSync(),
    util    = require('util');

let UserService = {};

//  Boiler function...
let jsonValueFound = (err, res, val, notFoundMsg) => {
    if (err) {
        res.status(500).json(err);
    } else {
        if (val == null) {
            res.status(404).json(notFoundMsg);
        } else {
            res.json(val);
        }
    }
};

UserService.createUser = (req, res) => {
    console.debug("Creating a new User");
    //  Encrypt password and remove it from the request...
    let hashPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = null;

    let user = new User(req.body);
    user.password = hashPassword;

    user.save( (err, user) => {
        if (err) {
            let errMessage;
            //  Mongo duplicate key error
            if (err.code === 11000) {
                errMessage = err.errmsg;
            } else {
                errMessage = err.message;
            }
            res.status(400).json(errMessage);
        } else {
            res.status(201).json(user);
        }
    });
};

UserService.getAllUsers = (req, res) => {
    console.debug("Getting all users");
    User.find( (err, users) => {
        jsonValueFound(err, res, users, null);
    });
};

UserService.findUserById = (req, res) => {
    console.debug("Getting User by id:%s", req.user.id);
    User.findOne({_id: req.user.id}, (err, user) => {
        jsonValueFound(err, res, user, util.format("User Not Found by id:%s", req.user.id));
    });
};

UserService.updateUserById = (req, res) => {
    console.debug("Updating User by id:%s", req.user.id);
    User.findAndModify({_id: req.user.id}, req.body, (err, user) => {
        jsonValueFound(err, res, user, util.format("User Not Found by id:%s", req.user.id));
    });
};

UserService.deleteUserById = (req, res) => {
    console.debug("Deleting User by id:%s", req.user.id);
    User.findByIdAndRemove(req.user.id, (err, user) => {
        jsonValueFound(err, res, user, util.format("User Not Found by id:%s", req.user.id));
    });
};

UserService.findUserByEmail = (req, res) => {
    console.debug("Getting User by email:%s", req.user.email);
    User.findOne({email: req.user.email}, (err, user) => {
        jsonValueFound(err, res, user, util.format("User Not Found by email:%s", req.user.email));
    });
};

module.exports = UserService;