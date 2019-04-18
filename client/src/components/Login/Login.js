import React, { Component } from 'react';
import {Input, Button} from 'components/Util';



class Login extends Component {
    render() {
        const {loginEvent} = this.props
        return (
            <div>
                <ul>
                    <li><label>아이디 :</label><Input name="id" id="login_id" type="text" onchange={loginEvent.input_changeVal}/></li>
                    <li><label>비밀번호 :</label><Input name="password" id="login_password" type="text" onchange={loginEvent.input_changeVal}/></li>
                </ul>
                <Button text="로그인" id="login_btn" onclick={loginEvent.button_click}></Button>
                <Button text="회원가입" id="join_btn" onclick={loginEvent.button_click}></Button>
            </div>
        );
    }
}

export default Login;