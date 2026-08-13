import { call, put } from 'redux-saga/effects';
import { db } from "../components/firebase/init";
import { doc, deleteDoc } from "firebase/firestore";
import { addObjectRequested, addObjectSucceeded, addObjectError } from '../redux/loadStatusReducer';

const delObjFromFire = async (db, year, prot) => {
    await deleteDoc(doc(db, `${year}`, String(prot)));
}

export function* delObjectSaga(action) {
    const prot = action.payload[0];
    const choosedYear = action.payload[1];

    try {
        yield put(addObjectRequested());
        yield call(delObjFromFire, db, choosedYear, prot);
        yield put(addObjectSucceeded());
    } catch (error) {
        yield put(addObjectError());
    }
}