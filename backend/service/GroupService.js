const
    Group = require('../model/Groups');

let GroupService = {};

//  Boiler function...
let jsonValOrThrow = (err, res, val) => {
    if (err) {
        res.status(400).json(err);
    } else {
        res.json(val);
    }
};

GroupService.createGroup = (req, res) => {
    let group = new Group(req.body);
    group.save( (err, group) => {
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

GroupService.getAllGroups = (req, res) => {
    Group.find( (err, groups) => {
        jsonValOrThrow(err, res, groups);
    });
};

GroupService.findGroupById = (req, res) => {
    Group.findOne({_id: req.params.groupId}, (err, group) => {
        jsonValOrThrow(err, res, group);
    });
};

GroupService.updateGroupById = (req, res) => {
    Group.findOneAndUpdate({ _id: req.params.groupId }, req.body, { upsert: true },
        (err, group) => { jsonValOrThrow(err, res, group);
    });
};

GroupService.deleteGroupById = (req, res) => {
    let group = Group.findOne({_id : req.params.groupId});
    group.remove( (err) => {
        jsonValOrThrow(err, res, group);
    });
};

GroupService.findGroupByName = (req, res) => {
    Group.findOne({name : req.params.name}, (err, group) => {
        jsonValOrThrow(err, res, group);
    });
};

GroupService.findGroupByAdmin = (req, res) => {
    Group.findOne({admins : { $in: [req.params.admin] }}, (err, group) => {
        jsonValOrThrow(err, res, group);
    });
};

module.exports = GroupService;