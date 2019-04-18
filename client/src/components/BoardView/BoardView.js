import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const Ul = styled.ul`

`
const Li = styled.li`

`
const Sapn = styled.span`

`
const Div = styled.div`
    display : inline-block
`
const Button = styled.button`
    
`
const BoardView = ({eleStatus, target, viewEvent, updateFiled, tName}) => { 
    let data = target.map((obj, index)=>{
        return Object.keys(eleStatus.data).map((key)=>{
                if(key === obj){
                    return <Li key='index'><Sapn>{key} : </Sapn><Div key={key}>{eleStatus.data[key]}</Div></Li>
                }
        })
    })
    return (
        <div>
            <Ul>
                {data}
            </Ul>
            <Button><Link to={{pathname : '/boardUpdate', state : {eleStatus : eleStatus, target : target, tName : tName, updateFiled : updateFiled}}} style={{color : 'black'}}>수정</Link></Button>
            <Button>삭제</Button>
            <Button id="exit_btn" onClick={viewEvent.button_click}>나가기</Button>
        </div>
    );
};

export default BoardView;