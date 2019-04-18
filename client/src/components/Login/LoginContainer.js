import Login from './Login';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import React, { Component } from 'react';
import * as loginAction from '../../modules/login';

class LoginContainer extends Component {
    constructor(props){
        super(props)
    }
    loginEvent = {
        input_changeVal : (e)=>{
            let val = e.target.value;
            let name = e.target.name;
            let data = {val, name};
            const {LoginActions} = this.props;
            LoginActions.change(data);
        },
        button_click : (e) => {
            const {LoginActions} = this.props;
            if(e.target.id === 'login_btn'){
                const userInfo = this.props.state.login
                //유효성 검사는 여기서 
                LoginActions.loginAsync(userInfo);
            }
            if(e.target.id === 'join_btn'){
                const {history} = this.props;
                history.push('/join')
            }
        }
    }
    render() {
        return (
            <div>
                <Login loginEvent={this.loginEvent}/>
            </div>
        );
    }
}


export default connect(
    (state) => ({ //최초의 상태만 가져와서 props로 값을 담는다! 변화하고부터는 다른걸로 가져와야겠지요?
        state : state 
    }),
    (dispatch) => ({ //액션이 실행되면 연결된 하위컴포넌트들의 값도 모두 변경
        LoginActions : bindActionCreators(loginAction, dispatch)
    })
)(LoginContainer);
