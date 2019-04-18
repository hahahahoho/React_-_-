import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const HeaderTag = styled.header`
    height : 50px;
    background : #9e3e065e;
    
`
const Li = styled.li`
    float : left;
    margin-right : 30px;
    margin-left : 10px;
    list-style : none;
`
const Header = ({match}) => {
    return (
        <React.Fragment>
            <HeaderTag>
                <Li><Link to='/'>홈</Link></Li>
                <Li><Link to='/login'>로그인</Link></Li>
                <Li><Link to='/join'>회원가입</Link></Li>
            </HeaderTag>
            
        </React.Fragment>
    );
};

export default Header;