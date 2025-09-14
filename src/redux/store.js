import { configureStore } from '@reduxjs/toolkit';
import codeReducer from './reducer';
import protocolReducer from './protocolReducer';
import dateReducer from './dateReducer';
import mainDataReducer from './mainDataReducer';
import wetReducer from './wetReducer';
import kbDataReducer from './kbDataReducer';
import kstDataReducer from './kstDataReducer';
import waterDataReducer from './waterDataReducer';
import allQuanReducer from './allQuanReducer';
import closeEstimateReducer from './closeEstimateReducer';
import descrReducer from './descrReducer';

export const store = configureStore({
  reducer: {
    code: codeReducer,
    protocol: protocolReducer,
    dateWorking: dateReducer,
    mainData: mainDataReducer,
    wetDataMass: wetReducer,
    kbData: kbDataReducer,
    kstData: kstDataReducer,
    waterData: waterDataReducer,
    allQuan: allQuanReducer,
    closeEstimate: closeEstimateReducer, //закрытие комп estimate
    description: descrReducer // текстовое описание объекта
  },
})