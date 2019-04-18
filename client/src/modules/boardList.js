import {Map, List} from 'immutable';
import {handleActions, createAction} from 'redux-actions'
import axios from 'axios';

const READ = 'boardList/READ';
const GET_POST_PENDING = "boardList/GET_POST_PENDING";
const GET_POST_SUCCESS = "boardList/GET_POST_SUCCESS";
const GET_POST_SUCCESS2 = "boardList/GET_POST_SUCCESS2";
const GET_POST_FAILURE = "boardList/GET_POST_FAILURE";

//액션 생성
export const read = createAction(READ);
export const getPostPending = createAction(GET_POST_PENDING);
export const getPostSuccess = createAction(GET_POST_SUCCESS);
export const getPostSuccess2 = createAction(GET_POST_SUCCESS2);
export const getPostFailure = createAction(GET_POST_FAILURE);

export const boardListCount = (tName) => dispatch => {
    dispatch(getPostPending());
    return axios.get('http://192.168.0.40:3000/'+tName).then(res=>{       
        res.tName = tName;
        dispatch(getPostSuccess2(res))
        return res;
    }).catch(error =>{
        dispatch(getPostFailure());
        throw(error);
    }) 
    
}
export const boardListAsync = (tName, curPage) => dispatch => {
    dispatch(getPostPending());
    return axios.get('http://192.168.0.40:3000/'+tName+'/'+curPage+'/10').then(res=>{
        res.tName = tName;
        dispatch(getPostSuccess(res))
        return res;
    }).catch(error =>{
        dispatch(getPostFailure());
        throw(error);
    }) 
    
}

const initialData = {
    pending : true,
    error : true,
    data : {},
    target : '',
    totalCount : {}
};
//액션 핸들
export default handleActions({
    [READ] : async (state, action) => {
        let val = action.payload.data;
        return {
            ...state,
            data : val
        }
        // const {id, text, done} = action.payload //액션에 보내진 파라미터들을 담고 있음
        // return state.push(Map({ //처리 후 상태를 변경해준다.
        //     id,text,done
        // }))
    },
    [GET_POST_PENDING] : (state, action) => {
        console.log('펜딩중')
        return {
            ...state,
            pending : true,
            error : false
        }
    },
    [GET_POST_SUCCESS] : (state, action) => {
        console.log('성공');
        let data = {...state.data};
        let totalCount = state.totalCount;
        let tName = action.payload.tName;
        data = {...state.data, [tName] : action.payload.data};
        return {
            ...state,
            pending : false,
            data : data,
            target : tName,
            totalCount : totalCount
        }
    },
    [GET_POST_SUCCESS2] : (state, action) => {
        console.log('성공2');
        let totalCount = state.totalCount
        let tName = action.payload.tName
        if(action.payload.data.length !== undefined && action.payload.data.length !== 0){
            totalCount = {...state.totalCount, [tName] :action.payload.data[0].totalCount}
        }    
        return {
            ...state,
            pending : false,
            totalCount : totalCount
        }
    },
    [GET_POST_FAILURE] : (state, action) => {
        console.log('실패')
        return {
            ...state,
            pending : false,
            error : true
        }
    }
}, initialData)



