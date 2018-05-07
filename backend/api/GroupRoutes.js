const
    router = require('express').Router({}),
    service = require('../controller/GroupService');

/**
 *  Group API
 */

router.route('/')
    .post(service.createGroup)
    .get(service.getAllGroups);

router.route('/:groupId')
    .get(service.findGroupById)
    .delete(service.deleteGroupById)
    .put(service.updateGroupById);

// Expose express
module.exports = router;