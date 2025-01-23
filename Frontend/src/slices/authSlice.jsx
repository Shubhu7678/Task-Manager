
import { createSlice } from '@reduxjs/toolkit';
const initialState = {

    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading : false,
}

const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => { 

            state.token = action.payload;
        },
        setUser: (state, action) => {

            state.user = action.payload;
        },
        setLoading: (state, action) => {
            
            state.loading = action.payload;
        }
    },

})

export const { setToken, setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;