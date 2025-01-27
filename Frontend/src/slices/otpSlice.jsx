import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    signedData: null,
    loading: false,
}


const otpSlice = createSlice({
    name: 'otp',
    initialState,
    reducers: {

        setSignedData: (state, action) => { 

            state.signedData = action.payload
        },
        setLoading: (state, action) => { 

            state.loading = action.payload
        }
    }
})

export const {setSignedData, setLoading} = otpSlice.actions
export default otpSlice.reducer