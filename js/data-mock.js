'use strict';

(function () {
  var WIZARDS_QUANTITY = 4;
  var FIRST_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var LAST_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var Wizard = function () {
    this.name = window.library.getRandomArrayElement(FIRST_NAMES) + ' ' + window.library.getRandomArrayElement(LAST_NAMES);
    this.colorEyes = window.library.getRandomArrayElement(window.objects.COLOR_EYES);
    this.colorCoat = window.library.getRandomArrayElement(window.objects.COLOR_COATS);
  };

  window.getWizards = function () {
    var array = [];
    for (var i = 0; i < WIZARDS_QUANTITY; ++i) {
      var wizard = new Wizard();
      array.push(wizard);
    }
    return array;
  };
})();
