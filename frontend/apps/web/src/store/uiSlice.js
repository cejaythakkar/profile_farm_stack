import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    formSubmit: false,
    dataLoading: false
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setFormSubmit: (state, action) => {
            state.formSubmit = action.payload
        },
        setDataLoading: (state, action) => {
            state.dataLoading = action.payload
        }
    }
})

export const { setDataLoading, setFormSubmit } = uiSlice.actions;
export default uiSlice.reducer