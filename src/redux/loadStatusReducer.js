import { createSlice } from '@reduxjs/toolkit';
// import { 
//   addObjectRequested, addOneObjectSucceeded,
//   addAllObjectsSucceeded, addObjectFailed
// } from '../saga/actions';
import { ADD_OBJECT_REQUESTED } from '../saga/actions';

const initialState = {
  loadStatus: '',
  isExist: false
};

export const loadStatus = createSlice({
  name: 'loadStatus',
  initialState,
  reducers: {
    addObjectRequested: (state) => {
      state.loadStatus = 'load-start';
      state.isExist = false;
    },
    isObjectExist: (state) => {
      state.isExist = true;
    },
    addObjectSucceeded: (state) => {
      state.loadStatus = 'load-success';
    },
    addObjectError: (state) => {
      state.loadStatus = 'load-error';
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoadQuan, addObjectRequested, addObjectSucceeded, addObjectError, isObjectExist } = loadStatus.actions

export default loadStatus.reducer;