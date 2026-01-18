import { call, put, takeEvery, select } from 'redux-saga/effects';
import { ADD_OBJECT_REQUESTED } from './actions';
import { addObjectRequested, addObjectSucceeded, addObjectError, isObjectExist } from '../redux/loadStatusReducer';
import { db } from "../components/firebase/init";
import { setDoc, doc, getDoc } from "firebase/firestore";
import ExcelDateToJSDate from '../base-data/convertDate';
import { sumBase, sumWithComp, sum2017, sumCur } from '../base-data/calc-price';
import { price, factorsMonth2026, factorByChoosedMonth } from '../base-data/price';

// import { writeSumInFire, getSumIfExist } from './api';

const writeSumInFire = async (year, protFromRed, codeFromRed, date, sumFromWork, sumComputed, summa2017, sumRes, waterData, allQuan) => {
  try {
      await setDoc(doc(db, `${year}`, String(protFromRed)), {
          protocol: protFromRed,
          code: codeFromRed,
          date: date,
          sumFromWork: +sumFromWork, // сумма по испытаниям
          sumComputed: +sumComputed, // сумма с ком услугами
          summa2017: +summa2017, // в ценах 2017г
          sum: +sumRes, // итоговая сумма
          waterData: waterData, // инфа по воде
          allQuan: allQuan
      });
  } catch (e) {
      console.error("Error adding document: ", e);
  }
};

const getSumIfExist = async (protFromRed, year) => {
  const docRef = doc(db, `${year}`, String(protFromRed));
  const docSnap = await getDoc(docRef);
  const resCode = await docSnap.data()?.protocol;
  if (resCode === protFromRed) {
    return true;
  } else {
    return false;
  }
};

const getProtocolFromRed = state => state.protocol;
const getCodeFromRed = state => state.code;
const getDateFromRed = state => state.dateWorking;
const getWaterFromRed = state => state.waterData;
const getAllQuanFromRed = state => state.allQuan;

function* addObjectSaga() {
    const protocolFromRed = yield select(getProtocolFromRed);
    const codeFromRed = yield select(getCodeFromRed);
    const dateFromRed = yield select(getDateFromRed);
    const waterDateFromRed = yield select(getWaterFromRed);
    const allQuanFromRed = yield select(getAllQuanFromRed);
    
    const dateNormalized = ExcelDateToJSDate(dateFromRed.dateWorking);
    const estimateYear = dateNormalized.getFullYear();

    const waterDataNoNested = waterDateFromRed.waterData.map((item) => {
      const ob = {watData: item};
      return ob;
    });

    const sumFromWork = sumBase(allQuanFromRed.allQuan, price); //сумма по испытаниям
    const sumComputed = sumWithComp(sumFromWork); // сумма с учетом комп. технологий
    const summma2017 = sum2017(sumComputed); // сумма в новых рублях в ценах 2017
    const estimateMonth = dateNormalized.getMonth(); // месяц для коэффициента
    const currentFactor = factorByChoosedMonth(factorsMonth2026, estimateMonth); // текущий коэффициент
    const sumRes = sumCur(summma2017, currentFactor); // итоговая сумма в текущий месяц

    try {
        yield put(addObjectRequested());
        const result = yield call(getSumIfExist, protocolFromRed.protocol, estimateYear); 
        if (result) {
          yield put(isObjectExist());
        } else {
          yield call(writeSumInFire, estimateYear, protocolFromRed.protocol, codeFromRed.code, dateNormalized, sumFromWork, sumComputed, summma2017, sumRes, waterDataNoNested, allQuanFromRed.allQuan);
          yield put(addObjectSucceeded());
        }
    } catch (error) {
        yield put(addObjectError());
    }
}

export function* rootSaga() {
  yield takeEvery(ADD_OBJECT_REQUESTED, addObjectSaga);
}