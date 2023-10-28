import { combineReducers } from 'redux'
import switchModeSlice from './switchModeSlice'
import isLoginSlice from './isLoginSlice'

const rootReducer = combineReducers({
    switchMode:switchModeSlice,
    isLogin:isLoginSlice
})

export default rootReducer