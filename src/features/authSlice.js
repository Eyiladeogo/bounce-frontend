import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: localStorage.getItem('token')?true:false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state, action) => {
            const { user, token } = action.payload
            console.log(user, token)
            state.isAuthenticated = true
            state.user = user
            localStorage.setItem('token', token);
        },
        logout: (state) =>{
            state.isAuthenticated = false
            state.user = 'there'
            localStorage.removeItem('token');
        },
    }
});

export const { login, logout } = authSlice.actions
export default authSlice.reducer 