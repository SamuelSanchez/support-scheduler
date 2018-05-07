const
    Group = require('../model/Groups');

let GroupService = {};

//  Boiler function...
let jsonValOrThrow = (err, next, res, val) => {
    if (err) {
        next(err);
    } else {
        res.json(val);
    }
};

GroupService.createGroup = (req, res, next) => {
    let group = new Group(req.body);
    group.save( (err) => {
        jsonValOrThrow(err, next, res, group)
    });
};

GroupService.getAllGroups = (req, res, next) => {
    Group.find( (err, groups) => {
        jsonValOrThrow(err, next, res, groups);
    });
};

GroupService.findGroupById = (req, res, next) => {
    Group.findOne({_id: req.body._id}, (err, group) => {
        jsonValOrThrow(err, next, res, group);
    });
};

GroupService.updateGroupById = (req, res, next) => {
    Group.findAndModify({_id: req.body._id}, req.body, (err, group) => {
        jsonValOrThrow(err, next, res, group);
    });
};

GroupService.deleteGroupById = (req, res, next) => {
    let group = Group.findOne({_id : req.body._id});
    group.remove( (err) => {
        jsonValOrThrow(err, next, res, group);
    });
};


module.exports = GroupService;