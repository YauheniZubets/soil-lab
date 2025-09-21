import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  headers: []
}

export const headersSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
    setHeaders: (state, action) => {
      state.headers = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setHeaders } = headersSlice.actions

export default headersSlice.reducer