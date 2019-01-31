import * as baseApi from './baseApi';
import { PatientModel } from '../models/patient';

export async function getPatients() {
    return await baseApi.get('api/patients');
}

export async function getPatient(id: string) {
    return await baseApi.get(`api/patients/${id}`);
}

export async function updatePatient(patient: PatientModel) {
    return await baseApi.put('api/patients', JSON.stringify(patient));
}