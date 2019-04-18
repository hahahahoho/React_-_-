import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Join from './Join'
import * as joinActions from 'modules/join';


class JoinContainer extends Component {
    constructor(props){
        super(props);
    }
    joinEvent = {
        input_changeVal : (e)=>{
            const {JoinActions} = this.props;
            let val = e.target.value;
            let name = e.target.name;
            let data = {val, name};
            JoinActions.change(data);
        },
        button_click : (e) => {
            const {JoinActions} = this.props;
            if(e.target.id === 'join_btn'){
                const {history} = this.props;
                const userInfo = this.props.state.join;
                let flagCnt = this.joinEvent.check_user(userInfo);              
                if(this.props.state.auth_phone.check_yn === 'y' && flagCnt === 4){                 
                    userInfo.ceil = this.props.state.auth_phone.ceil;
                    flagCnt++;                
                }else if( this.props.state.auth_phone.check_yn === 'n' && flagCnt === 4){
                    alert('휴대폰 인증이 필요합니다.');
                };
                if(this.props.state.auth_email.check_yn === 'y' && flagCnt === 5){                 
                    userInfo.email = this.props.state.auth_email.email;
                    JoinActions.joinAsync(userInfo, history); 
                }else if( this.props.state.auth_email.check_yn === 'n' && flagCnt === 5){
                    alert('이메일 인증이 필요합니다.');
                };
            }
            if(e.target.id === 'exit_btn'){
                const {history} = this.props;
                history.push('/')
            }
        },
        check_user : (userInfo) => {
            let flagCnt = 0;
            //아이디 체크
            if(/^[a-z]+[a-z0-9]{5,19}$/g.test(userInfo.id)){flagCnt++;}else{alert('아이디를 확인하여 주세요.'); return 0;};
            //비밀번호 체크
            if(/^[A-Za-z0-9]{10,18}$/.test(userInfo.password)){flagCnt++;}else{alert('비밀번호를 확인하여 주세요.');return 0; };
            //비밀번호 일치여부 체크
            if(userInfo.password === userInfo.password_re && userInfo.password_re !== ''){flagCnt++;}else{alert('비밀번호가 일치하지 않습니다.');return 0;};
            //이름 공백여부
            if(userInfo.name !== ''){flagCnt++;}else{alert('이름을 입력해주세요');return 0;}
            return flagCnt;
        }
    }
    render() {
        return (
            <div>
                <Join joinEvent={this.joinEvent}/>
            </div>
        );
    }

}
export default connect(
    (state) => ({
        state : state
    }),
    (dispatch) => ({
        JoinActions : bindActionCreators(joinActions, dispatch)
    })
)(JoinContainer);