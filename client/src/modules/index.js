import {combineReducers} from 'redux';
import boardList from './boardList';
import boardView from './boardView';
import boardUpdate from './boardUpdate';
import login from './login';
import join from './join';
import auth_phone from './auth_phone';
import auth_email from './auth_email';
import {penderReducer} from 'redux-pender';

export default combineReducers({
    boardList,
    boardView,
    login,
    join,
    auth_phone,
    auth_email,
    boardUpdate,
    pender : penderReducer
})

