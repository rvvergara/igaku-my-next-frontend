import moment from 'moment';
import PropTypes from 'prop-types';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { connect } from 'react-redux';
import { withTranslation } from '../../../../i18n';
import { setSessionStartTime } from '../../../store/actions/availability';

const SessionTimes = ({
  sessionDuration,
  sessionStartTime,
  setSessionStartTime,
  sessionDate,
  t,
}) => {
  const format = 'h:mm a';
  const defaultStartTime = sessionStartTime ? moment(sessionStartTime, 'h:mm a') : moment(moment().format('h:mm a'), 'LTS');
  const handleChange = (val) => {
    if (val) setSessionStartTime(val.format(format));
  };

  const getDisabledHours = () => {
    const hours = [];
    const todayDate = moment().format('MMMM DD, YYYY');
    if (todayDate === sessionDate) {
      for (let i = 0; i < moment().hour(); i += 1) {
        hours.push(i);
      }
    }
    return hours;
  };
  return (
    <div className="scheduler-inner-component-container">
      <h3 className="scheduler-inner-component__title">{t('time')}</h3>
      <label htmlFor="from-time" className="auth-label schedule-label">
        {t('startTime')}
      </label>
      <TimePicker
        id="from-time"
        showSecond={false}
        defaultValue={moment(moment().format('h:mm a'), 'LTS')}
        className="xxx"
        onChange={handleChange}
        format={format}
        use12Hours
        inputReadOnly
        disabledHours={getDisabledHours}
      />
      <label htmlFor="to-time" className="auth-label schedule-label">
        {t('endTime')}
      </label>
      <span className="rc-time-picker xxx read-only-time-span">
        <span className="rc-time-picker-input">
          {defaultStartTime
            .add(sessionDuration, 'minutes')
            .format('LT')}
        </span>
      </span>
    </div>
  );
};

SessionTimes.propTypes = {
  sessionDuration: PropTypes.number.isRequired,
  setSessionStartTime: PropTypes.func.isRequired,
  sessionStartTime: PropTypes.string.isRequired,
  sessionDate: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  sessionStartTime: state.sessionStartTime,
  sessionDuration: state.sessionDuration,
  sessionDate: state.sessionDate,
});

export default connect(mapStateToProps, { setSessionStartTime })(
  withTranslation('scheduleForm')(SessionTimes),
);
