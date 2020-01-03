import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BookingSelection from './BookingSelection';
import BookingForm from './BookingForm';
import { fetchPractitionerAvailabilities } from '../../../store/thunks/availability';
import { listAvailabilies } from '../../../store/actions/availability';

const Booking = ({
  settingAppointment, fetchPractitionerAvailabilities,
   displayedPractitioner,
   listAvailabilies,
}) => {
  useEffect(() => {
    fetchPractitionerAvailabilities(displayedPractitioner.id);
    return () => listAvailabilies([]);
  }, []);
  return (
    <div className="booking-container">
      <div className="booking-form-header">
        <h5>Book an Appointment</h5>
      </div>
      {
      settingAppointment
      ? <BookingForm />
      : <BookingSelection />
    }
    </div>
  );
};

Booking.propTypes = {
  displayedPractitioner: PropTypes.instanceOf(Object).isRequired,
  fetchPractitionerAvailabilities: PropTypes.func.isRequired,
  settingAppointment: PropTypes.func.isRequired,
  listAvailabilies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  settingAppointment: state.settingAppointment,
  displayedPractitioner: state.displayedPractitioner.id,
});

export default connect(mapStateToProps, {
   fetchPractitionerAvailabilities,
   listAvailabilies,
  })(Booking);
