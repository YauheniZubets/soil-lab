import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sumRes: 0,
}

export const sumSlice = createSlice({
  name: 'sumRes',
  initialState,
  reducers: {
    setSumRes: (state, action) => {
      state.sumRes = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSumRes } = sumSlice.actions

export default sumSlice.reducer