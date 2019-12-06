import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Layout from '../../components/Layouts/Layout';
import ConnectedPractitionerForm from '../../components/Authenticated/Practitioner/PractitionerForm';
import ConnectedPatientForm from '../../components/Authenticated/Patient/PatientForm';

export const NewProfilePage = ({ token, currentUserData }) => (
  <Layout title={`New ${currentUserData.role} profile`}>
    <h1>Please fill up your information first</h1>
    {currentUserData.role === 'practitioner' ? <ConnectedPractitionerForm token={token} /> : <ConnectedPatientForm token={token} />}
  </Layout>
);

NewProfilePage.getInitialProps = (ctx) => {
  const { store } = ctx;
  const { data } = store.getState().currentUser;
  const token = axios.defaults.headers.common.Authorization.split(' ')[1];
  return { token, currentUserData: data };
};

NewProfilePage.propTypes = {
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string.isRequired,
};

export default connect((state) => state)(NewProfilePage);
