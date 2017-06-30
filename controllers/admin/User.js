const express = require('express');
const router = express.Router();

const UserModel = require('../../schema/User');

router.get('/', (req, res) => {

    UserModel.find()
    .then( users => {
        res.json(users);
    } );

});

module.exports = router;
