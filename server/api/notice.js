const connection = require('../db_connectors/fastival_connector');

let app = {
    //리스트 count
    readNoticeCount : async (res) =>{
        let sql = 'SELECT COUNT(NO) AS totalCount FROM notice';
        await connection.query(sql, function(err, result){
            if(err){
                console.log(err);
                throw err
            }else{
                res.send(result);
            }
        })
    },

    //리스트 조회
    readNoticeList : async (n, size, res)=>{
        //sql조건에 따른 추가
        startPoint = ((n-1) * size)
        let sql = 'SELECT R1.* FROM (SELECT NO, TITLE, CONTENTS, WRITER, CREATE_DATE FROM notice ORDER BY NO desc) R1 LIMIT '+startPoint+', '+size;
        await connection.query(sql, function(err, result){
            if(err){
                console.log(err);
                throw err
            }else{
                res.send(result);
                return result
            }
        });
    }
}

module.exports = app;