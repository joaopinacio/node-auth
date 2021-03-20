var router = require('express').Router();

// Sync all tables
(async () => {
    const {sequelizeConnect} = require('../../config/db.js');
    try {
        const result = await sequelizeConnect.sync();
    } catch (error) {
        console.log(error);
    }
})();

router.use((req, res, next) => {
    if (req.cookies.SessionCookie && !req.session.user) {
        res.clearCookie('SessionCookie');
    }
    next();
});

// Split up route handling
router.use('/user', require('./user/UserDAO.js'));
router.use('/auth', require('./auth/auth.js'));

module.exports = router;