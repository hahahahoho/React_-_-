// const mysql = require('mysql');
// const dbconfig = require('../db_connectors/fastival_config');
// const connection = mysql.createConnection(dbconfig);
// connection.connect();
const connection = require('../db_connectors/fastival_connector');
const pbkfd2Password  = require('pbkdf2-password');
const hasher = pbkfd2Password();
let app = {
    //로그인
    login : async (data, res) => {
        let id = data.id;
        let password = data.password;
        await connection.query('SELECT salt FROM user WHERE id="'+id+'"', function(err, result){
            hasher({password : password, salt : result[0].salt}, function(err, pass, salt, hash){
                connection.query('SELECT id FROM user WHERE id="'+id+'" AND password="'+hash+'"', function(err, result){
                    if(err){
                        throw err;
                    }
                    if(result.length == 0 ){
                        console.log('fail');
                        res.status(200).send("fail");
                    }else{
                        console.log('success');
                        res.status(200).send("success");
                    }
                });
            })
        })       
    },
    //회원가입
    createUser : (data, res)=>{
        let id = data.id;
        //let nickName = data.nickName;
        let nickName = data.name;
        let password = data.password;
        let email = data.email;
        let cel = data.ceil;
        //let values = [id, nickName, password, email, cel];      
       // connection.query('INSERT INTO user (ID, NICKNAME, PASSWORD, EMAIL, CEL) VALUES (?,?,?,?,?)', values, function(err, result){
        //     if(err){
        //         throw err;
        //     }
        //     res.status(200).send("success");
        // });
        hasher({password : password}, function(err, pass, salt, hash){
            console.log(err, pass, salt, hash);
            let _password = hash;
            let _salt = salt;
            let values = [id, _password, nickName, cel, _salt, email, 'USER', null, null];
            console.log(values);
            connection.query('INSERT INTO user (ID, PASSWORD, NICKNAME, CEL, SALT, EMAIL) VALUES (?,?,?,?,?,?)', values, function(err, result){
                if(err){
                    throw err;
                }
                res.status(200).send("success");
            });
        })
    },
    //회원리스트 출력
    readUserList : (data)=>{
        let type = data.type ? data.type : '';
        let level = data.level ? data.level : ''; //아직 미구현 레벨별 오름차순, 내림차순
        let id = data.id ? data.id : '';
        let pageNo = data.pageNo ? data.pageNo : 1;
        let pageSize = data.pageSize ? data.pageSize : 10
        let startNo = (pageNo-1)*pageSize
        //sql조건에 따른 추가
        let condition_sql;
        if(type != '' || id != ''){
            condition_sql = 'WHERE ';
            if(type != '')condition_sql+='type="'+type+'" '; 
            if(type != '' && id != '')condition_sql+='and '
            if(id != '')condition_sql+='id LIKE("'+id+'%") ';
        };
        let sql;
        sql = 'SELECT ID, NICKNAME, EMAIL, CEL FROM user inner join (SELECT ID from user '+condition_sql;
        sql+= 'LIMIT '+startNo+', '+pageSize+') as b using(ID) order by Id desc, level asc';
        connection.query(sql, function(err, result){
            console.log(result);
        });
    },
    searchUserList : ()=>{
      //id검색
      
      //닉네임검색

      //이메일 검색

    },
    readUserOne : ()=>{

    },
    updateUser : ()=>{

    },
    deleteUser : ()=>{

    }
}

module.exports = app;