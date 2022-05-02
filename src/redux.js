import axios from "axios"
const { createSlice, configureStore, createAsyncThunk } = require("@reduxjs/toolkit");


const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        getUser:  (state, action) => {
               return action.payload
        },
    }

})

export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})


export const { getUser } = userSlice.actions