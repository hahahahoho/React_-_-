// const mysql = require('mysql');
// const dbconfig = require('../db_connectors/fastival_config');
// const connection = mysql.createConnection(dbconfig);
// connection.connect();
const connection = require('../db_connectors/fastival_connector');
const ela = require('../db_connectors/ela_connector');
let pageNo;
let pageSize;
let startPoint;


let app = {
    //게시판 리스트 count 조회
    readBoardCount : async ()=>{
        let result = await ela.search({
            index : "fastival_test",
            type : "error_list",
        });
        return result.hits.total
    },
    //메인게시판 리스트 조회
    readBoardList : async (n, size)=>{
        pageNo = n ? n : 1;
        pageSize = size ? size : 1
        startPoint = ((pageNo-1) * pageSize) +1
        let result = await ela.search({
            index : "fastival_test",
            type : "error_list",
            size : pageSize,
            from : startPoint,
            sort : "id:desc",
        });
        let arr = []
        for(let i = 0 ; i< result.hits.hits.length; i++){
            let obj = {};
            obj = result.hits.hits[i]._source
            obj['totalCount'] = result.hits.total
            arr.push(obj);
        }
        return arr;
    },
    //검색된 게시판 리스트 조회
    searchBoardList : async (n, size, search)=>{
        pageNo = n ? n : 1;
        pageSize = size ? size : 1
        startPoint = ((pageNo-1) * pageSize) +1
        let result = await ela.search({
            index : "fastival_test",
            type : "error_list",
            size : pageSize,
            from : startPoint,
            sort : "id:desc",
            body : {
                query : {
                    match : {
                        title : search
                    }
                }
            }
        });
        let obj = result.hits.hits;
        return obj;
    },
    //게시판 조회
    readBoardOne : async (_id)=>{
        let result = await ela.get({
            index : "fastival_test",
            type : "error_list",
            id : _id
        });
        let obj = result._source;
        return obj;
    },
    //게시판 생성
    createBoard : async (data)=>{
        let type = data.type;
        let subtype = data.subtype;
        let title = data.title;
        let contents = data.contents;
        let solution = data.solution;
        let keyword = data.keyword;
        let values = [type, subtype, title, contents, solution, keyword];
        mysql.beginTransaction(async function(err){
            await mysql.query('INSERT INTO fastival_data (type, subtype, title, contents, solution, keyword) VALUES (?,?,?,?,?,?)', values, function(err, result){
                if(err){
                    mysql.rollback();
                    throw err;
                }
            });
            await getCreateBoardNum(err, function(result){
                var result_json = {};
                for(keys in result){
                    if(keys != 'ID'){
                        result_json[keys] = result[keys];
                    }
                }
                ela.create({
                    index : 'fastival_test',
                    type : 'error_list',
                    id :  result.ID,
                    body : result_json
                }, function(err, response){
                    if(err){
                        mysql.rollback();
                        throw err;
                    }
                    mysql.commit(function(err){
                        if(err){
                            mysql.rollback();
                            throw err;
                        }
                        console.log('success');
                    })
                });
            })
        });
    },
    //게시판 업데이트
    updateBoard : async (data)=>{
        let id = data.id;
        let title = data.title;
        let contents = data.contents;
        let solution = data.solution;
        let keyword = data.keyword;
        let last_update_time = new Date();
        let values = [title, contents, solution, keyword, last_update_time, id];
        mysql.beginTransaction(async function(err){
            await mysql.query('UPDATE fastival_data SET title=?, contents=?, solution=?, keyword=?, last_update_date=? WHERE id=? ', values, function(err, result){
                if(err){
                    mysql.rollback();
                    throw err;
                }
            });
            await getUpdateBoardNum(id, function(result){
                var result_json = {};
                for(keys in result){
                    if(keys != 'ID'){
                        result_json[keys] = result[keys];
                    }
                }
                ela.update({
                    index : 'fastival_test',
                    type : 'error_list',
                    id :  result.ID,
                    body : {
                        doc : result_json
                    }
                }, function(err, response){
                    if(err){
                        mysql.rollback();
                        throw err;
                    }
                    mysql.commit(function(err){
                        if(err){
                            mysql.rollback();
                            throw err;
                        }
                        console.log('success');
                    })
                });
                
            })
        })
    },
    //게시판 삭제
    deleteBoard : async (data)=>{
        let _id = data.id;
        mysql.beginTransaction(async function(err){
            await mysql.query('DELETE FROM fastival_data WHERE id=? ', _id, function(err, result){
                if(err){
                    mysql.rollback();
                    throw err;
                }
                ela.delete({
                    index : 'fastival_test',
                    type : 'error_list',
                    id : _id
                }, function(err, response){
                    if(err){
                        mysql.rollback();
                        throw err;
                    }
                    mysql.commit(function(err){
                        if(err){
                            mysql.rollback();
                            throw err;
                        }
                        console.log('success');
                    })
                })
            });
        })
    }
}
function getCreateBoardNum(err, callback){
    mysql.query('SELECT * FROM fastival_data ORDER BY id desc limit 1', function(err, result){
        if(err){
            rollback();
            throw err;
        }
        callback(result[0]);
    })
}
function getUpdateBoardNum(id, callback){
    mysql.query('SELECT * FROM fastival_data WHERE id =? limit 1', id, function(err, result){
        if(err){
            mysql.rollback();
            throw err;
        }
        callback(result[0]);
    })
}



module.exports = app;
 