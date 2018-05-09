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
    group.save( (err) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(group);
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
    Group.findAndModify({_id: req.params.groupId}, req.body, (err, group) => {
        jsonValOrThrow(err, res, group);
    });
};

GroupService.deleteGroupById = (req, res) => {
    let group = Group.findOne({_id : req.params.groupId});
    group.remove( (err) => {
        jsonValOrThrow(err, res, group);
    });
};


module.exports = GroupService;