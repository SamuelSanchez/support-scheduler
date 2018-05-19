const
    router = require('express').Router({}),
    service = require('../service/UserService');

/**
 *  User API Routes
 */
router.route('*').all((req, res, next) => {
    console.log("Execute before calling any other function...");
    next();
});

router.route('/')
    .post(service.createUser)
    .get(service.getAllUsers);

router.route('/:userId')
    .get(service.findUserById)
    .delete(service.deleteUserById)
    .put(service.updateUserById);

router.route('/email/:email')
    .get(service.findUserByEmail);

/**
 *  User API Params
 */
router.param('userId', function(req, res, next, id) {
    req.user = req.user || {};
    req.user.id = id;
    next();
});

router.param('email', function(req, res, next, email) {
    req.user = req.user || {};
    req.user.email = email;
    next();
});

// Expose express
module.exports = router;