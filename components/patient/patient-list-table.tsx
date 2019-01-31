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