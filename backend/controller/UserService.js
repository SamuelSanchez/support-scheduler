const
    User    = require('../model/Users'),
    bcrypt  = require('bcryptjs'),
    salt    = bcrypt.genSaltSync();

let UserService = {};

//  Boiler function...
let jsonValOrThrow = (err, res, val) => {
    if (err) {
        res.status(400).json(err);
    } else {
        res.json(val);
    }
};

UserService.createUser = (req, res) => {
    //  Encrypt password and remove it from the request...
    let hashPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = null;

    let user = new User(req.body);
    user.password = hashPassword;

    user.save( (err) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(user);
        }
    });
};

UserService.getAllUsers = (req, res) => {
    User.find( (err, groups) => {
        jsonValOrThrow(err, res, groups);
    });
};

UserService.findUserById = (req, res, next, id) => {
    User.findOne({_id: id}, (err, group) => {
        jsonValOrThrow(err, res, group);
    });
};

UserService.updateUserById = (req, res, next, id) => {
    User.findAndModify({_id: id}, req.body, (err, group) => {
        jsonValOrThrow(err, res, group);
    });
};

UserService.deleteUserById = (req, res, next, id) => {
    let user = User.findOne({_id : id});
    user.remove( (err) => {
        jsonValOrThrow(err, res, user);
    });
};


module.exports = UserService;