import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
const Ul = styled.ul`

`
const Li = styled.li`

`
const Span = styled.span`

`
const Div = styled.div`
    display : inline-block
`
const Input = styled.input`
    
`
const Button = styled.button`
`
class BoardUpdate extends Component {
    constructor(props){
        super(props);
    }
    setData = ({eleStatus, target, updateFiled, updateEvent})=>{
        if(Object.keys(eleStatus.data).length !== 0){
            return target.map((obj, index)=>{
                return Object.keys(eleStatus.data).map((key)=>{                
                    if(obj === key){
                        return <Li key='index'><Span>{key} : </Span>
                            {updateFiled.includes(obj) ? <Input onChange={updateEvent.input_changeVal} name={key} value={eleStatus.data[key]} key={key}></Input> : <Span>{eleStatus.data[key]}</Span>}
                        </Li>                    
                    }
                })
            })
        }else{
            return 'no data'
        }
    }
    render() {
        return (
            <div>
                {this.setData(this.props)}
                <Button id="update_btn" onClick={this.props.updateEvent.button_click}>완료</Button>
                <Button id="exit_btn" onClick={this.props.updateEvent.button_click}>나가기</Button>
            </div>
        );
    }
}


export default BoardUpdate;