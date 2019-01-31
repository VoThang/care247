import { Reducer } from 'redux';

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
import { byIds, byId } from '../../utilities/data';
import { PatientModel } from '../../models/patient';

// State
export type IState = {
    patients: { [id: string]: PatientModel };
    loading: {
        [action: string]: boolean
    },
    errors: {
        [action: string]: string
    }
};

export const initialState: IState = {
    patients: {},
    loading: {},
    errors: {}
};

// Reducer
export const patient: Reducer<IState> = (
    state: IState = initialState, action: any,
): IState => {
    switch (action.type) {
        case GET_PATIENTS_ASYNC:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [GET_PATIENTS_ASYNC]: true
                },
                errors: {
                    ...state.errors,
                    [GET_PATIENTS_ASYNC]: ''
                }
            };

        case GET_PATIENTS_SUCCEEDED:
            return {
                ...state,
                patients: byIds(action.patients),
                loading: {
                    ...state.loading,
                    [GET_PATIENTS_ASYNC]: false
                },
                errors: {
                    ...state.errors,
                    [GET_PATIENTS_ASYNC]: ''
                }
            };

        case GET_PATIENTS_FAILED:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [GET_PATIENTS_ASYNC]: false
                },
                errors: {
                    ...state.errors,
                    [GET_PATIENTS_ASYNC]: action.message
                }
            };

        case GET_PATIENT_ASYNC:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [GET_PATIENT_ASYNC]: true
                },
                errors: {
                    ...state.errors,
                    [GET_PATIENT_ASYNC]: ''
                }
            };

        case GET_PATIENT_SUCCEEDED:
            return {
                ...state,
                patients: {
                    ...state.patients,
                    ...byId(action.patient)
                },
                loading: {
                    ...state.loading,
                    [GET_PATIENT_ASYNC]: false
                },
                errors: {
                    ...state.errors,
                    [GET_PATIENT_ASYNC]: ''
                }
            };

        case GET_PATIENT_FAILED:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [GET_PATIENT_ASYNC]: false
                },
                errors: {
                    ...state.errors,
                    [GET_PATIENT_ASYNC]: action.message
                }
            };

        case UPDATE_PATIENT_ASYNC:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [UPDATE_PATIENT_ASYNC]: true
                },
                errors: {
                    ...state.errors,
                    [UPDATE_PATIENT_ASYNC]: ''
                }
            };

        case UPDATE_PATIENT_SUCCEEDED:
            return {
                ...state,
                patients: {
                    ...state.patients,
                    ...byId(action.patient)
                },
                loading: {
                    ...state.loading,
                    [UPDATE_PATIENT_ASYNC]: false
                },
                errors: {
                    ...state.errors,
                    [UPDATE_PATIENT_ASYNC]: ''
                }
            };

        case UPDATE_PATIENT_FAILED:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [UPDATE_PATIENT_ASYNC]: false
                },
                errors: {
                    ...state.errors,
                    [UPDATE_PATIENT_ASYNC]: action.message
                }
            };

        default: return state;
    }
};

export const selector = {
    getPatients: (rootState: any): { [id: string]: PatientModel } => {
        const { patients } = rootState.patient;
        return patients;
    },

    getPatient: (rootState: any, id: string): PatientModel => {
        const { patients } = rootState.patient;
        return patients[id] || new PatientModel();
    },

    getLoading: (rootState: any, action: string) => {
        const { loading } = rootState.patient;
        return loading[action] || false;
    },

    getErrors: (rootState: any, action: string) => {
        const { message } = rootState.patient;
        return message[action] || '';
    },
};