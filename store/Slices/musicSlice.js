import { createSlice } from '@reduxjs/toolkit'

export const musicSlice = createSlice({
  name: 'music',
  initialState: {
    value: true,
    location:""
  },
  reducers: {
    toggleMuteRedux: state => {
      state.value  = !state.value
    },
    
    setLocation : (state, action) => {
      state.location = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { toggleMuteRedux, setLocation } = musicSlice.actions

export default musicSlice.reducer