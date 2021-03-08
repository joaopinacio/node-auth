var router = require('express').Router();

// Sync all tables
(async () => {
    const database = require('../../config/db.js');
    try {
        const result = await database.sync();
    } catch (error) {
        console.log(error);
    }
})();

// Split up route handling
router.use('/user', require('./user/UserDAO.js'));

module.exports = router;