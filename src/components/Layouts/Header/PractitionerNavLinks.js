import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import { FaCalendarAlt } from 'react-icons/fa';
import { GiHealthNormal } from 'react-icons/gi';
import { GoPerson } from 'react-icons/go';
import { MdFeedback, MdSchedule } from 'react-icons/md';
import { withTranslation } from '../../../../i18n';
import NotificationList from '../../Authenticated/Notification/NotificationList';

const PractitionerNavLinks = ({ t }) => (
  <>
    <Link href="/account/edit">
      <Nav.Link href="/account/edit" className="header-navlinks">
        <GoPerson className="nav-icons" />
        <span className="header-navlinks-text">{t('settings')}</span>
      </Nav.Link>
    </Link>
    <Link href="/profile/edit">
      <Nav.Link href="/profile/edit" className="header-navlinks">
        <GoPerson className="nav-icons" />
        <span className="header-navlinks-text">{t('profile')}</span>
      </Nav.Link>
    </Link>
    <Link href="/schedule">
      <Nav.Link href="/schedule" className="header-navlinks">
        <FaCalendarAlt className="nav-icons" />
        <span className="header-navlinks-text">{t('schedule')}</span>
      </Nav.Link>
    </Link>
    <Link href="/bookings">
      <Nav.Link href="/bookings" className="header-navlinks">
        <MdSchedule className="nav-icons" />
        <span className="header-navlinks-text">{t('bookings')}</span>
      </Nav.Link>
    </Link>
    <Link href="/clinics">
      <Nav.Link href="/clinics" className="header-navlinks">
        <GiHealthNormal className="nav-icons" />
        <span className="header-navlinks-text">{t('clinics')}</span>
      </Nav.Link>
    </Link>
    <Link href="/feedback">
      <Nav.Link href="/feedback" className="header-navlinks prominent">
        <MdFeedback className="nav-icons" />
        <span className="header-navlinks-text">{t('feedback')}</span>
      </Nav.Link>
    </Link>
    <NotificationList />
  </>
);

export default withTranslation('practitionerNavLink')(PractitionerNavLinks);
