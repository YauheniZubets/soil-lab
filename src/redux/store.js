import { configureStore } from '@reduxjs/toolkit';
import codeReducer from './reducer';
import dateReducer from './dateReducer';
import mainDataReducer from './mainDataReducer';

export const store = configureStore({
  reducer: {
    code: codeReducer,
    dateWorking: dateReducer,
    mainData: mainDataReducer
  },
})