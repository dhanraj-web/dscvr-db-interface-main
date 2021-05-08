import moment from 'moment';

export const getDateDiff = (startDate, endDate) => {
  var delta = Math.abs(endDate - startDate) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = parseInt(delta % 60); // in theory the modulus is not required

  return days > 0
    ? `+ ${days} days`
    : hours > 0
    ? `${hours} h ${minutes} m ${seconds} s`
    : `${minutes} m ${seconds} s`;
};

export function isValidEmail(value) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log('EMAIL', re.test(String(value).toLowerCase()));
  return re.test(String(value).toLowerCase());
}
export function isValidPassword(value) {
  var re = /^(?=.*\d)(?=.*[A-Z]).{8,14}$/;
  return re.test(value);
}
export function isValidNumber(value) {
  const re = /^[0-9]*$/;
  return re.test(value);
}

export function isBlank(value) {
  console.log('dddd', value, value === null || value.match(/^ *$/) !== null);
  return value === null || value.match(/^ *$/) !== null;
}

export function TostMsgFun() {
  var x = document.getElementById('snackbar');
  x.className = 'show';
  setTimeout(function () {
    x.className = x.className.replace('show', '');
  }, 3000);
}
