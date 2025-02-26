import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  kstData: null,
}

export const kstSlice = createSlice({
  name: 'kstData',
  initialState,
  reducers: {
    setKstData: (state, action) => {
      state.kstData = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setKstData } = kstSlice.actions

export default kstSlice.reducer