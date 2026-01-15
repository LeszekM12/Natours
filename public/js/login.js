/* eslint-disable */

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully.');
      window.setTimeout(() => {
        location.assign('/');
      },750)
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
const form = document.querySelector('.form--login');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}


const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentNode.removeChild(el);
};

// type is success or error
const showAlert = (type, msg, time = 5) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, time * 1000);
};

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    if ((res.data.status === 'success')) location.reload(true);
  } catch (err) {
    showAlert('error', 'Error while logging out! Try again.');
  }
};
const el = document.querySelector('.nav__el--logout');
if (el) {
  el.addEventListener('click', logout);
}