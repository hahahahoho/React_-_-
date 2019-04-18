import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Auth_email from './Auth_email';
import * as auth_emailActions from 'modules/auth_email';

class Auth_emailContainer extends Component {
    constructor(props){
        super(props);
    }
    authEmailEvent = {
        input_changeVal : (e)=>{
            const {Auth_emailActions} = this.props;
            let val = e.target.value;
            let name = e.target.name;
            let data = {val, name};
            Auth_emailActions.change(data);
        },
        input_onBlur : async (e)=>{
            const {Auth_emailActions} = this.props
            const userInfo = this.props.state.auth_email;
            if(e.target.id === 'user_check_num'){
                if(userInfo.check_num === userInfo.auth_num && userInfo.check_num !== ``){
                    await Auth_emailActions.change({val : '인증완료', name : ['check_ment', 'text']});
                    await Auth_emailActions.change({val : 'y', name : 'check_yn'});
                }else{
                    await Auth_emailActions.change({val : '인증실패', name : ['check_ment', 'text']});
                    await Auth_emailActions.change({val : 'n', name : 'check_yn'});
                }
                Auth_emailActions.change({val : 'y', name : ['check_ment', 'view']});
            }
        },
        button_click : async(e)=>{
            const {Auth_emailActions} = this.props
            const userInfo = this.props.state.auth_email;
            if(e.target.id === "push_btn"){
                let flagCnt = 0;
                flagCnt = this.authEmailEvent.check_email(userInfo);
                if(flagCnt === 1){
                    Auth_emailActions.checkEmailAsync({email : userInfo.email});
                    let val = false;
                    let name = ['user_check_num', 'disabled']
                    await Auth_emailActions.change({val, name});
                    console.log(this.props.state.auth_email);
                }
            }        
        },
        check_email : (userInfo) => {
            let flagCnt = 0;
            if(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(userInfo.email)){flagCnt++;}else{alert('이메일 주소를 확인하여 주세요.');return 0;};
            return flagCnt;
        }
    }
    render() {
        
        return (
            <div>
                <Auth_email authEmailEvent={this.authEmailEvent} eleStatus={this.props.state.auth_email}/>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        state : state
    }),
    (dispatch) => ({
        Auth_emailActions : bindActionCreators(auth_emailActions, dispatch)
    })
)(Auth_emailContainer);