import { createSlice } from '@reduxjs/toolkit'
import { setDataLoading } from './uiSlice'
import axiosClient from '../utils/axiosClient'

const initialState = {
    academicsData: []
}

const academicsSlice = createSlice({
    name: 'academics',
    initialState,
    reducers: {

        setAcademicsData(state, action) {

            state.academicsData = action.payload
        }
    }
})

export const fetchAcademicsData = () => {
    return async (dispatch) => {
        dispatch(setDataLoading(true))
        const response = await axiosClient.get('/academics')
        const data = response.data.data
        dispatch(academicsSlice.actions.setAcademicsData(data))
        dispatch(setDataLoading(false))
    }
}
// export const deleteExperience = ({ expId }) => {
//     return async (dispatch) => {
//         dispatch(setDataLoading(true))
//         await axiosClient.delete(`/experience/${expId}`)
//         dispatch(fetchExperience())
//     }
// }

// export const { setSelectedExperience } = academicsSlice.actions

export default academicsSlice.reducer