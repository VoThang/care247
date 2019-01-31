import { PatientModel } from '../../models/patient';

// Action Types
export const GET_PATIENTS_ASYNC = 'Request/GET_PATIENTS_ASYNC';
export const GET_PATIENTS_SUCCEEDED = 'Ok/GET_PATIENTS_SUCCEEDED';
export const GET_PATIENTS_FAILED = 'Fail/GET_PATIENTS_FAILED';

export const GET_PATIENT_ASYNC = 'Request/GET_PATIENT_ASYNC';
export const GET_PATIENT_SUCCEEDED = 'Ok/GET_PATIENT_SUCCEEDED';
export const GET_PATIENT_FAILED = 'Fail/GET_PATIENT_FAILED';

export const UPDATE_PATIENT_ASYNC = 'Request/UPDATE_PATIENT_ASYNC';
export const UPDATE_PATIENT_SUCCEEDED = 'Ok/UPDATE_PATIENT_SUCCEEDED';
export const UPDATE_PATIENT_FAILED = 'Fail/UPDATE_PATIENT_FAILED';

// Action Creators
export const actionCreators = {
    getPatients: () => ({
        type: GET_PATIENTS_ASYNC,
    }),

    getPatient: (id: string) => ({
        type: GET_PATIENT_ASYNC,
        id
    }),

    updatePatient: (patient: PatientModel) => ({
        type: UPDATE_PATIENT_ASYNC,
        patient
    }),
};