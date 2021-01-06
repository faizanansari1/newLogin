import * as ActionType from '../action/actionType';

const initialState = {
    isLoading: false,
    errMsg: '',
    user: []
}

export const user = (state = initialState, action) => {
    switch(action.type){
        case ActionType.USER_LOADING:
            return{...state, isLoading:true, errMsg:'', user: []};

        case ActionType.USER_SUCCESS:
            return{...state, isLoading:false, errMsg:'', user: action.payload};

        case ActionType.USER_FAILED:
            return{...state, isLoading:false, errMsg: action.payload, user:[] };
            default:
                return{...state};
    }

}