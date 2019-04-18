const router = require('express').Router();
const path = require('path');

//메인페이지
router.get('/', function(req, res, next){
    res.status(200)
    res.setHeader("Content-Type" , "text/html;characterset=utf8")
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});
//로그인페이지
router.get('/login', function(req, res, next){
    res.status(200)
    res.setHeader("Content-Type" , "text/html;characterset=utf8")
    res.sendFile(path.join(__dirname, './views/components', 'login.html'));
});
//회원가입페이지
router.get('/join', function(req, res, next){
    res.status(200)
    res.setHeader("Content-Type" , "text/html;characterset=utf8")
    res.sendFile(path.join(__dirname, '../views/components', 'join.html'));
});






module.exports = router;