import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  code: '',
}

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    setNewCode: (state, action) => {
      state.code = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNewCode } = codeSlice.actions

export default codeSlice.reducer