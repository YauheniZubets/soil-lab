import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  description: '',
}

export const description = createSlice({
  name: 'description',
  initialState,
  reducers: {
    setNewDescription: (state, action) => {
      state.description = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNewDescription } = description.actions

export default description.reducer;