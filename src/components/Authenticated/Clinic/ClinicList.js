import Link from 'next/link';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { listClinics } from '../../../store/actions/clinic';
import { fetchClinics } from '../../../store/thunks/clinic';
import { setAuthorizationToken } from '../../../utils/api';
import ClinicCard from './ClinicCard';
import { withTranslation } from '../../../../i18n';

const ClinicList = ({
  currentUserData,
  clinics,
  fetchClinics,
  listClinics,
  t,
}) => {
  useEffect(() => {
    setAuthorizationToken(localStorage.token);
    fetchClinics();
    return () => {
      listClinics([]);
    };
  }, []);

  return (
    <div>
      {currentUserData.role === 'PRACTITIONER' && (
        <Link href="/clinics/new">
          <a href="/clinics/new" className="nav-link add-clinic-button">
            {t('add-new-clinic')}
          </a>
        </Link>
      )}

      <h5 style={{ textAlign: 'center' }}>
        {t('clinic-list')}
      </h5>
      {clinics.map((clinic) => (
        <ClinicCard key={clinic.id} clinic={clinic} />
      ))}
    </div>
  );
};

ClinicList.propTypes = {
  clinics: PropTypes.instanceOf(Object).isRequired,
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  fetchClinics: PropTypes.func.isRequired,
  listClinics: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
  clinics: state.clinics,
});

export default connect(mapStateToProps, { fetchClinics, listClinics })(withTranslation('clinicList')(ClinicList));
