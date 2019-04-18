import React, { Component } from 'react';
import BoardUpdate from './BoardUpdate';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as updateActions from 'modules/boardUpdate';
class BoardUpdateContainer extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log(this.props);
        const { UpdateActions } = this.props;
        const initialData = this.props.history.location.state.eleStatus.data;
        UpdateActions.setData(initialData)
    }
    shouldComponentUpdate(nextProps, nextState){
        //추후 update시 다른컴포넌트와 렌더링 겹칠 시에 추가
        return true 
    }
    matchFiled(){
        let result = [];
        let target = this.props.history.location.state.target;
        let updateFiled = this.props.history.location.state.updateFiled
        target.map((key)=>{
            for(let i = 0 ; i < updateFiled.length; i++){
                if(key === updateFiled[i]){
                    result.push(key)
                }
            }
        })
        return result;
    }
    updateEvent = {
        input_changeVal : (e)=>{
            const { UpdateActions } = this.props;
            let val = e.target.value;
            let name = e.target.name;
            let data = {val, name};
            UpdateActions.change(data);
        },
        button_click : (e)=>{
            if(e.target.id === 'exit_btn'){
                const {history} = this.props;
                history.goBack();
            };
            if(e.target.id === 'update_btn'){
                const { UpdateActions, history } = this.props;
                const boardInfo = {}
                const tName = this.props.history.location.state.tName
                if(this.props.state.boardUpdate.update_field.length !== 0){
                    this.props.state.boardUpdate.update_field.map((key)=>{
                        Object.keys(this.props.state.boardUpdate.data).map((obj)=>{
                            if(key === obj){
                                boardInfo[key] = this.props.state.boardUpdate.data[key]
                            }
                        })
                    })
                    UpdateActions.updateBoard(tName, boardInfo, history);
                }else{
                    alert('변경 내용이 없습니다.')
                }
                
                alert('수정!');
            };
        }
    }
    render() {
        let target =this.props.history.location.state.target //보여질 필드
        //updateFiled는 input처리할 필드명
        return (
            <div>
                <BoardUpdate eleStatus={this.props.state.boardUpdate} target={target} updateFiled={this.matchFiled()} updateEvent={this.updateEvent}></BoardUpdate>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        state : state
    }),
    (dispatch) => ({
        UpdateActions : bindActionCreators(updateActions, dispatch)
    })
)(BoardUpdateContainer);