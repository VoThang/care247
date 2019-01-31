import * as React from 'react';
import Link from 'next/link';
import { PatientModel } from '../../models/patient';

interface Props {
    patient: PatientModel;
}

class PatientListGridItem extends React.Component<Props, {}> {
    render() {
        const { patient } = this.props;

        return (
            <div className="grid-item">
                <div className="ibox">
                    <div className="ibox-content product-box">
                        <div style={{ textAlign: 'center', padding: '10px' }}>
                        {
                            patient.avatarImages && patient.avatarImages.length > 0 ?
                                <img src={patient.avatarImages[0].url} className="rounded-circle" width={200} height={150} /> :
                                <div className="product-imitation">
                                    No image
                            </div>
                        }
                        </div>
                        <div className="product-desc">
                            {/* <span className="product-price">
                                Trưởng phòng khám
                            </span> */}
                            <a href="#" className="product-name">{`${patient.firstName} ${patient.lastName}`}</a>
                            <div className="m-t text-righ">
                                <Link prefetch={true} as={`/p/v/${patient.id}`} href={`/patient/view?id=${patient.id}`}>
                                    <a className="btn btn-xs btn-outline btn-primary">
                                        Chi tiết <i className="fa fa-long-arrow-right" />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default PatientListGridItem;