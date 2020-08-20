import {REQUEST_START,REQUEST_SUCCESS, REQUEST_ERROR} from '../globalVariables'

const init = {
    isLoading: 0,
    isLogged:  0,
    error: 0,
}

const reducer = (state=init, action) => {
    
    if(action.type === REQUEST_START){
        return {...state, isLoading: 1};
    }

    if(action.type === REQUEST_SUCCESS) {
        return {...state, isLoading: 0, isLogged: action.data.isLogged};
    }

    if(action.type === REQUEST_ERROR) {
        return {...state, isLoading: 0, isLogged: 0, error: 1};
    }

    return {...state}

}

export default reducer