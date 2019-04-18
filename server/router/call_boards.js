const router = require('express').Router();
const boardAPI = require('../api/board');
//게시판 count
router.get('/', async function(req, res, next){  
    console.log('게시판 리스트보기')
    let result = await boardAPI.readBoardCount(); 
    var data = [];
    data[0] = {totalCount : result};
    res.send(data);
})

//게시판 상세보기
router.get('/:boardId', async function(req, res, next){
    console.log('게시판 상세보기')
    let boardId = req.params.boardId ? req.params.boardId : 1;
    //readBoardOne(id);
    let result = await boardAPI.readBoardOne(boardId); //게시판 상세보기
    res.send(result);
})
//메인리스트 호출
router.get('/:pageNum/:pageSize', async function(req, res, next){
    //readBoardList(pageNo, pageSize);
    let pageNum = req.params.pageNum ? req.params.pageNum : 1;
    let pageSize = req.params.pageSize ? req.params.pageSize : 10;
    let result = await boardAPI.readBoardList(pageNum, pageSize); 
    res.send(result);
})
//서치(문자, 숫자)리스트 호출
router.get('/:pageNum/:pageSize/:search', async function(req, res, next){
    //true : 문자 / false : 숫자
    let pageNum = req.params.pageNum ? req.params.pageNum : 1;
    let pageSize = req.params.pageSize ? req.params.pageSize : 10;
    let search = req.params.search ? req.params.search : "";
    let result;
    //readBoardList(pageNo, pageSize, search);
    result = await boardAPI.searchBoardList(pageNum, pageSize, search); //게시판 리스트 서치결과보기
    res.send(result);
})
//게시판 등록
router.post('/', async function(req, res, next){
    await boardAPI.createBoard(req.body);
    //res.send('');
})
//게시판 수정
router.put('/', async function(req, res, next){
    console.log('put 확인')
    console.log(req.body);
    //await boardAPI.updateBoard(req.body)
    //res.send('');
});
//게시판 삭제
router.delete('/', async function(req, res, next){
    await boardAPI.deleteBoard(req.body)
    //res.send('');
})


module.exports = router;