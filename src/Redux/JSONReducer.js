import {JSON_DATA} from '../globalVariables'

const reducer = (state, action) => {
    if(action.type === JSON_DATA) {
        return {...state, data: action.payload}; 
    }

    return {...state}
}

export default reducer