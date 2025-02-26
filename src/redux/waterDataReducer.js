import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  waterData: null,
}

export const waterSlice = createSlice({
  name: 'waterData',
  initialState,
  reducers: {
    setWaterData: (state, action) => {
      state.waterData = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setWaterData } = waterSlice.actions

export default waterSlice.reducer