'use strict';

(function () {
  var QUANTITY_SIMILAR_WIZARDS = 4;
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
  var renderSimilarWizards = function (persons) {
    var template = document.querySelector('#similar-wizard-template').content.querySelector('div');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < persons.length; ++i) {
      var domElement = template.cloneNode(true);
      domElement.setAttribute('data-wizard', 'true');
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
    var elementForm = document.querySelector('.setup-wizard-form');
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

  var applyResponse = function (objects) {
    var similarWizards = getRandomArrayElements(objects);
    renderSimilarWizards(similarWizards);
  };
  var onLoad = function (evt) {
    var xhr = evt.target;
    var error = '';
    switch (xhr.status) {
      case 200:
        applyResponse(xhr.response);
        break;
      default:
        error = 'status error: ' + xhr.status + '!';
    }
    if (error !== '') {
      renderError(error);
    }
  };
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
  var onTimeoutHappend = function () {
    renderError('timeout');
  };
  var renderError = function (error) {
    deletePreviousError();
    var templateError = document.querySelector('#network-error').content.querySelector('#error');
    var elementError = templateError.cloneNode(true);
    var str = 'Error connection: ';
    elementError.innerText = str + error;
    document.querySelector('.setup-similar').appendChild(elementError);
  };
  var deletePreviousError = function () {
    var elementError = document.querySelector('#error');
    if (elementError === null) {
      return;
    }
    elementError.remove();
  };
  var getRandomArrayElements = function (array) {
    var resultArray = [];
    var randomIndex;
    for (var i = 0; i < QUANTITY_SIMILAR_WIZARDS; ++i) {
      randomIndex = window.library.getRandomValue(0, array.length - 1);
      resultArray.push(array[randomIndex]);
    }
    return resultArray;
  };

  addListenerToSetup();
})();
