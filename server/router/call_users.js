const router = require('express').Router();
const userAPI = require('../api/user')
const axios = require('axios');



router.get('/', function(req, res, next){
    let data = {type : 'USER', id : 'test7'};
    userAPI.readUserList(data);
});

router.post('/', function(req, res, next){
    console.log(req.body);
    userAPI.createUser(req.body, res);
})

router.post('/login', async function(req, res, next){
    userAPI.login(req.body, res);
})

module.exports = router;