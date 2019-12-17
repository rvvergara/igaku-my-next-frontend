import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { setSessionStartTime } from '../../../store/actions/availability';

const SessionTimes = ({ sessionDuration, sessionStartTime, setSessionStartTime }) => {
  const format = 'h:mm a';
  // const now = moment().hour(9).minute(0);
  const now = moment(sessionStartTime, 'h:mm');
  console.log(moment(sessionStartTime, 'h:mm').add(sessionDuration, 'minutes').format('HH:MM a'));
  const handleChange = (val) => {
    setSessionStartTime(val.format(format));
  };

  return (
    <div>
      <label htmlFor="from-time">
        Start Time:
        {' '}
      </label>
      <TimePicker
        id="from-time"
        showSecond={false}
        defaultValue={now}
        className="xxx"
        onChange={handleChange}
        format={format}
        use12Hours
        inputReadOnly
      />
      <label htmlFor="to-time">
        End time:
      </label>
      <strong>{moment(sessionStartTime, 'h:mm').add(sessionDuration, 'minutes').format('HH:MM a')}</strong>
    </div>
  );
};

SessionTimes.propTypes = {
  sessionDuration: PropTypes.number.isRequired,
  setSessionStartTime: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sessionStartTime: state.sessionStartTime,
  sessionDuration: state.sessionDuration,
});

export default connect(mapStateToProps, { setSessionStartTime })(SessionTimes);
