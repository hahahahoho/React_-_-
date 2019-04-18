import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Auth_phone from './Auth_phone';
import * as auth_phoneActions from 'modules/auth_phone';
class Auth_phoneContainer extends Component {
    constructor(props){
        super(props)
    }
    authPhoneEvent = {
        //check_num auth_num
        input_changeVal : (e)=>{
            const {Auth_phoneActions} = this.props;
            let val = e.target.value;
            let name = e.target.name;
            let data = {val, name};
            Auth_phoneActions.change(data);
        },
        input_onBlur : async (e)=>{
            const {Auth_phoneActions} = this.props
            const userInfo = this.props.state.auth_phone;
            if(e.target.id === 'user_check_num'){
                if(userInfo.check_num === userInfo.auth_num && userInfo.check_num !== ``){
                    await Auth_phoneActions.change({val : '인증완료', name : ['check_ment', 'text']});
                    await Auth_phoneActions.change({val : 'y', name : 'check_yn'});
                }else{
                    await Auth_phoneActions.change({val : '인증실패', name : ['check_ment', 'text']});
                    await Auth_phoneActions.change({val : 'n', name : 'check_yn'});
                }
                Auth_phoneActions.change({val : 'y', name : ['check_ment', 'view']});
            }
        },
        button_click : async (e)=>{
            const {Auth_phoneActions} = this.props
            const userInfo = this.props.state.auth_phone;
            if(e.target.id === "push_btn"){
                let flagCnt = 0;
                flagCnt = this.authPhoneEvent.check_ceil(userInfo);
                if(flagCnt === 1){
                    Auth_phoneActions.checkPhoneAsync({ceil : userInfo.ceil});
                    let val = false;
                    let name = ['user_check_num', 'disabled']
                    await Auth_phoneActions.change({val, name});
                }
            }         
        },
        check_ceil : (userInfo) => {
            let flagCnt = 0;
            if(/^\d{3}-\d{3,4}-\d{4}$/.test(userInfo.ceil)){flagCnt++;}else{alert('휴대폰 번호를 확인하여 주세요.');return 0;};
            return flagCnt;
        }
        
    }
    render() {
        return (
            <React.Fragment>
                <Auth_phone authPhoneEvent={this.authPhoneEvent} eleStatus={this.props.state.auth_phone}/>
            </React.Fragment>
        );
    }
}



export default connect(
    (state) => ({
        state : state
    }),
    (dispatch) => ({
        Auth_phoneActions : bindActionCreators(auth_phoneActions, dispatch)
    })
)(Auth_phoneContainer);