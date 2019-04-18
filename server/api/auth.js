const axios = require('axios');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
let app = {
    checkPhone : (data, res)=>{
        let ceil = data.ceil.replace(/\-/g,'');
        let check_num = Math.floor( Math.random() * (999999-100000+1)) + 100000;   
        axios({
            method : 'POST',
            url : 'https://api-sens.ncloud.com/v1/sms/services/ncp:sms:kr:253796810362:service_test/messages',
            json : true,
            headers : {
                'x-ncp-auth-key' : '5Gttlt45CWr5oahC3Oq3',
                'x-ncp-service-secret' : '83575dba61324fe8861ea2649303348f'
            },
            data : {
                type : 'SMS',
                content : '인증번호 : '+ check_num,
                from : '01088924092',
                to : [
                    ceil
                ]
            }
        }).then(result =>{
            console.log(result);
            if(result.status == 202){
                console.log('전송성공')
                res.send(check_num.toString());
            }else{
                console.log('전송실패');
                res.send('fail')
            }
        }).catch(function(err){
            console.log(err);
        })
    },
    checkEmail : (data, res)=>{
        let email = data.email;
        let check_num = Math.floor( Math.random() * (999999-100000+1)) + 100000;   
        console.log(email, check_num);
        let transporter = nodemailer.createTransport(smtpTransport({
            service : 'gamil',
            host : 'smtp.gmail.com',
            port : 465,
            auth : {
                user : 'maha4092@gmail.com',
                pass : 'mofas123$'
            }
        }))
        let mailOption = {
            from : 'MOFAS <MOFAS@gmail.com>',
            to : email,
            subject : 'MOFAS email 인증메일',
            text : '인증번호 : '+ check_num
        }
        transporter.sendMail(mailOption, (err, info)=>{
            if(err){
                return console.log(err)
            }
            console.log(info)
            res.send(check_num.toString());
        })
    }


}
module.exports = app;
