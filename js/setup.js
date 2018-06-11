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

var Wizards = function (howManyWizards, firstNames, lastNames, colorCoats, colorEyes) {
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

var showSetupSimilarBlock = function (wizardsCharacters) {
  var template = document.querySelector('#similar-wizard-template').content.querySelector('div');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < WIZARDS_QUANTITY; ++i) {
    var domElement = template.cloneNode(true);
    makeWizard(domElement, wizardsCharacters[i]);
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

wizards = new Wizards(WIZARDS_QUANTITY, FIRSTNAMES, LASTNAMES, COLOR_COATS, COLOR_EYES);
showSetupBlock();
showSetupSimilarBlock(wizards.wizardsCharacters);
