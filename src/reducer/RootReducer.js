import { combineReducers } from 'redux';
import { user } from './User';
import { userPro } from './UserProfile';

export default combineReducers({
    user,
    userPro
})