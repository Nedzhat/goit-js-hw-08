import throttle from 'lodash.throttle';

const emailRef = document.querySelector('.feedback-form');
emailRef.addEventListener('input', throttle(readText, 500));
emailRef.addEventListener('submit', submitForm);

const user = {
  email: '',
  message: '',
};

getTextFromLS();

function readText(e) {
  if (e.target.nodeName === 'INPUT') {
    user.email = e.target.value;
    saveTextToLS(user);
  } else if (e.target.nodeName === 'TEXTAREA') {
    user.message = e.target.value;
    saveTextToLS(user);
  } else return;
}

function saveTextToLS(user) {
  localStorage.setItem('feedback-form-state', JSON.stringify(user));
}

function getTextFromLS() {
  if (JSON.parse(localStorage.getItem('feedback-form-state'))) {
    const { email, message } = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
    emailRef.elements.email.value = email;
    emailRef.elements.message.value = message;
    user.email = email;
    user.message = message;
  }
  return;
}

function submitForm(e) {
  e.preventDefault();
  user.email = emailRef.elements.email.value;
  user.message = emailRef.elements.message.value;
  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  console.log(user);
}
