const
    router = require('express').Router({}),
    service = require('../controller/UserService');

/**
 *  User API
 */

router.route('/')
    .post(service.createUser)
    .get(service.getAllUsers);

router.route('/:userId')
    .get(service.findUserById)
    .delete(service.deleteUserById)
    .put(service.updateUserById);

// Expose express
module.exports = router;