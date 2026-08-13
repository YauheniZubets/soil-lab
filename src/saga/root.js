import { takeEvery } from "redux-saga/effects";
import { ADD_OBJECT_REQUESTED, DEL_OBJECT_REQUESTED } from './actions';
import { addObjectSaga } from "./sagas";
import { delObjectSaga } from "./delSaga";

export function* rootSaga() {
    yield takeEvery(ADD_OBJECT_REQUESTED, addObjectSaga);
    yield takeEvery(DEL_OBJECT_REQUESTED, delObjectSaga);
}