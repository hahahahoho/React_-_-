import React from 'react';
//import {Input, Button} from 'components/Util';
import styled from 'styled-components';

//component style 정의 영역
const Input = styled.input``
const Button = styled.button``
const Div = styled.div`
    display : inline-block;
    border : ${({status}) => {
        return status.checkYn === 'y' ? '1px solid green' : '1px solid red';
    }}
`
const Span = styled.span`
    display : ${({status}) => {
        return status.view === 'y' ? 'inline-block' : 'none'       
    }}
`

//component element 정의 영역
const Auth_phone = ({authPhoneEvent, eleStatus}) => {
    return (
        <div>
            <li>
                <label htmlFor="user_ceil">핸드폰 : </label>
                <Input type="text" id="user_ceil" name="ceil" placeholder="010-0000-0000" onChange={authPhoneEvent.input_changeVal}/>
                <Button id="push_btn" onClick={authPhoneEvent.button_click}>인증번호 받기</Button>
            </li>
            <li>
                <label htmlFor="user_check_num">인증번호 : </label>
                <Div status={eleStatus}>
                    <Input 
                        type="text" 
                        id="user_check_num" 
                        name="check_num" 
                        placeholder="인증번호 입력" 
                        onChange={authPhoneEvent.input_changeVal} 
                        onBlur={authPhoneEvent.input_onBlur}
                        disabled={eleStatus.user_check_num.disabled}
                    />
                    <Span id="check_ment" status={eleStatus.check_ment}>{eleStatus.check_ment.text}</Span>
                </Div>
            </li>
        </div>
    );
};


export default Auth_phone;