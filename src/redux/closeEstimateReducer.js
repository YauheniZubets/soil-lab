import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  estimateStatus: false
}

export const closeEstimate = createSlice({
  name: 'estimateStatus',
  initialState,
  reducers: {
    setEstimateStatus: (state, action) => {
      state.estimateStatus = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setEstimateStatus } = closeEstimate.actions

export default closeEstimate.reducer