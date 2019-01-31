import * as React from 'react';
import Masonry from 'react-masonry-component';
import { MasonryOptions } from 'react-masonry-component';
import { PatientModel } from '../../models/patient';
import PatientListGridItem from './patient-list-grid-item';

interface Props {
    patients: Array<PatientModel>;
}

class PatientListGrid extends React.Component<Props, {}> {
    private options: MasonryOptions = {
        columnWidth: 300,
        gutter: 25,
        itemSelector: '.grid-item',
    };

    render() {
        const { patients } = this.props;

        return (
            <>
                {
                    patients && patients.length > 0 ?
                        <Masonry
                            className="grid"
                            options={this.options}
                        >
                            {
                                patients.map((item, index) => {
                                    return <PatientListGridItem key={`patient_grid_item_${item.id}_${index}`} patient={item} />;
                                })
                            }
                        </Masonry> : null
                }
            </>
        );
    }
}

export default PatientListGrid;