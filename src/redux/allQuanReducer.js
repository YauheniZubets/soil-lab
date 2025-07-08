import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allQuan: []
}

export const allQuanSlice = createSlice({
  name: 'allQuan',
  initialState,
  reducers: {
    setAllQuan: (state, action) => {
      state.allQuan = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAllQuan } = allQuanSlice.actions

export default allQuanSlice.reducer