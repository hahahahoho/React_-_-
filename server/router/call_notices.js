const router = require('express').Router();
const noticeAPI = require('../api/notice');


//메인리스트 호출
router.get('/:pageNum/:pageSize', function(req, res, next){
    //readBoardList(pageNo, pageSize);
    let pageNum = req.params.pageNum ? req.params.pageNum : 1;
    let pageSize = req.params.pageSize ? req.params.pageSize : 10;
    noticeAPI.readNoticeList(pageNum, pageSize, res); 
    
    //res.send(result);
});
//list count
router.get('/', function(req, res, next){  
    noticeAPI.readNoticeCount(res); 
    //res.send(result);
})

module.exports = router;