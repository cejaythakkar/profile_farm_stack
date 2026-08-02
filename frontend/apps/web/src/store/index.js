import { configureStore } from '@reduxjs/toolkit'
import uiSliceReducer from './uiSlice'
import experienceSliceReducer from './experienceSlice'
import projectsSliceReducer from './projectsSlice'
import academicsSliceReducer from './academicsSlice'

const store = configureStore({
    reducer: {
        ui: uiSliceReducer,
        experience: experienceSliceReducer,
        projects: projectsSliceReducer,
        academics: academicsSliceReducer,
    }
})

export default store;