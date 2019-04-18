const router = require('express').Router();
const authAPI = require('../api/auth')
router.post('/phone', function(req, res, next){
    authAPI.checkPhone(req.body, res);
})
router.post('/email', function(req, res, next){
    authAPI.checkEmail(req.body, res);
})

module.exports = router