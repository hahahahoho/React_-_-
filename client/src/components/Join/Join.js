import React from 'react';
import Auth_phone from 'components/Auth_phone';
import Auth_email from 'components/Auth_email';
import styled from 'styled-components';

//component style 정의영역
const Input = styled.input``
const Button = styled.button``

//component element 정의영역
const Join = ({joinEvent}) => {
    return (
        <div>
            <ul>
                <li><label>아이디 : </label>        <Input id="join_id"   name="id"          type="text" onChange={joinEvent.input_changeVal}/></li>
                <li><label>비밀번호 : </label>      <Input id="join_pw"   name="password"    type="text"  onChange={joinEvent.input_changeVal}/></li>
                <li><label>비밀번호 재확인 : </label><Input id="join_pw2"  name="password_re" type="text" onChange={joinEvent.input_changeVal}/></li>
                <li><label>이름 : </label>          <Input id="join_name" name="name"        type="text" onChange={joinEvent.input_changeVal}/></li>
                <Auth_phone />
                <Auth_email />
            </ul>
            <div>
                <Button id="join_btn" onClick={joinEvent.button_click}>회원가입</Button>
                <Button id="exit_btn" onClick={joinEvent.button_click}>나가기</Button>
            </div>
           
        </div>
    );
};

export default Join;