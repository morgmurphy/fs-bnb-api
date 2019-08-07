const express = require('express');
const router = express.Router();

const User = require('../models/listing-imgurl-mapping-model')

router.post('/', function(req, res) {
    User.prototype
        .createImage(req.body)
        .then(users =>{
            res.send(users);
        }).catch(err =>{
            res.status(400).send(err);
    })
});
module.exports = router;