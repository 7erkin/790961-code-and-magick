'use strict';

var WIZARDS_QUANTITY = 4;

// Объект wizards есть набор свойств и функций для их инициализации
var wizards = {
  wizardsCharacters: {}, // Объект для хранения значений свойств каждого из персонажей
  propertyPull: { // Коллекция свойств которая будет применена к каждому персонажу
    firstNames: [
      'Иван',
      'Хуан Себастьян',
      'Мария',
      'Кристоф',
      'Виктор',
      'Юлия',
      'Люпита',
      'Вашингтон'
    ],
    lastNames: [
      'да Марья',
      'Верон',
      'Мирабелла',
      'Вальц',
      'Онопко',
      'Топольницкая',
      'Нионго',
      'Ирвинг'
    ],
    colorsCoat: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],
    colorsEyes: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ]
  },
  initWizards: function (howManyWizards) { // формируем персонажей путем создания свойств в объектах
    for (var i = 0; i < howManyWizards; ++i) {
      this.wizardsCharacters[i] = {};
      this.wizardsCharacters[i].name = this.getName();
      this.wizardsCharacters[i].colorEyes = this.getColorEyes();
      this.wizardsCharacters[i].colorCoat = this.getColorCoat();
    }
  },
  getName: function () {
    var indexFirstName = Math.floor(Math.random() * this.propertyPull.firstNames.length);
    var indexLastName = Math.floor(Math.random() * this.propertyPull.lastNames.length);
    return this.propertyPull.firstNames[indexFirstName] + ' ' + this.propertyPull.lastNames[indexLastName];
  },
  getColorCoat: function () {
    var index = Math.floor(Math.random() * this.propertyPull.colorsCoat.length);
    return this.propertyPull.colorsCoat[index];
  },
  getColorEyes: function () {
    var index = Math.floor(Math.random() * this.propertyPull.colorsEyes.length);
    return this.propertyPull.colorsEyes[index];
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

wizards.initWizards(WIZARDS_QUANTITY);
showSetupBlock();
showSetupSimilarBlock(wizards.wizardsCharacters);
