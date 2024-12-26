import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dateWorking: '',
}

export const dateSlice = createSlice({
  name: 'dateWorking',
  initialState,
  reducers: {
    setDateWorking: (state, action) => {
      state.dateWorking = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDateWorking } = dateSlice.actions

export default dateSlice.reducer