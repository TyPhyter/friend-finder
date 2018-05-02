const express = require('express');
let router = express.Router();
let friends = require('../data/friends.js');

//routes will start with /api..

router.get('/friends', (req, res,) => {
    res.json(friends);
});

module.exports = router;