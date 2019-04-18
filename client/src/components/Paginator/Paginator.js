import React, {Component} from 'react';
import update from 'react-addons-update';
import styled from 'styled-components';
const Button = styled.button`
    font-size:15px;
    ${props =>{
        if(parseInt(props['data-page']) === props.id){
            return 'color : blue; font-weight : bold'
        }
    }}
`
class  Paginator extends Component{
    constructor(props){
        super(props);
    }
    state = {
        curPage : 1,
        curBlock : 0,
        pageBlock : [],
        totalBlock : 0
    }
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.totalCount !== this.props.totalCount || nextState.pageBlock.length !== this.state.pageBlock.length){
            this.makePage(nextProps.totalCount);
            return true
        }else if(nextState.curPage !== this.state.curPage){
            this.props.pageEvent(nextState.curPage);
            return true
        }else if(this.state.pageBlock.length === 0 && nextProps.totalCount === this.props.totalCount){
            this.makePage(nextProps.totalCount);
        }
        return false;
    }
    componentDidUpdate(prevProps, prevState, snapShot){
        
    }
    makePage = (totalCount)=>{
        let perPage = 10;
        let totalPage = totalCount%perPage === 0 ? totalCount/perPage : parseInt(totalCount/perPage+1)
        let perBlock = 10;
        let totalBlock = totalPage%perBlock === 0 ? totalPage/perBlock : parseInt(totalPage/perBlock+1);
        let block = [];
        for(let i = 0 ; i < totalBlock; i++){
            let arr = [];
            for(let j = i*perBlock+1 ; j<(i+1)*perBlock+1; j++){
                if(j > totalPage)break;
                arr.push(j);
            }
            block.push(arr);
        }
        this.setState({
            pageBlock : block,
            totalBlock : totalBlock
        });
    }
    button_click = (e)=>{
        let val = e.target.id;
        if(this.state.pageBlock.length !== 0){
            if(val === 'prev'){
                if(this.state.curPage === 1){
                    alert('처음 페이지 입니다.');
                }else if(this.state.curPage === this.state.pageBlock[this.state.curBlock][0]){
                    this.setState({
                        curPage : this.state.curPage-1,
                        curBlock : this.state.curBlock-1
                    })
                }else{
                    this.setState({
                        curPage : this.state.curPage-1
                    })
                }
            }else if(val === 'next'){
                let lastPageIndex = this.state.pageBlock[this.state.totalBlock-1].length-1;
                let lastPage = this.state.pageBlock[this.state.totalBlock-1][lastPageIndex];
                let curBlockLastIndex = this.state.pageBlock[this.state.curBlock].length-1;
                let curBlockLastPage = this.state.pageBlock[this.state.curBlock][curBlockLastIndex];
                if(this.state.curPage >= lastPage){
                    alert('마지막 페이지 입니다.');
                }else if(this.state.curPage === curBlockLastPage){
                    this.setState({
                        curPage : this.state.curPage+1,
                        curBlock : this.state.curBlock+1
                    })
                }else{
                    this.setState({
                        curPage : this.state.curPage+1
                    })
                }
            }else{
                this.setState({
                    curPage : parseInt(val)
                });
            }
        }else{
            if(val === 'prev'){
                alert('이전 페이지가 없습니다.');
            }else if(val === 'next'){
                alert('다음 페이지가 없습니다.');
            }else{
                alert('없는 페이지 입니다.');
            }
        }
    }
    render(){
        const arr = this.state.pageBlock;
        const curBlock = this.state.curBlock;
        return (
            <div>
                <Button id="prev" onClick={this.button_click}>이전</Button>
                {arr.length !== 0 ? this.state.pageBlock[curBlock].
                    map(
                        (val, index)=>{return <Button key={val} data-page={this.state.curPage} id={val} onClick={this.button_click}>{val}</Button>}
                    ) : <Button data-page={this.state.curPage} id={1}>1</Button>
                }
                <Button id="next" onClick={this.button_click}>다음</Button>
            </div>
        )
    }
};

export default Paginator;