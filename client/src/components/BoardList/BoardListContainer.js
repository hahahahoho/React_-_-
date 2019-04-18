import React, {Component} from 'react';
import * as listActions from 'modules/boardList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BoardList from './BoardList'
import Paginator from 'components/Paginator'



class BoardListContainer extends Component {
    constructor(props){
        super(props);
        //빈껍대기 렌더링
    }
    async componentDidMount(){
        const {ListActions} = this.props
        if(this.props.tName !== undefined){
            await ListActions.boardListCount(this.props.tName);
            await ListActions.boardListAsync(this.props.tName, 1);
        }
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.state.boardList.error === false && nextProps.state.boardList.pending === false && this.props.tName === nextProps.state.boardList.target){            
            return true
        }else{
            return false;
        }       
    }
    readList=(curPage)=>{
        const {ListActions} = this.props
        if(curPage === undefined || curPage === 'NaN'){
            curPage = 1
        }
        ListActions.boardListAsync(this.props.tName, curPage);
    }
    render(){
        const totalCount = this.props.state.boardList.totalCount[this.props.tName];
        return (
            <div>
                <h2>리스트 데이타</h2>
                <BoardList eleStatus={this.props.state.boardList} tName={this.props.tName} target={this.props.target}></BoardList>
                <Paginator totalCount={totalCount} pageEvent={this.readList}></Paginator>
            </div>
        );
    }
};

export default connect(
    (state) => ({ //최초의 상태만 가져와서 props로 값을 담는다! 변화하고부터는 다른걸로 가져와야겠지요?
        state : state 
    }),
    (dispatch) => ({ //액션이 실행되면 연결된 하위컴포넌트들의 값도 모두 변경
        ListActions : bindActionCreators(listActions, dispatch)
    })
)(BoardListContainer);