import { createSlice } from '@reduxjs/toolkit';
// import { 
//   addObjectRequested, addOneObjectSucceeded,
//   addAllObjectsSucceeded, addObjectFailed
// } from '../saga/actions';

const initialState = {
  loadStatus: '',
  loadQuan: 0,
  loadALLStatus: '',
  loading: false,
  error: null,
};

export const loadStatus = createSlice({
  name: 'loadStatus',
  initialState,
  reducers: {
    setLoadQuan: (state, action) => {
      state.loadQuan = action.payload;
    },
    addObjectRequested: (state) => {
      state.loadStatus = 'start-loading';
      state.loading = true;
    }, 
    addOneObjectSucceeded: (state, action) => {
      state.loadQuan = action.payload--;
      state.loadStatus = `one of ${state.loadQuan} loaded`;
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoadQuan, addObjectRequested, addOneObjectSucceeded } = loadStatus.actions

export default loadStatus.reducer;