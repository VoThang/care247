import * as React from 'react';
import LoadingScreen from '../shared/LoadingScreen';
import { DataListDisplayEnum, ConstValues } from '../../utilities/constValues';
import * as Cookie from 'js-cookie';
import PatientListGrid from './patient-list-grid';
import PatientListTable from './patient-list-table';
import { PatientModel, PatientSearchModel } from '../../models/patient';
import { toArray } from '../../utilities/data';
import PatientSearch from './patient-search';

interface Props {
    patients: {
        [id: string]: PatientModel
    };
    loading: boolean;
}

interface State {
    displayType: DataListDisplayEnum;
    patientSearch: PatientSearchModel;
}

class PatientList extends React.Component<Props, State> {
    state: State = {
        displayType: DataListDisplayEnum.GRID,
        patientSearch: new PatientSearchModel()
    };

    componentDidMount() {
        const type = Cookie.get(ConstValues.PATIENT_LIST_DISPLAY_TYPE);
        this.setState({
            displayType: type === DataListDisplayEnum.TABLE ? DataListDisplayEnum.TABLE : DataListDisplayEnum.GRID
        });
    }

    switchDisplayType = (type: DataListDisplayEnum) => {
        this.setState({
            displayType: type
        });
        Cookie.set(ConstValues.PATIENT_LIST_DISPLAY_TYPE, type);
    }

    handleOnChange = (field: string, value: string) => {
        this.setState((prevState: State) => {
            return {
                ...prevState,
                patientSearch: {
                    ...prevState.patientSearch,
                    [field]: value
                }
            };
        });
    }

    filterPatients = (patients: { [id: string]: PatientModel }, patientSearch: PatientSearchModel) => {
        let nameArr = patientSearch.name.length > 0 ? patientSearch.name.split(' ') : [];
        let patientArr = toArray(patients);
        let filteredPatients = patientArr
            .filter(x => patientSearch.email.length > 0 ? x.email.toLowerCase().indexOf(patientSearch.email.toLowerCase()) >= 0 : true)
            .filter(x => nameArr.length > 0 ? (nameArr.find(name => x.firstName.toLowerCase().indexOf(name.toLowerCase()) >= 0) ||
                nameArr.find(name => x.lastName.toLowerCase().indexOf(name.toLowerCase()) >= 0)) : true)
            .filter(x => patientSearch.phone.length > 0 ? x.phone.toLowerCase().indexOf(patientSearch.phone.toLowerCase()) >= 0 : true);

        return filteredPatients;
    }

    render() {
        const { patients, loading } = this.props;
        const { displayType, patientSearch } = this.state;
        const filteredPatients = this.filterPatients(patients, patientSearch);

        return (
            <>
                <div className="wrapper wrapper-content animated fadeInRight">
                    <PatientSearch
                        patientSearch={patientSearch}
                        onChange={this.handleOnChange}
                    />
                    <div className="btn-group" style={{ marginBottom: '10px' }}>
                        <button type="button" className={`btn btn-xs btn-white ${displayType === DataListDisplayEnum.GRID ? 'active' : ''}`} title="Dạng lưới" onClick={() => { this.switchDisplayType(DataListDisplayEnum.GRID); }}><i className="fa fa-th-list" /></button>
                        <button type="button" className={`btn btn-xs btn-white ${displayType === DataListDisplayEnum.TABLE ? 'active' : ''}`} title="Dạng bảng" onClick={() => { this.switchDisplayType(DataListDisplayEnum.TABLE); }}><i className="fa fa-table" /></button>
                    </div>
                    {
                        loading ?
                            <LoadingScreen /> :
                            <>
                                {
                                    displayType === DataListDisplayEnum.GRID ?
                                        <PatientListGrid patients={filteredPatients} /> :
                                        <PatientListTable patients={filteredPatients} />
                                }
                            </>
                    }
                </div>
            </>
        );
    }
}

export default PatientList;