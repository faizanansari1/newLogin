import * as ActionType from '../action/actionType';

const initialState = {
    isLoading: false,
    errMsg: '',
    userPro: []
}

export const userPro = (state = initialState, action) => {
    switch(action.type){
        case ActionType.USERPRO_LOADING:
            return{...state, isLoading:true, errMsg:'', userPro: []};

        case ActionType.USERPRO_SUCCESS:
            return{...state, isLoading:false, errMsg:'', userPro: action.payload};

        case ActionType.USERPRO_FAILED:
            return{...state, isLoading:false, errMsg: action.payload, userPro:[] };
            default:
                return{...state};
    }

}