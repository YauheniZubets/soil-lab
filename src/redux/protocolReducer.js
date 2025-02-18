import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  protocol: '',
}

export const protocolSlice = createSlice({
  name: 'protocol',
  initialState,
  reducers: {
    setNewProtocol: (state, action) => {
      state.protocol = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNewProtocol } = protocolSlice.actions

export default protocolSlice.reducer;