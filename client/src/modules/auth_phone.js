import {Map, List} from 'immutable';
import {createAction, handleActions} from 'redux-actions';
import axios from 'axios';

const CHANGE = "auth_phone/CHANGE";
const GET_POST_PENDING = "auth_phone/GET_POST_PENDING";
const GET_POST_SUCCESS = "auth_phone/GET_POST_SUCCESS";
const GET_POST_FAILURE = "auth_phone/GET_POST_FAILURE";

export const getPostPending = createAction(GET_POST_PENDING);
export const getPostSuccess = createAction(GET_POST_SUCCESS);
export const getPostFailure = createAction(GET_POST_FAILURE);
export const change = createAction(CHANGE);


export const checkPhoneAsync = (userInfo, history) => dispatch =>{
    dispatch(getPostPending());
    return axios.post('http://192.168.0.40:3000/auth/phone', userInfo).then(res =>{
        dispatch(getPostSuccess(res));
        if(res.data !== 'fail'){
            let val = String(res.data);
            let name = 'auth_num';
            dispatch(change({val, name}));
        }
        return res;
    }).catch(err => {
        dispatch(getPostFailure());
        throw(err);
    })
}

const initialData = {
    ceil : '',
    auth_num : '',
    check_num : '',
    check_yn : 'n',
    user_check_num : {    
        disabled : true,
        readonly : false
    },
    check_ment : {
        view : '',
        text : ''
    }
}


export default handleActions({
    [CHANGE] : (state, action) => {
        const {val, name} = action.payload
        if(typeof name !== "object"){
            let result = Map(state).set(name, val);
            return result.toJS()
        }else{    
            let result = Map(state).setIn(name, val);
            return result.toJS();
        }
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