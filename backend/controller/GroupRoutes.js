const
    router = require('express').Router({}),
    service = require('../service/GroupService');

/**
 *  Group API
 */

//  TODO: FIX
router.route('/').all((req, res, next) => {
    // console.log("Execute before calling any other function...");
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

// Expose express
module.exports = router;