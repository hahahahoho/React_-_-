import {Map, List} from 'immutable';
import {handleActions, createAction} from 'redux-actions';
import axios from 'axios';

const CREATE = 'list/CREATE';
const REMOVE = 'list/REMOVE';
const UPDATE = 'list/UPDATE';
const READ = 'list/READ';

const GET_POST_PENDING = "GET_POST_PENDING";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_FAILURE = "GET_POST_FAILURE";

export const create = createAction(CREATE);
export const remove = createAction(REMOVE);
export const update = createAction(UPDATE);
export const read = createAction(READ);
export const getPostPending = createAction(GET_POST_PENDING);
export const getPostSuccess = createAction(GET_POST_SUCCESS);
export const getPostFailure = createAction(GET_POST_FAILURE);


const initialState = {
    pending : false,
    error : false,
    data : {}
};

//액션 핸들
export default handleActions({
    [CREATE] : (state, action) => {
        const {id, text, done} = action.payload //액션에 보내진 파라미터들을 담고 있음
        return state.push(Map({ //처리 후 상태를 변경해준다.
            id,text,done
        }))
    },
    [REMOVE] : (state, action) => {
        const {id, text, done} = action.payload //액션에 보내진 파라미터들을 담고 있음
        return state.push(Map({ //처리 후 상태를 변경해준다.
            id,text,done
        }))
    },
    [UPDATE] : (state, action) => {
        const {id, text, done} = action.payload //액션에 보내진 파라미터들을 담고 있음
        return state.push(Map({ //처리 후 상태를 변경해준다.
            id,text,done
        }))
    },
    [READ] : (state, action) => {
        return state
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
        const data = action.payload;
        return {
            ...state,
            pending : false,
            data : data
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
}, initialState)