import * as React from 'react';
import Link from 'next/link';
import { PatientModel } from '../../models/patient';

interface Props {
    patient: PatientModel;
}

class PatientListTableItem extends React.Component<Props, {}> {
    render() {
        const { patient } = this.props;

        return (
            <tr key={patient.id}>
                <td>{patient.email}</td>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.phone}</td>
                <td>
                    <Link prefetch={true} as={`/p/v/${patient.id}`} href={`/patient/view?id=${patient.id}`}>
                        <a className="btn btn-xs btn-outline btn-primary">
                            Chi tiết <i className="fa fa-long-arrow-right" />
                        </a>
                    </Link>
                </td>
            </tr>
        );
    }
}

export default PatientListTableItem;