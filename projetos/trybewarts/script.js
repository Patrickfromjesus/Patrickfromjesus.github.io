const loginBtn = document.querySelector('#login-btn');
const getCheck = document.querySelector('#agreement');
const getTextArea = document.querySelector('#textarea');
const getBtnSub = document.querySelector('#submit-btn');
const getFormHidden = document.querySelector('#form-data');
const getFormAppear = document.querySelector('#evaluation-form');
const label = document.querySelectorAll('.label-hidden-text');
const labelHidden = document.querySelectorAll('.label-hidden');
const takeTextInput = document.querySelectorAll('.take');
const takeHouse = document.querySelector('#house');
const takeLessons = document.querySelectorAll('.subject');

function alertValidLogin() {
  const correctEmail = 'tryber@teste.com';
  const correctPassword = '123456';

  const currentEmail = document.querySelector('#email').value;
  const currentPassword = document.querySelector('#password').value;

  if (currentEmail === correctEmail && currentPassword === correctPassword) {
    window.alert('Olá, Tryber!');
  } else {
    window.alert('Email ou senha inválidos.');
  }
}

function submitValid() {
  const getBtn = document.querySelector('#submit-btn');
  if (document.querySelector('#agreement').checked) {
    getBtn.removeAttribute('disabled');
  } else {
    getBtn.setAttribute('disabled', '');
  }
}

function actualizeCounter() {
  const getCounter = document.querySelector('#counter');
  const limite = 500;
  const caracteresDigitados = parseInt(getTextArea.value.length, 10);
  const caracteresRestantes = limite - caracteresDigitados;
  getCounter.innerHTML = caracteresRestantes;
}

function changeToUpper(name, lastname) {
  const nome = `${name[0].toUpperCase()}${name.substring(1)}`;
  const sobrenome = `${lastname[0].toUpperCase()}${lastname.substring(1)}`;
  return `${nome} ${sobrenome}`;
}

function changeInfo(event) {
  event.preventDefault();
  getFormHidden.className = '';
  getFormAppear.style.display = 'none';
  label[0].innerHTML += changeToUpper(takeTextInput[0].value, takeTextInput[1].value);
  labelHidden[1].innerHTML += document.querySelector('input[name="family"]:checked').value;
  label[1].innerHTML += takeTextInput[2].value;
  labelHidden[0].innerHTML += takeHouse.options[takeHouse.selectedIndex].value;
  const storageChecks = [];
  for (let i = 0; i < takeLessons.length; i += 1) {
    if (takeLessons[i].checked) { storageChecks.push(` ${takeLessons[i].value}`); }
  }
  labelHidden[2].innerHTML += storageChecks;
  labelHidden[3].innerHTML += document.querySelector('input[name="rate"]:checked').value;
  label[2].innerHTML += takeTextInput[3].value;
}

getTextArea.addEventListener('input', actualizeCounter);
loginBtn.addEventListener('click', alertValidLogin);
getCheck.addEventListener('click', submitValid);
getBtnSub.addEventListener('click', (e) =>
  changeInfo(e));
