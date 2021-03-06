import { sendRequest, setAuthorizationToken } from '../../utils/api';
import { setCurrentUser } from '../actions/user';
import setError from '../actions/error';
import { setCookie, removeCookie } from '../../utils/cookie';

// Function to fetch profile based on role and userID
const fetchUserProfile = async (id, role) => {
  // const path = `v1/${role.toLowerCase()}s/${id}/user`;
  const path = `v1/users/${id}/${role.toLowerCase()}`;
  try {
    const res = await sendRequest('get', path);
    return res.data[role.toLowerCase()];
  } catch (err) {
    return false;
  }
};

export const fetchUserData = (id) => async (dispatch) => {
  const path = `v1/users/${id}`;
  try {
    const res = await sendRequest('get', path);
    const user = await res.data;
    const { role } = user.user;
    // Fetch user's profile data (whether patient or practitioner)
    const profile = await fetchUserProfile(id, role);
    if (profile) {
      // If user has a profile already add it to user data
      dispatch(setCurrentUser({
        authenticated: true,
        data: { ...user.user, [role.toLowerCase()]: profile, token: user.token },
      }));
    } else {
      // Redirect user to profile edit page
      dispatch(setCurrentUser({
        authenticated: true,
        data: { ...user.user, token: user.token },
      }));
    }
  } catch (err) {
    return dispatch(setError(err));
  }
};

export const signup = (params) => async (dispatch) => {
  const path = 'v1/users';
  try {
    const res = await sendRequest('post', path, params);
    return res;
  } catch (err) {
    dispatch(setError(err.response.data.error));
    throw new Error();
  }
};

export const login = (params) => async (dispatch) => {
  const path = 'v1/login';

  try {
    const res = await sendRequest('post', path, params);
    const { user, token } = res.data;
    setAuthorizationToken(token);
    setCookie('token', token);
    setCookie('timeZone', -(new Date().getTimezoneOffset() / 60));
    localStorage.setItem('token', token);
    localStorage.setItem('timeZone', -(new Date().getTimezoneOffset() / 60));
    dispatch(setCurrentUser({
      authenticated: true,
      data: user,
    }));
    return user;
  } catch (err) {
    dispatch(setError('Invalid Credentials'));
    throw new Error();
  }
};

export const logout = () => (dispatch) => {
  setAuthorizationToken(false);
  removeCookie('token');
  localStorage.clear();
  dispatch(setCurrentUser({
    authenticated: false,
    data: {},
  }));
};

export const updatePassword = (id, params) => async (dispatch) => {
  const path = `v1/users/${id}/update-password`;

  try {
    const res = await sendRequest('post', path, params);
    return res.data;
  } catch (err) {
    dispatch(setError(err));
    return err.response.data;
  }
};

export const sendReferralLink = (id, params) => async (dispatch) => {
  const path = `v1/users/${id}/send-referral-link`;

  try {
    const res = await sendRequest('post', path, params);
    const success = await res.data.success;
    return success;
  } catch (err) {
    if (err.response.data.error.errors) {
      const { errors } = err.response.data.error;
      const emailInvalidError = errors.some((error) => error.msg === 'Please provide a valid email');
      if (emailInvalidError) {
        const invalidEmails = errors.map((error) => error.value).join(', ');
      dispatch(setError(`These emails are invalid: ${invalidEmails}`));
      }
    } else {
      dispatch(setError(err.response.data.error));
    }
    return false;
  }
};
