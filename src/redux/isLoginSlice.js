import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: false
}

const isLoginSlice = createSlice({
    name:'isLogin',
    initialState:initialState,
    reducers:{
        setIsLogin(state, actions){
            state.isLogin = actions.payload
        }
    }
})

const {actions, reducer} = isLoginSlice
export const { setIsLogin } = actions
export default reducer