const router = require('express').Router();
const apiRoutes = require('./api');

// for '/api' send to apiRoutes/index.js
router.use('/api', apiRoutes);

// for '/' or anything else, send an error message
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
