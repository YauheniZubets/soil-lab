import { call, put, takeEvery, select, takeLatest } from 'redux-saga/effects';
import { DEL_OBJECT_REQUESTED } from './actions';
import { db } from "../components/firebase/init";
import { doc, deleteDoc, updateDoc, deleteField } from "firebase/firestore";

const delObjFromFire = async (db, year, prot) => {
    console.log('db: ', db);
    const protRef = doc(db, `${year}`, String(prot));
    // await deleteDoc(doc(db, `${year}`, String(prot)));
    await updateDoc(protRef, {
        protocol: deleteField(),
        code: deleteField(),
        date: deleteField(),
        sumFromWork: deleteField(), // сумма по испытаниям
        sumComputed: deleteField(), // сумма с ком услугами
        summa2017: deleteField(), // в ценах 2017г
        sum: deleteField(), // итоговая сумма
        waterData: deleteField(), // инфа по воде
        allQuan: deleteField()
    })
}

function* delObjectSaga(action) {
    const prot = action.payload[0];
    console.log('prot: ', prot);
    const choosedYear = action.payload[1];
    console.log('choosedYear: ', choosedYear);
    // const protocolFromRed = yield select(getProtocolFromRed);
    // const codeFromRed = yield select(getCodeFromRed);
    // const dateFromRed = yield select(getDateFromRed);
    // const waterDateFromRed = yield select(getWaterFromRed);
    // const allQuanFromRed = yield select(getAllQuanFromRed);
    
    // const dateNormalized = ExcelDateToJSDate(dateFromRed.dateWorking);
    // const estimateYear = dateNormalized.getFullYear();

    // const waterDataNoNested = waterDateFromRed.waterData.map((item) => {
    //   const ob = {watData: item};
    //   return ob;
    // });

    // const sumFromWork = sumBase(allQuanFromRed.allQuan, price); //сумма по испытаниям
    // const sumComputed = sumWithComp(sumFromWork); // сумма с учетом комп. технологий
    // const summma2017 = sum2017(sumComputed); // сумма в новых рублях в ценах 2017
    // const estimateMonth = dateNormalized.getMonth(); // месяц для коэффициента
    // const currentFactor = factorByChoosedMonth(factorsMonth2026, estimateMonth); // текущий коэффициент
    // const sumRes = sumCur(summma2017, currentFactor); // итоговая сумма в текущий месяц

    try {
        yield call(delObjFromFire, db, choosedYear, prot);
        // yield put(addObjectRequested());
        // const result = yield call(getSumIfExist, protocolFromRed.protocol, estimateYear); 
        // if (result) {
        //   yield put(isObjectExist());
        // } else {
        //   yield call(writeSumInFire, estimateYear, protocolFromRed.protocol, codeFromRed.code, dateNormalized, sumFromWork, sumComputed, summma2017, sumRes, waterDataNoNested, allQuanFromRed.allQuan);
        //   yield put(addObjectSucceeded());
        // }
    } catch (error) {
        yield put(addObjectError());
    }
}

export function* rootSaga() {
  yield takeEvery(DEL_OBJECT_REQUESTED, delObjectSaga);
  console.log('DEL_OBJECT_REQUESTED: ', DEL_OBJECT_REQUESTED);
}