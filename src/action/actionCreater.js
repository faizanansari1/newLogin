import * as ActionType from '../action/actionType';
import Axios from 'axios';


export const getUser = () => (dispatch) => {
    dispatch(userLoading());
    return (
        Axios.get('https://demo6258370.mockable.io/login').then((response) => {
            dispatch(userSuccess(response.data))
        }).catch(err => dispatch(userFailed(err)))
    );
}

export const userLoading = () => ({
    type: ActionType.USER_LOADING
});

export const userSuccess = (getUSER) => ({
    type: ActionType.USER_SUCCESS,
    payload: getUSER
    
});

export const userFailed = (err) => ({
    type: ActionType.USER_FAILED,
    payload: err
})

//  Users End


export const getUserProfile = () => (dispatch) => {
    dispatch(userProLoading());
    return(
        Axios.get('https://demo6258370.mockable.io/users').then((response) => {
        dispatch(userProSuccess(response.data))
        }).catch(err => dispatch(userProFailed(err)))
    );
}


export const userProLoading = () => ({
    type: ActionType.USERPRO_LOADING
});

export const userProSuccess = (getUSER) => ({
    type: ActionType.USERPRO_SUCCESS,
    payload: getUSER

});

export const userProFailed = (err) => ({
    type: ActionType.USERPRO_FAILED,
    payload: err
})
