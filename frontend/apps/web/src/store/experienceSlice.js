import { createSlice } from '@reduxjs/toolkit'
import { setDataLoading } from './uiSlice'
import axiosClient from '../utils/axiosClient'

const initialState = {
    selectedExperience: null,
    experienceData: { experiences: [] }
}

const experienceSlice = createSlice({
    name: 'experience',
    initialState,
    reducers: {
        setSelectedExperience(state, action) {
            state.selectedExperience = action.payload
        },
        setExperienceData(state, action) {
            const processedData = action.payload.map((experience) => ({
                ...experience,
                id: experience['_id'],
            }));
            state.experienceData = { experiences: processedData }
        }
    }
})

export const fetchExperience = () => {
    return async (dispatch) => {
        dispatch(setDataLoading(true))
        const response = await axiosClient.get('/experience')
        const data = response.data.data
        dispatch(experienceSlice.actions.setExperienceData(data))
        dispatch(setDataLoading(false))
    }
}
export const deleteExperience = ({ expId }) => {
    return async (dispatch) => {
        dispatch(setDataLoading(true))
        await axiosClient.delete(`/experience/${expId}`)
        dispatch(fetchExperience())
    }
}

export const { setSelectedExperience } = experienceSlice.actions

export default experienceSlice.reducer