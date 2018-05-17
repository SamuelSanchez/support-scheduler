const
    router = require('express').Router({}),
    service = require('../service/UserService');

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

router.route('/email/:email')
    .get(service.findUserByEmail);

// Expose express
module.exports = router;