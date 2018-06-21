'use strict';

(function () {
  var elementSetup = document.querySelector('.setup');
  var setWizardItemColor = function (element, elementHiddenInput, colors) {
    var color = window.library.getRandomArrayElement(colors);
    element.style.fill = color;
    elementHiddenInput.value = color;
  };
  var setFireballColor = function (element, elementHiddenInput, colors) {
    var color = window.library.getRandomArrayElement(colors);
    element.setAttribute('style', 'background-color:' + color);
    elementHiddenInput.value = color;
  };
  var elementWizardCoat = elementSetup.querySelector('.wizard-coat');
  var elementWizardEyes = elementSetup.querySelector('.wizard-eyes');
  var elementFireballWrap = elementSetup.querySelector('.setup-fireball-wrap');
  var elementFireball = elementFireballWrap.querySelector('.setup-fireball');
  var onWizardSetupClicked = function (evt) {
    var elementHiddenInput;
    if (evt.target === elementFireball) {
      elementHiddenInput = elementFireballWrap.querySelector('[name="fireball-color"]');
      setFireballColor(elementFireballWrap, elementHiddenInput, window.objects.COLOR_FIREBALLS);
      evt.stopPropagation();
    }
    if (evt.target === elementWizardCoat) {
      elementHiddenInput = elementSetup.querySelector('[name="coat-color"]');
      setWizardItemColor(elementWizardCoat, elementHiddenInput, window.objects.COLOR_COATS);
      evt.stopPropagation();
    }
    if (evt.target === elementWizardEyes) {
      elementHiddenInput = elementSetup.querySelector('[name="eyes-color"]');
      setWizardItemColor(elementWizardEyes, elementHiddenInput, window.objects.COLOR_EYES);
      evt.stopPropagation();
    }
  };

  document.querySelector('.setup-player').addEventListener('click', onWizardSetupClicked);
})();
