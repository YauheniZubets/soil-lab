import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../saga/sagas';

import codeReducer from './codeReducer';
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
import headersReducer from './headersReducer';
import loadStatusReducer from './loadStatusReducer';
import sumReducer from './sumReducer';

const sagaMiddleware = createSagaMiddleware();

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
      description: descrReducer, // текстовое описание объекта
      headers: headersReducer, // заголовки испытаний
      loadStatus: loadStatusReducer, //статус загрузки
      sumRes: sumReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  }, 
);

sagaMiddleware.run(rootSaga);
