import { call, put, takeEvery, select } from 'redux-saga/effects';
// import {
//   ADD_OBJECT_REQUESTED,
//   addObjectRequested,
//   addOneObjectSucceeded,
//   addAllObjectsSucceeded,
//   addObjectFailed
// } from './actions';
import { addObjectRequested, addOneObjectSucceeded } from '../redux/loadStatusReducer';
import { db } from "../components/firebase/init";
import { setDoc, doc, getDoc } from "firebase/firestore";
import ExcelDateToJSDate from '../base-data/convertDate';

// import { writeSumInFire, getSumIfExist } from './api';

const writeSumInFire = async (year, protFromRed, codeFromRed, date, sumRes, waterData, allQuan) => {
  try {
      const docRef = await setDoc(doc(db, `${year}`, String(protFromRed)), {
          protocol: protFromRed,
          code: codeFromRed,
          date: date,
          sum: sumRes,
          waterData: waterData, // инфа по воде
          allQuan: allQuan
      });
  } catch (e) {
      console.error("Error adding document: ", e);
  }
};

const getSumIfExist = async (estimateYear, protocol) => {
  const docRef = doc(db, `${estimateYear}`, String(protocol));
  const docSnap = await getDoc(docRef);
  const resCode = await docSnap.data()?.code;
  return resCode;
  // if (resCode === codeFromRed.code) {
  //     console.log('Уже в базе');
  // } else {
  //     writeSumInFire();
  // }
};

const getProtocolFromRed = state => state.protocol;
const getCodeFromRed = state => state.code;
const getDateFromRed = state => state.dateWorking;
const getSumFromRed = state => state.sumRes;
const getWaterFromRed = state => state.waterData;
const getAllQuanFromRed = state => state.allQuan;
const getLoadStatusFromRed = state => state.loadStatus;

function* addObjectSaga() {
    const protocolFromRed = yield select(getProtocolFromRed);
    const codeFromRed = yield select(getCodeFromRed);
    const sumFromRed = yield select(getSumFromRed);
    const dateFromRed = yield select(getDateFromRed);
    const waterDateFromRed = yield select(getWaterFromRed);
    const allQuanFromRed = yield select(getAllQuanFromRed);
    const loadStatusFromRed = yield select(getLoadStatusFromRed);
    
    const dateNormalized = ExcelDateToJSDate(dateFromRed.dateWorking);
    const estimateYear = dateNormalized.getFullYear();

    const waterDataNoNested = waterDateFromRed.waterData.map((item) => {
      const ob = {watData: item};
      return ob;
    });

    try {
        const resCode = yield call(getSumIfExist(estimateYear, protocolFromRed.protocol)); // Call your API function
        if (resCode === codeFromRed.code) {
          console.log('Уже в базе');
        } else {
          yield call(writeSumInFire(estimateYear, protocolFromRed.protocol, codeFromRed.code, dateNormalized, sumFromRed.sumRes, waterDataNoNested, allQuanFromRed.allQuan));
          yield put(addOneObjectSucceeded(loadStatusFromRed.loadQuan));
        }
        // yield put(addAllObjectsSucceeded());
    } catch (error) {
        // yield put(addObjectFailed(error.message));
    }
}

export function* rootSaga() {
  yield takeEvery(addObjectRequested(), addObjectSaga);
}