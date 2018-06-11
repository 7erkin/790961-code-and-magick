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

// Объект wizards есть набор свойств и функций для их инициализации
var wizards = {
  wizardsCharacters: {}, // Объект для хранения значений свойств каждого из персонажей
  initWizards: function (howManyWizards, firstNames, lastNames, colorCoats, colorEyes) { // формируем персонажей путем создания свойств в объектах
    for (var i = 0; i < howManyWizards; ++i) {
      this.wizardsCharacters[i] = {};
      this.wizardsCharacters[i].name = firstNames[getRandomValue(firstNames.length)] + ' ' + lastNames[getRandomValue(lastNames.length)];
      this.wizardsCharacters[i].colorEyes = colorEyes[getRandomValue(colorEyes.length)];
      this.wizardsCharacters[i].colorCoat = colorCoats[getRandomValue(colorCoats.length)];
    }
  }
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

wizards.initWizards(WIZARDS_QUANTITY, FIRSTNAMES, LASTNAMES, COLOR_COATS, COLOR_EYES);
showSetupBlock();
showSetupSimilarBlock(wizards.wizardsCharacters);
