# NOTE: This repository only show some code base of site https://ted-app.sapviet.com

- [Structure](#structure)
  - [Api](#api)
  - [Components](#components)
  - [Modules](#module)
  - [Pages](#pages)
  
### Api 
Using axios library to communicate with REST Api

```bash
yarn add axios
```
```jsx
import * as baseApi from './baseApi';
import { PatientModel } from '../models/patient';

export async function getPatients() {
    return await baseApi.get('api/patients');
}

export async function updatePatient(patient: PatientModel) {
    return await baseApi.put('api/patients', JSON.stringify(patient));
}
```

### Components
Define all components which using in app

Example: Patient List Component
```jsx
import * as React from 'react';
import StaticTable from '../shared/StaticTable';
import PaginationTable from '../shared/PaginationTable';
import { PatientModel } from '../../models/patient';
import PatientListTableItem from './patient-list-table-item';
import { ConstValues } from '../../utilities/constValues';

interface Props {
    patients: Array<PatientModel>;
}

interface State {
    page: number;
}

class PatientListTable extends React.Component<Props, State> {
    state: State = {
        page: 1
    };

    private pageItemSize = 10;

    private columns = [
        {
            name: 'Email'
        },
        {
            name: 'Họ'
        },
        {
            name: 'Tên'
        },
        {
            name: 'Số điện thoại'
        },
        {
            name: ''
        }
    ];

    renderItems = () => {
        const { patients } = this.props;
        const { page } = this.state;
        return patients.slice((page - 1) * this.pageItemSize, page * this.pageItemSize).map((patient, index) => (
            <PatientListTableItem key={index} patient={patient} />
        ));
    }

    onSelectPage = (page: number) => {
        this.setState({
            page: page
        });
    }

    render() {
        const { patients } = this.props;
        const items = this.renderItems();

        return (
            <div className="ibox">
                <div className="ibox-content">
                    {
                        patients && patients.length > 0 ?
                            <>
                                <StaticTable
                                    columns={this.columns}
                                >
                                    {items}
                                </StaticTable>
                                <PaginationTable
                                    totalItems={patients.length}
                                    pageItemSize={this.pageItemSize}
                                    maxDisplayPageNumber={6}
                                    onSelectPage={this.onSelectPage}
                                />
                            </> :
                            <StaticTable
                                columns={this.columns}
                            >
                                <tr className="text-center">
                                    <td colSpan={this.columns.length}>{ConstValues.NO_DATA}</td>
                                </tr>
                            </StaticTable>
                    }
                </div>
            </div>
        );
    }
}

export default PatientListTable;
```

Reusable component will be defined in Components/shared
```jsx
import * as React from 'react';

interface Props {
    columns: Array<ColumnStaticTable>;
}

class StaticTable extends React.Component<Props, {}> {
    render() {
        const {columns} = this.props;

        return (
            <>
            {
                columns && columns.length > 0 ?
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            {
                                columns.map((col, index) => (
                                    <th key={index} className={col.className}>{col.name}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.children}
                    </tbody>
                </table> :
                null
            }
            </>
        );
    }
}

export default StaticTable;

export class ColumnStaticTable {
    name: string;
    className?: string;
}
```

### Modules
Using redux & flow sagas

Example:
```jsx
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
```


### Pages
Complex layouts to combine components

Example:
```jsx
class PatientListPage extends React.Component<Props, {}> {
    static async getInitialProps(ctx: ReduxNextContext) {
        ctx.store.dispatch(actionCreators.getPatients());
        
    }

    render() {
        const { patients, loading } = this.props;

        return (
            <Layout title="Bệnh nhân">
                <PatientList
                    patients={patients}
                    loading={loading}
                />
            </Layout>
        );
    }
}

const mapStateToProps = (rootState: any, props: any) => ({
    patients: selector.getPatients(rootState),
    loading: selector.getLoading(rootState, GET_PATIENTS_ASYNC),
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators(
{
    getPatients: actionCreators.getPatients,
}, 
dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PatientListPage);
```
