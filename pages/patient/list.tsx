import * as React from 'react';
import { connect } from 'react-redux';
import Layout from '../../components/layouts/wrapper-layout';
import { ReduxNextContext } from '../../utilities/definition-types';
import { actionCreators } from '../../modules/patient/action';
import { 
    GET_PATIENTS_ASYNC,
} from '../../modules/patient/action';
import { bindActionCreators } from 'redux';
import { selector } from '../../modules/patient/reducer';
import { PatientModel } from '../../models/patient';
import PatientList from '../../components/patient/patient-list';

interface Props {
    patients: {
        [id: string]: PatientModel
    };
    loading: boolean;
}

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