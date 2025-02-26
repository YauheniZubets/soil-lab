import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  kbData: null,
}

export const kbSlice = createSlice({
  name: 'kbData',
  initialState,
  reducers: {
    setKbData: (state, action) => {
      state.kbData = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setKbData } = kbSlice.actions

export default kbSlice.reducer