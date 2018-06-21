'use strict';

(function () {
  var wizards = [];
  var elementSetup = document.querySelector('.setup');
  var baseSetupCoords = {
    x: elementSetup.style.left,
    y: elementSetup.style.top
  };
  var makeWizardNode = function (domElement, wizardCharacters) { // функция наполнения шаблона информацией о персонаже
    domElement.querySelector('.setup-similar-label').textContent = wizardCharacters.name;
    domElement.querySelector('.wizard-coat').style.fill = wizardCharacters.colorCoat;
    domElement.querySelector('.wizard-eyes').style.fill = wizardCharacters.colorEyes;
  };
  var showSetupBlock = function () {
    var domElement = document.querySelector('.setup');
    domElement.classList.remove('hidden');
  };
  var showSetupSimilarBlock = function (persons) {
    var template = document.querySelector('#similar-wizard-template').content.querySelector('div');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < persons.length; ++i) {
      var domElement = template.cloneNode(true);
      makeWizardNode(domElement, persons[i]);
      fragment.appendChild(domElement);
    }
    document.querySelector('.setup-similar-list').appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var elementInputUserName = elementSetup.querySelector('.setup-user-name');
  var elementCloseSetup = document.querySelector('.setup-close');
  var elementOpenSetup = document.querySelector('.setup-open');
  var isClosePopupAllowed = function (evt) {
    return (evt.target === elementInputUserName) ? false : true; // !!! isn't quite right !!!
  };
  var openPopup = function () {
    elementSetup.classList.remove('hidden');
  };
  var closePopup = function () {
    elementSetup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupPressEsc);
    setSetupBaseLocation();
  };
  var onPopupPressEsc = function (evt) {
    if (evt.keyCode === 27) {
      if (isClosePopupAllowed(evt)) {
        closePopup();
      }
    }
  };
  var onOpenSetupClicked = function (evt) {
    if (evt.keyCode === undefined || evt.keyCode === 13) {
      openPopup();
      document.addEventListener('keydown', onPopupPressEsc);
    }
  };
  var onCloseSetupClicked = function (evt) {
    if (evt.keyCode === undefined || evt.keyCode === 13) {
      closePopup();
    }
  };
  var addListenerToSetup = function () {
    elementOpenSetup.addEventListener('click', onOpenSetupClicked);
    elementOpenSetup.addEventListener('keydown', onOpenSetupClicked);
    elementCloseSetup.addEventListener('click', onCloseSetupClicked);
    elementCloseSetup.addEventListener('keydown', onCloseSetupClicked);
  };
  var setSetupBaseLocation = function () {
    elementSetup.style.left = baseSetupCoords.x;
    elementSetup.style.top = baseSetupCoords.y;
  };

  addListenerToSetup();
  wizards = window.getWizards();
  showSetupBlock();
  showSetupSimilarBlock(wizards);
})();
