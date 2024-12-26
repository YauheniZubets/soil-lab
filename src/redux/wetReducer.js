import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wetDataMass: [],
}

export const wetSlice = createSlice({
  name: 'wetDataMass',
  initialState,
  reducers: {
    setWetDataMass: (state, action) => {
      state.wetDataMass = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setWetDataMass } = wetSlice.actions

export default wetSlice.reducer;