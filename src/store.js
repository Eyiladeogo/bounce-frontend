import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import searchReducer from './features/searchSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        search: searchReducer
    },
    
    devTools: process.env.NODE_ENV !== 'production'
},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) 