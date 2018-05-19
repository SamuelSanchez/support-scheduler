const
    Group   = require('../model/Groups'),
    util    = require('util');

let GroupService = {};

//  Boiler function...
let jsonValOrThrow = (err, res, val) => {
    if (err) {
        res.status(400).json(err);
    } else {
        res.json(val);
    }
};

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

GroupService.createGroup = (req, res) => {
    console.debug("Creating a new Group");
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
            res.status(201).json(group);
        }
    });
};

GroupService.getAllGroups = (req, res) => {
    console.debug("Getting all groups");
    Group.find( (err, groups) => {
        jsonValOrThrow(err, res, groups);
    });
};

GroupService.findGroupById = (req, res) => {
    console.debug("Getting Group by id:%s", req.group.id);
    Group.findOne({_id: req.group.id}, (err, group) => {
        jsonValueFound(err, res, group, util.format("Group Not Found by id:%s", req.group.id));
    });
};

GroupService.updateGroupById = (req, res) => {
    console.debug("Updating Group by id:%s", req.group.id);
    Group.findOneAndUpdate({ _id: req.group.id }, req.body, { upsert: true },
        (err, group) => { jsonValOrThrow(err, res, group);
    });
};

GroupService.deleteGroupById = (req, res) => {
    console.debug("Deleting Group by id:%s", req.group.id);
    Group.findByIdAndRemove(req.group.id, (err, group) => {
        jsonValOrThrow(err, res, group);
    });
};

GroupService.findGroupByName = (req, res) => {
    console.debug("Getting Group by name:%s", req.group.name);
    Group.findOne({name : req.group.name}, (err, group) => {
        jsonValueFound(err, res, group, util.format("Group Not Found by name:%s", req.group.name));
    });
};

GroupService.findGroupByAdmin = (req, res) => {
    console.debug("Getting Group by admin:%s", req.group.admin);
    Group.findOne({admins : { $in: [req.group.admin] }}, (err, group) => {
        jsonValueFound(err, res, group, util.format("Group Not Found by admin:%s", req.group.admin));
    });
};

module.exports = GroupService;