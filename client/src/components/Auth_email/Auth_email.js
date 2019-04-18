import React from 'react';
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
const Auth_email = ({authEmailEvent, eleStatus}) => {
    return (
        <div>
            <li>
                <label htmlFor="user_ceil">이메일 : </label>
                <Input type="text" id="user_email" name="email" placeholder="abc@naver.com" onChange={authEmailEvent.input_changeVal}/>
                <Button id="push_btn" onClick={authEmailEvent.button_click}>인증키 받기</Button>
            </li>
            <li>
                <label htmlFor="user_check_num">인증키 : </label>
                <Div status={eleStatus}>
                    <Input 
                        type="text" 
                        id="user_check_num" 
                        name="check_num" 
                        placeholder="인증키 입력" 
                        onChange={authEmailEvent.input_changeVal} 
                        onBlur={authEmailEvent.input_onBlur}
                        disabled={eleStatus.user_check_num.disabled}
                    />
                    <Span id="check_ment" status={eleStatus.check_ment}>{eleStatus.check_ment.text}</Span>
                </Div>
            </li>
        </div>
    );
};

export default Auth_email;