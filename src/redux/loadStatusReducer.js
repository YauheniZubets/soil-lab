import { createSlice } from '@reduxjs/toolkit';
// import { 
//   addObjectRequested, addOneObjectSucceeded,
//   addAllObjectsSucceeded, addObjectFailed
// } from '../saga/actions';
import { ADD_OBJECT_REQUESTED } from '../saga/actions';

const initialState = {
  isLoading: false,
  isExist: false,
  objLoaded: false
};

export const loadStatus = createSlice({
  name: 'loadStatus',
  initialState,
  reducers: {
    addObjectRequested: (state) => {
      state.isLoading = true;
      state.isExist = false;
      state.objLoaded = false;
    },
    isObjectExist: (state) => {
      state.isExist = true;
      state.isLoading = false;
    },
    addObjectSucceeded: (state) => {
      state.isLoading = false;
      state.objLoaded = true;
    },
    addObjectError: (state) => {
      state.isLoading = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoadQuan, addObjectRequested, addObjectSucceeded, addObjectError, isObjectExist } = loadStatus.actions

export default loadStatus.reducer;