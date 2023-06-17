import { configureStore } from '@reduxjs/toolkit'
import musicReducer from './Slices/musicSlice'
export default configureStore({
  reducer: {
    music: musicReducer
  }
})