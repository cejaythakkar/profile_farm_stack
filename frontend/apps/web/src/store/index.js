import { configureStore } from '@reduxjs/toolkit'
import uiSliceReducer from './uiSlice'
import experienceSliceReducer from './experienceSlice'

const store = configureStore({
    reducer: {
        ui: uiSliceReducer,
        experience: experienceSliceReducer,
    }
})

export default store;