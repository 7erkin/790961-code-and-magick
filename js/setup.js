'use strict';

(function () {
  var QUANTITY_SIMILAR_WIZARDS = 4;
  var elementSetup = document.querySelector('.setup');
  var elementInputUserName = elementSetup.querySelector('.setup-user-name');
  var elementForm = document.querySelector('.setup-wizard-form');
  var templateWizard = document.querySelector('#similar-wizard-template').content.querySelector('div');
  var elementSetupWizard = document.querySelector('.setup-wizard-appearance');
  var elementSetupSimilarList = document.querySelector('.setup-similar-list');
  var elementSetupSimilar = document.querySelector('.setup-similar');
  var baseSetupCoords = {
    x: elementSetup.style.left,
    y: elementSetup.style.top
  };

  var makeWizardNode = function (domElement, wizardCharacters) { // функция наполнения шаблона информацией о персонаже
    domElement.querySelector('.setup-similar-label').textContent = wizardCharacters.name;
    domElement.querySelector('.wizard-coat').style.fill = wizardCharacters.colorCoat;
    domElement.querySelector('.wizard-eyes').style.fill = wizardCharacters.colorEyes;
  };
  var renderSimilarWizards = function () {
    deletePreviousSimilarWizards();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < QUANTITY_SIMILAR_WIZARDS; ++i) {
      var domElement = templateWizard.cloneNode(true);
      domElement.setAttribute('data-wizard', 'true');
      makeWizardNode(domElement, window.setup.filtratedWizards[i]);
      fragment.appendChild(domElement);
    }
    elementSetupSimilarList.appendChild(fragment);
    elementSetupSimilar.classList.remove('hidden');
  };

  var elementCloseSetup = document.querySelector('.setup-close');
  var elementOpenSetup = document.querySelector('.setup-open');
  var isClosePopupAllowed = function (evt) {
    return (evt.target === elementInputUserName) ? false : true;
  };
  var openPopup = function () {
    window.backend.load(onLoad, onError, onTimeoutHappend);
    elementSetup.classList.remove('hidden');
    window.library.addListenerTo('.setup-submit', 'click', onSetupSubmitClicked);
  };
  var closePopup = function () {
    elementSetup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupPressEsc);
    deleteSimilarWizards();
    setSetupBaseLocation();
    window.library.removeListenerFrom('.setup-submit', 'click', onSetupSubmitClicked);
  };
  var onSetupSubmitClicked = function (evt) {
    evt.preventDefault();
    var data = new FormData(elementForm);
    window.backend.save(data, onFormSend, onError, onTimeoutHappend);
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
    window.library.addListenerToDocument('updateSimilarWizards', renderSimilarWizards);
  };
  var setSetupBaseLocation = function () {
    elementSetup.style.left = baseSetupCoords.x;
    elementSetup.style.top = baseSetupCoords.y;
  };
  var deleteSimilarWizards = function () {
    var elementsSimilarWizards = document.querySelectorAll('[data-wizard="true"]');
    for (var i = 0; i < elementsSimilarWizards.length; ++i) {
      elementsSimilarWizards[i].remove();
    }
  };

  var genFiltrationEvent = function () {
    var event = new Event('filtrate');
    elementSetupWizard.dispatchEvent(event);
  };
  var onLoad = function (evt) {
    var xhr = evt.target;
    var error = '';
    switch (xhr.status) {
      case 200:
        window.setup.originalWizards = xhr.response;
        window.setup.filtratedWizards = window.setup.originalWizards.slice();
        genFiltrationEvent();
        break;
      default:
        error = 'status error: ' + xhr.status + '!';
    }
    if (error !== '') {
      renderError(error);
    }
  };
  var onTimeoutHappend = function () { };
  var onError = function (evt) {
    var error = 'status error: ' + evt.target.status + '!';
    renderError(error);
  };
  var onFormSend = function (evt) {
    var xhr = evt.target;
    var error = '';
    switch (xhr.status) {
      case 200:
        closePopup();
        break;
      default:
        error = 'status error: ' + xhr.status + '!';
    }
    if (error !== '') {
      renderError(error);
    }
  };
  var renderError = function () {}; // отрисовка ошибки
  var deletePreviousSimilarWizards = function () {
    var elementsSimilarWizards = document.querySelectorAll('[data-wizard="true"]');
    if (elementsSimilarWizards === null) {
      return;
    }
    for (var i = 0; i < elementsSimilarWizards.length; ++i) {
      elementsSimilarWizards[i].remove();
    }
  };

  addListenerToSetup();

  window.setup = {};
  window.setup.originalWizards = [];
  window.setup.filtratedWizards = [];
})();
