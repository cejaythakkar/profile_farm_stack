import { createSlice } from '@reduxjs/toolkit'
import { setDataLoading } from './uiSlice'
import axiosClient from '../utils/axiosClient'

const initialState = {
    selectedProject: null,
    projectsData: { projects: [] },
    usersCompanies: []
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
        },
        setUsersCompanies(state, action) {
            state.usersCompanies = action.payload
        }
    }
})

export const fetchProjects = () => {
    return async (dispatch) => {
        dispatch(setDataLoading(true))
        const response = await axiosClient.get('/projects')
        const data = response.data.data
        const transformedData = data.map(project => {
            let company = {};
            if (Object.keys(project.company).length) {
                company = {
                    label: project.company.company, value: project["_id"],
                    ...project.company
                }
            }
            return { ...project, company }
        })
        dispatch(projectsSlice.actions.setProjectsData(transformedData))
        dispatch(setDataLoading(false))
    }
}

export const fetchUsersCompanies = () => {
    return async (dispatch) => {
        const response = await axiosClient.get('/projects/companies')
        const data = response.data.data
        dispatch(projectsSlice.actions.setUsersCompanies(data))
    }
}

export const deleteProject = ({ projectId }) => {
    return async (dispatch) => {
        dispatch(setDataLoading(true))
        await axiosClient.delete(`/projects/${projectId}`)
        dispatch(fetchProjects())
    }
}

export const { setSelectedProject } = projectsSlice.actions

export default projectsSlice.reducer