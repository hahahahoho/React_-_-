import {Map, List} from 'immutable';
import {createAction, handleActions} from 'redux-actions';
import axios from 'axios';

const CHANGE = 'boardUpdate/CHANGE';
const UPDATE = 'boardUpdate/UPDATE';
const SET_DATA = 'boardUpdate/SET_DATA'
const GET_POST_PENDING = "boardView/GET_POST_PENDING";
const GET_POST_SUCCESS = "boardView/GET_POST_SUCCESS";
const GET_POST_FAILURE = "boardView/GET_POST_FAILURE";

export const setData = createAction(SET_DATA)
export const change = createAction(CHANGE);
export const update = createAction(UPDATE);
export const getPostPending = createAction(GET_POST_PENDING);
export const getPostSuccess = createAction(GET_POST_SUCCESS);
export const getPostFailure = createAction(GET_POST_FAILURE);
export const updateBoard = (tName, boardInfo, history) => dispatch =>{
    dispatch(getPostPending());
    return axios.put('http://192.168.0.40:3000/'+tName, boardInfo).then(res =>{
        dispatch(getPostSuccess(res));
        console.log(res.data)
        if(res.data === 'success'){
            alert('수정 성공');
            history.push('/');
        }else{
            alert('수정 실패');
            history.push('/join');
        }
        return res;
    }).catch(err => {
        dispatch(getPostFailure());
        throw(err);
    })
}
const initialData = {
    update_field : [],
    data : {},
    update_yn : false
};

export default handleActions({
    [SET_DATA] : (state, action)=>{
        return {
            ...state,
            data : {...action.payload}
        }
    },
    [CHANGE] : (state, action)=>{
        let {val, name} = action.payload
        let data = {...state.data, [name] : val}
        let update_field = [...state.update_field]
        if(!state.update_field.includes(name)){
            update_field = [...state.update_field, name]
        }
        return {
            ...state,
            update_field : update_field,
            data : data   
        }
    },
    [UPDATE] : (state, action)=>{
        return state
    },
    [GET_POST_PENDING] : (state, action)=>{
        return state
    },
    [GET_POST_SUCCESS] : (state, action)=>{
        return state
    },
    [GET_POST_FAILURE] : (state, action)=>{
        return state
    }
}, initialData)