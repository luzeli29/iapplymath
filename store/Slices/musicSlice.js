import { createSlice } from '@reduxjs/toolkit'

export const musicSlice = createSlice({
  name: 'music',
  initialState: {
    value: false
  },
  reducers: {
    toggleMuteRedux: state => {
      state.value  = !state.value
    },
   
  }
})

// Action creators are generated for each case reducer function
export const { toggleMuteRedux } = musicSlice.actions

export default musicSlice.reducer