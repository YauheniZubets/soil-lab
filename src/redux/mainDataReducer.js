import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mainData: [],
}

export const mainDataSlice = createSlice({
  name: 'mainData',
  initialState,
  reducers: {
    setMainData: (state, action) => {
      state.mainData = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMainData } = mainDataSlice.actions

export default mainDataSlice.reducer;