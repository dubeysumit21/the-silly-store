import * as actionTypes from './actions';

const initialState = {
    userName : null,
    userId : null,
    logOutFlagger : null
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 1: 
            return {
            ...state,
            userName : action.email,
            userId : action.id,
            logOutFlagger : action.flag
        }
        default: return state;
    }
}

export default reducer; 
