import { createSlice } from '@reduxjs/toolkit'
import { setDataLoading } from './uiSlice'
import axiosClient from '../utils/axiosClient'

const initialState = {
    summary: "", title: []
}

const careerHighlightsSlice = createSlice({
    name: 'highlights',
    initialState,
    reducers: {

        setCareerHighlightsDAta(state, action) {

            state.summary = action.payload.summary;
            state.title = action.payload.title
        }
    }
})

export const fetchCareerHighlightsData = () => {
    return async (dispatch) => {
        dispatch(setDataLoading(true))
        const response = await axiosClient.get('/career-highlights')
        const data = response.data.data
        dispatch(careerHighlightsSlice.actions.setCareerHighlightsDAta(data))
        dispatch(setDataLoading(false))
    }
}

export default careerHighlightsSlice.reducer