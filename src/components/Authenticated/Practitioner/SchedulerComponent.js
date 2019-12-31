import { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../../store/actions/alerts';
import {
 addAvailability, setSessionDate, setSessionDuration, setSessionStartTime,
} from '../../../store/actions/availability';
import { createAvailabilityOnDb } from '../../../store/thunks/availability';
import { setAuthorizationToken } from '../../../utils/api';
import ScheduleForm from './ScheduleForm';
import SessionDuration from './SessionDuration';
import SessionTime from './SessionTime';

const SchedulerComponent = ({
  currentUserData,
  sessionDate,
  sessionDuration,
  sessionStartTime,
  createAvailabilityOnDb,
  setAlert,
  setSessionDate,
  setSessionDuration,
  setSessionStartTime,
}) => {
  useEffect(() => {
    setSessionDate(moment().format('MMMM D, YYYY'));
      setSessionDuration(30);
      setSessionStartTime('9:00 am');
    return () => {
      setSessionDate('');
      setSessionDuration(0);
      setSessionStartTime('');
    };
}, []);

  const handleSubmit = async () => {
    const endTime = moment(sessionStartTime, 'h:mm')
      .add(sessionDuration, 'minutes')
      .format('LT');
    const processedDate = moment(sessionDate).format('YYYY-MM-DD');
    const UTCStartTime = moment(`${processedDate} ${sessionStartTime}`).toJSON();
    const UTCEndTime = moment(`${processedDate} ${endTime}`).toJSON();
    const bookingParams = {
      date: processedDate,
      startTime: UTCStartTime,
      endTime: UTCEndTime,
      practitionerId: currentUserData.practitioner.id,
  };
    setAuthorizationToken(localStorage.token);
    await createAvailabilityOnDb(bookingParams);
    setAlert('Booking added', 'success');
  };

  return (
    <div className="scheduler-container">
      <ScheduleForm />
      <SessionDuration />
      <SessionTime />
      <div>
        <button type="button" className="clinic-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

SchedulerComponent.propTypes = {
  createAvailabilityOnDb: PropTypes.func.isRequired,
  currentUserData: PropTypes.instanceOf(Object).isRequired,
  sessionDate: PropTypes.string.isRequired,
  sessionDuration: PropTypes.number.isRequired,
  sessionStartTime: PropTypes.string.isRequired,
  addAvailability: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setSessionDate: PropTypes.func.isRequired,
  setSessionDuration: PropTypes.func.isRequired,
  setSessionStartTime: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentUserData: state.currentUser.data,
  sessionDate: state.sessionDate,
  sessionDuration: state.sessionDuration,
  sessionStartTime: state.sessionStartTime,
});

export default connect(mapStateToProps, {
  addAvailability,
  createAvailabilityOnDb,
  setAlert,
  setSessionDate,
  setSessionDuration,
  setSessionStartTime,
})(SchedulerComponent);
