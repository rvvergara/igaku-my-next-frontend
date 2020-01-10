import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setClinic } from '../../../store/actions/clinic';
import { setPractitioner } from '../../../store/actions/practitioners';
import Booking from '../Booking/Booking';
import PractitionerCard from './PractitionerCard';
import PractitionerDetailsCard from './PractitionerDetailsCard';

const PractitionerProfile = ({ setPractitioner, role, setClinic }) => {
  useEffect(
    () => () => {
      setClinic({});
      setPractitioner({});
    },
    [],
  );

  return (
    <div className="practitioner-profile-container">
      {role === 'PATIENT' && <Booking />}
      <div>
        <PractitionerCard />
        <PractitionerDetailsCard />
      </div>
    </div>
  );
};

PractitionerProfile.propTypes = {
  setPractitioner: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  setClinic: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  role: state.currentUser.data.role,
});

export default connect(mapStateToProps, { setPractitioner, setClinic })(
  PractitionerProfile,
);
