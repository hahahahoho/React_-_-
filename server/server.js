const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const hostname = '192.168.0.40';
const port = 3000;
//라우터 파일
let link_page = require('./router/link_page');
let call_boards = require('./router/call_boards');
let call_notices = require('./router/call_notices');
let call_users = require('./router/call_users');
let call_auth = require('./router/call_auth');

//post형식 데이터를 받기 위해 사용;
app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.listen(port, hostname, function(req, res){
    console.log('server start');
})
//router설정 : 1. 페이지 / 2. api호출
app.use('/', link_page);

//
app.use('/fastival_data', call_boards);
app.use('/notices', call_notices);
app.use('/users', call_users);
app.use('/auth', call_auth);


