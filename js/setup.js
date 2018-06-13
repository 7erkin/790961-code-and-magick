'use strict';

var WIZARDS_QUANTITY = 4;
var FIRSTNAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var LASTNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COLOR_COATS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var COLOR_EYES = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var wizards = [];

var getWizards = function (howManyWizards, firstNames, lastNames, colorCoats, colorEyes) {
  var array = [];
  for (var i = 0; i < howManyWizards; ++i) {
    var wizard = new Wizard(firstNames, lastNames, colorCoats, colorEyes);
    array.push(wizard);
  }
  return array;
};

var Wizard = function (firstNames, lastNames, colorCoats, colorEyes) {
  this.name = getRandomElement(firstNames) + ' ' + getRandomElement(lastNames);
  this.colorEyes = getRandomElement(colorEyes);
  this.colorCoat = getRandomElement(colorCoats);
};

var showSetupBlock = function () {
  var domElement = document.querySelector('.setup');
  domElement.classList.remove('hidden');
};

var showSetupSimilarBlock = function (persons) {
  var template = document.querySelector('#similar-wizard-template').content.querySelector('div');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < WIZARDS_QUANTITY; ++i) {
    var domElement = template.cloneNode(true);
    makeWizard(domElement, persons[i]);
    fragment.appendChild(domElement);
  }
  document.querySelector('.setup-similar-list').appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
};

var makeWizard = function (domElement, wizardCharacters) { // функция наполнения шаблона информацией о персонаже
  domElement.querySelector('.setup-similar-label').textContent = wizardCharacters.name;
  domElement.querySelector('.wizard-coat').style.fill = wizardCharacters.colorCoat;
  domElement.querySelector('.wizard-eyes').style.fill = wizardCharacters.colorEyes;
};

var getRandomValue = function (maxValue) {
  return Math.floor(Math.random() * maxValue);
};

var getRandomElement = function (array) {
  return array[getRandomValue(array.length)];
};

wizards = getWizards(WIZARDS_QUANTITY, FIRSTNAMES, LASTNAMES, COLOR_COATS, COLOR_EYES);
showSetupBlock();
showSetupSimilarBlock(wizards);

// ==================== Здесь начинается module4-task1

// ========== В этом блоке настраиваю интерфейс работы с окном настройки параметров персонажа ==========
var elementSetup = document.querySelector('.setup');
var elementInputUserName = elementSetup.querySelector('.setup-user-name');
var elementCloseSetup = document.querySelector('.setup-close');
var elementOpenSetup = document.querySelector('.setup-open');
var isClosePopupAllowed = function (evt) {
    return (evt.target == elementInputUserName) ? false : true; // !!! isn't quite right !!!
};
var openPopup = function () {
    elementSetup.classList.remove('hidden');
};
var closePopup = function () {
    elementSetup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupPressEsc);
};
var onPopupPressEsc = function (evt) {
    if(evt.keyCode === 27){
        if(isClosePopupAllowed(evt)){
            closePopup();
        }
    }
};
var onOpenSetupClicked = function (evt) {
    if(evt.keyCode === undefined || evt.keyCode === 13){
        openPopup();
        document.addEventListener('keydown', onPopupPressEsc);
    }
};
var onCloseSetupClicked = function (evt) {
    if(evt.keyCode === undefined || evt.keyCode === 13){
        closePopup();
    }
};
elementOpenSetup.addEventListener('click', onOpenSetupClicked);
elementOpenSetup.addEventListener('keydown', onOpenSetupClicked);
elementCloseSetup.addEventListener('click', onCloseSetupClicked);
elementCloseSetup.addEventListener('keydown', onCloseSetupClicked);

// ========== В этом блоке настраиваю интерфейс по изменению параметров волшебника пользователем ==========
// setWizardItemColor - функция для установки цвета элементам персонажа
// setFireballColor - функция для установки цвета Файербола
// onWizardSetupClicked - обработчик события для осуществления изменения цвета объектов в меню
var setWizardItemColor = function (element, elementHiddenInput ,colors){
    var color = getRandomElement(colors);
    element.style.fill = color;
    elementHiddenInput.value = color;
}
var setFireballColor = function (element, elementHiddenInput, colors) {
    var color = getRandomElement(colors);
    element.setAttribute('style', 'background-color:' + color);
    elementHiddenInput.querySelector('[name="fireball-color"]').value = color;
};
var COLOR_FIREBALLS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
];
var elementWizardCoat = elementSetup.querySelector('.wizard-coat');
var elementWizardEyes = elementSetup.querySelector('.wizard-eyes');
var elementFireballWrap = elementSetup.querySelector('.setup-fireball-wrap');
var elementFireball = elementFireballWrap.querySelector('.setup-fireball');
var onWizardSetupClicked = function (evt) {
    if(evt.target === elementFireball){
        var elementHiddenInput =  elementFireballWrap.querySelector('[name="coat-color"]');
        setFireballColor(elementFireballWrap, elementHiddenInput, COLOR_FIREBALLS);
        evt.stopPropagation();
    }
    if(evt.target === elementWizardCoat){
        var elementHiddenInput =  elementSetup.querySelector('[name="coat-color"]');
        setWizardItemColor(elementWizardCoat, elementHiddenInput, COLOR_COATS);
        evt.stopPropagation();
    }
    if(evt.target === elementWizardEyes){
        var elementHiddenInput =  elementSetup.querySelector('[name="eyes-color"]');
        setWizardItemColor(elementWizardEyes, elementHiddenInput, COLOR_EYES);
        evt.stopPropagation();
    }
};

document.querySelector('.setup-player').addEventListener('click', onWizardSetupClicked);
