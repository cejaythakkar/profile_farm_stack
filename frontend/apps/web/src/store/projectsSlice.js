import { createSlice } from '@reduxjs/toolkit'
import { setDataLoading } from './uiSlice'
import axiosClient from '../utils/axiosClient'

const initialState = {
    selectedProject: null,
    projectsData: { projects: [] }
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {

        setSelectedProject(state, action) {
            state.selectedProject = action.payload
        },
        setProjectsData(state, action) {
            const processedData = action.payload.map((project) => ({
                ...project,
                id: project['_id'],
            }));
            state.projectsData = { projects: processedData }
        }
    }
})

export const fetchProjects = () => {
    return async (dispatch) => {
        dispatch(setDataLoading(true))
        const response = await axiosClient.get('/projects')
        const data = response.data.data
        dispatch(projectsSlice.actions.setProjectsData(data))
        dispatch(setDataLoading(false))
    }
}
export const deleteProject = ({ projectId }) => {
    console.log('projectId', projectId)
    return async (dispatch) => {
        dispatch(setDataLoading(true))
        await axiosClient.delete(`/projects/${projectId}`)
        dispatch(fetchProjects())
    }
}

export const { setSelectedProject } = projectsSlice.actions

export default projectsSlice.reducer