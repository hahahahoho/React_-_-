import {Map, List} from 'immutable';
import {createAction, handleActions} from 'redux-actions';
import axios from 'axios';



const REMOVE = 'boardView/REMOVE';
const GET_POST_PENDING = "boardView/GET_POST_PENDING";
const GET_POST_SUCCESS = "boardView/GET_POST_SUCCESS";
const GET_POST_FAILURE = "boardView/GET_POST_FAILURE";


export const remove = createAction(REMOVE);

export const getPostPending = createAction(GET_POST_PENDING);
export const getPostSuccess = createAction(GET_POST_SUCCESS);
export const getPostFailure = createAction(GET_POST_FAILURE);

export const boardViewAsync = (id, tName) => dispatch => {
    dispatch(getPostPending());
    if(id === undefined || id === 'NaN'){
        id = 1
    }
    return axios.get('http://192.168.0.40:3000/'+tName+'/'+id).then(res=>{
        dispatch(getPostSuccess(res))
        return res;
    }).catch(error =>{
        dispatch(getPostFailure());
        throw(error);
    })
}


const initialData = {
    id : 2,
    pending : true,
    error : true,
    data : {
        '@timestamp': '',
        '@version': '',
        'contents': '',
        'create_date': '',
        'deleted': '',
        'id': 0,
        'keyword': '',
        'last_sync_date': '',
        'last_update_date': '',
        'memo': '',
        'solution': '',
        'subtype': '',
        'title': '',
        'totalCount': 0,
        'type': ''
    }
}

export default handleActions({
    [REMOVE] : (state, action) => {
        return state
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
        const data = action.payload.data;
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
