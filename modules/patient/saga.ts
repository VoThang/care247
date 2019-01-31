import { MessageIndicator } from './../../models/indicator';
import { MessageIndicatorEnum } from './../../utilities/constValues';
import { 
    GET_PATIENTS_ASYNC,
    GET_PATIENTS_SUCCEEDED,
    GET_PATIENTS_FAILED,

    GET_PATIENT_ASYNC,
    GET_PATIENT_SUCCEEDED,
    GET_PATIENT_FAILED,

    UPDATE_PATIENT_ASYNC,
    UPDATE_PATIENT_SUCCEEDED,
    UPDATE_PATIENT_FAILED,
} from './action';

import {
    ADD_MESSAGE_INDICATOR
} from '../indicator/action';

import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from '../../api/patient';

function* getPatients() {
    try {
        const patients = yield call(api.getPatients);
        yield put({type: GET_PATIENTS_SUCCEEDED, patients: patients});
    } catch (err) {
        yield put({type: GET_PATIENTS_FAILED, message: err.toString()});
        let message = new MessageIndicator(err.toString(), MessageIndicatorEnum.ERROR);
        yield put({type: ADD_MESSAGE_INDICATOR, message });
    }
}

function* getPatient(action: any) {
    try {
        const patient = yield call(api.getPatient, action.id);
        yield put({type: GET_PATIENT_SUCCEEDED, patient});
    } catch (err) {
        yield put({type: GET_PATIENT_FAILED, message: err.toString()});
        let message = new MessageIndicator(err.toString(), MessageIndicatorEnum.ERROR);
        yield put({type: ADD_MESSAGE_INDICATOR, message });
    }
}

function* updatePatient(action: any) {
    try {
        const response = yield call(api.updatePatient, action.patient);
        yield put({type: UPDATE_PATIENT_SUCCEEDED, patient: response});

        let message = new MessageIndicator('Cập nhật thành công', MessageIndicatorEnum.SUCCESS);
        yield put({type: ADD_MESSAGE_INDICATOR, message });
    } catch (err) {
        yield put({type: UPDATE_PATIENT_FAILED, message: err.toString()});
        let message = new MessageIndicator(err.toString(), MessageIndicatorEnum.ERROR);
        yield put({type: ADD_MESSAGE_INDICATOR, message });
    }
}

export default function* watchPatient() {
    yield takeLatest(GET_PATIENTS_ASYNC, getPatients);
    yield takeLatest(GET_PATIENT_ASYNC, getPatient);
    yield takeLatest(UPDATE_PATIENT_ASYNC, updatePatient);
}