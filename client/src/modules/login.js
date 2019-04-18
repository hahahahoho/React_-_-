import {Map, List} from 'immutable';
import {createAction, handleActions} from 'redux-actions';
import axios from 'axios';


const CHANGE = 'login/CHANGE';
const GET_POST_PENDING = "login/GET_POST_PENDING";
const GET_POST_SUCCESS = "login/GET_POST_SUCCESS";
const GET_POST_FAILURE = "login/GET_POST_FAILURE";

export const change = createAction(CHANGE);
export const getPostPending = createAction(GET_POST_PENDING);
export const getPostSuccess = createAction(GET_POST_SUCCESS);
export const getPostFailure = createAction(GET_POST_FAILURE);

export const loginAsync = (userInfo) => dispatch =>{
    dispatch(getPostPending());
    return axios.post('http://192.168.0.40:3000/users/login', userInfo).then(res =>{
        dispatch(getPostSuccess(res));
        console.log(res.data)
        if(res.data === 'success'){
            alert('로그인 성공');
        }else{
            alert('로그인 실패');
        }
        return res;
    }).catch(err => {
        dispatch(getPostFailure());
        throw(err);
    })
}
const initialData = {
    id : '',
    password : '',
    loginYn : 'N'
}

export default handleActions({
    [CHANGE] : (state, action) => {
        const {val, name} = action.payload
        let result = Map(state).set(name, val);
        return result.toJS()
        //const value = action.payload
        //return value;
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
}, initialData)