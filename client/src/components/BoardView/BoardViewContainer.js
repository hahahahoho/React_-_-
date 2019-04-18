import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as viewActions from 'modules/boardView'
import BoardView from './BoardView';
class BoardViewContainer extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const {ViewActions} = this.props
        if(this.props.history.location.state !== undefined){
            let id = this.props.history.location.state.id ;
            let tName = this.props.history.location.state.tName;
            ViewActions.boardViewAsync(id, tName);   
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        if(this.props.state.boardView.data.id !== nextProps.state.boardView.data.id){  
            return true
        }else{
            return false
        }
    }
    viewEvent = {
        button_click : (e)=>{
            if(e.target.id === 'exit_btn'){
                const {history} = this.props;
                history.goBack();
            };
        }
    }
    updateFiled = ['title', 'TITLE','contents','CONTENTS','solution','SOLUTION']
    target = this.props.history.location.state === undefined ? ['id', 'title', 'contents'] : this.props.history.location.state.target
    tName = this.props.history.location.state.tName
    render() {     
        return (
            <div>
                <BoardView eleStatus={this.props.state.boardView} target={this.target} tName={this.tName} updateFiled={this.updateFiled} viewEvent={this.viewEvent}></BoardView>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        state : state
    }),
    (dispatch) => ({
        ViewActions : bindActionCreators(viewActions, dispatch)
    })
)(BoardViewContainer);