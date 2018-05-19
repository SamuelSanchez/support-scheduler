const
    router = require('express').Router({}),
    service = require('../service/GroupService');

/**
 *  Group API Routes
 */
router.route('*').all((req, res, next) => {
    console.log("Execute before calling any other function...");
    next();
});

router.route('/')
    .post(service.createGroup)
    .get(service.getAllGroups);

router.route('/:groupId')
    .get(service.findGroupById)
    .delete(service.deleteGroupById)
    .put(service.updateGroupById);

router.route('/name/:name')
    .get(service.findGroupByName);

router.route('/admin/:admin')
    .get(service.findGroupByAdmin);

/**
 *  User API Params
 */
router.param('groupId', function(req, res, next, id) {
    req.group = req.group || {};
    req.group.id = id;
    next();
});

router.param('name', function(req, res, next, name) {
    req.group = req.group || {};
    req.group.name = name;
    next();
});

router.param('admin', function(req, res, next, admin) {
    req.group = req.group || {};
    req.group.admin = admin;
    next();
});

// Expose express
module.exports = router;