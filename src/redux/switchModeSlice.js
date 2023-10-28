import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    darkMode: localStorage.getItem('darkMode') ? true : false
}

const switchModeSlice = createSlice({
    name:'switchMode',
    initialState:initialState,
    reducers:{
        switchMode(state){
            state.darkMode = !state.darkMode
            state.darkMode ? localStorage.setItem('darkMode', true) : localStorage.removeItem('darkMode')
        }
    }
})

const {actions, reducer} = switchModeSlice
export const { switchMode } = actions
export default reducer