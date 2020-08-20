import {combineReducers} from 'redux'
import LoginReducer from './loginReducer'
import AppReducer from './appReducer'
import JSONReducer from './JSONReducer'

const rootReducer = combineReducers({LoginReducer,AppReducer,JSONReducer})
export default rootReducer