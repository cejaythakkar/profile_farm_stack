import { configureStore } from '@reduxjs/toolkit'
import uiSliceReducer from './uiSlice'
import experienceSliceReducer from './experienceSlice'
import projectsSliceReducer from './projectsSlice'

const store = configureStore({
    reducer: {
        ui: uiSliceReducer,
        experience: experienceSliceReducer,
        projects: projectsSliceReducer,
    }
})

export default store;