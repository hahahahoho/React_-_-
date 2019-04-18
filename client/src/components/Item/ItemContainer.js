import React, { Component } from 'react';
import * as listItemActions from 'modules/listItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import axios from 'axios';

class ListItemContainer extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        const {ListItemActions} = this.props;
        axios.get('http://192.168.0.40:3000/boards/1', function(){
            
        })
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default connect(
    (state) => ({
        state : state
    }),
    (dispatch) => ({
        ListItemActions : bindActionCreators(listItemActions, dispatch)
    })
)(ListItemContainer);