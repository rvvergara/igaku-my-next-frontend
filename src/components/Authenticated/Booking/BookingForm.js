import { connect } from 'react-redux';
import {
  toggleSetAppointment,
} from '../../../store/actions/booking';
import { displayAvailability } from '../../../store/actions/availability';
import { removeAvailability } from '../../../store/actions/availability';
import {bookSlot} from '../../../store/thunks/booking'


class BookingForm extends React.Component {
  state = {
    remarks: ''
  }

  componentWillUnmount(){
    this.props.toggleSetAppointment(false);
  }

  handleChange = (key, val) =>
    this.setState(() => ({
      [key]: val,
    }));

  handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      patientId: this.props.patientId,
      remarks: this.state.remarks
    }
    this.setState(() => ({
      remarks: ''
    }))
    this.props.toggleSetAppointment(false)
    this.props.bookSlot(bookingData,this.props.availability.id)
  };

  render() {
    return (
      <div className="booking-modal">
        <div className="booking-form-title">
          <p className="grotesque-font">Date: {this.props.availability.date}</p>
          <p className="grotesque-font">Start Time: {this.props.availability.startTime}</p>
          <p className="grotesque-font">End Time: {this.props.availability.endTime}</p>
        </div>
        <label className="remark-label" htmlFor="remarks">
          Remarks:
        </label>
        <textarea
          id="remarks"
          rows={10}
          onChange={(e) => this.handleChange('remarks', e.target.value)}
          placeholder="Give us a short background of your concern"
          value={this.state.remarks}
        />


          <div className="booking-button">
          <button
            type="submit"
            className="confirm-booking"
            onClick={this.handleSubmit}
          >
                    Confirm
          </button>
          <button
            type="button"
            className="confirm-booking orange"
            onClick={() => this.props.toggleSetAppointment(false)}
          >
            Go Back
          </button>

        <div className="form-group">

          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  availability: state.displayedAvailability,
  patientId: state.currentUser.data.patient.id,
});

export default connect(mapStateToProps, {
  toggleSetAppointment,
  removeAvailability,
  displayAvailability,
  bookSlot
})(BookingForm);
