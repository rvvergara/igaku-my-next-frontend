import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import { connect } from 'react-redux';
import { listAvailabilies } from '../../../store/actions/availability';

class BookingForm extends React.Component {
  state = {
    calendarFocused: false,
    selectedDate: moment(this.props.initialDate),
    availabilities: this.props.shownAvailabilities,
  };

  handleChange = (key, val) =>
    this.setState(() => ({
      [key]: val,
    }));

  onDateChange = selectedDate => {
    if (selectedDate) {
      this.setState(() => ({ selectedDate: selectedDate }));
    }
    this.setState(prevState => {
      const newDate = moment(prevState.selectedDate).format('MMMM D, YYYY');
      const newAvailabilities = this.props.availabilities.filter(avail => {
        return moment(avail.date).valueOf() === moment(newDate).valueOf()
      });
      return { availabilities: newAvailabilities}
    })
  };

  onFocusChange = ({ focused }) =>
    this.handleChange('calendarFocused', focused);

  render() {
    return (
      <form className="user-form profile-form">
        <div className="form-group">
          <label htmlFor="booking-date" className="auth-label">
            Select Date
          </label>
          <SingleDatePicker
            id="booking-date"
            date={this.state.selectedDate}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={(day) => {
              if(moment(day).valueOf() != moment(this.state.selectedDate).valueOf()){
                return true;
              };
              return false;
            }}
          />
        </div>

        {this.state.availabilities.length > 0 ? this.state.availabilities.map(availability => (
       <button className="user-form__button" key={availability.id}>{availability.startTime}</button>
        )) : <button>No availability for today</button>}

        <div className="form-group">
          <button className="user-form__button">Book Appointment</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  availabilities: state.availabilities,
  initialDate: state.availabilities[0].date,
  shownAvailabilities: state.availabilities.filter(
    avail => avail.date === state.availabilities[0].date,
  ),
});

export default connect(mapStateToProps, { listAvailabilies })(BookingForm);
