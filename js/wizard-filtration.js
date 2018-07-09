'use strict';

(function () {
  var timerId;
  var PropertyWeight = {
    colorCoat: 2,
    colorEyes: 1
  };
  var elementWizardsProperty = document.querySelector('.wizard');
  var elementWizardsCoat = elementWizardsProperty.querySelector('.wizard-coat');
  var elementWizardsEyes = elementWizardsProperty.querySelector('.wizard-eyes');

  var genUpdateSimilarWizardsEvent = function () {
    var event = new Event('updateSimilarWizards');
    document.dispatchEvent(event);
  };
  var isPropertyMatch = function (wizard, propertyName, propertyValue) {
    return wizard[propertyName] === propertyValue;
  };
  var getSummaryPropertyWeight = function (wizard, currentPropertyValue) {
    var summaryWeight = 0;
    Object.keys(PropertyWeight).forEach(function (propertyName) {
      summaryWeight += isPropertyMatch(wizard, propertyName, currentPropertyValue[propertyName]) ? PropertyWeight[propertyName] : 0;
    });
    return summaryWeight;
  };
  var getCurrentPropertyValue = function () {
    return {
      colorCoat: elementWizardsCoat.style.fill,
      colorEyes: elementWizardsEyes.style.fill
    };
  };
  var filtrate = function () {
    var currentPropertyValue = getCurrentPropertyValue();
    window.setup.filtratedWizards.sort(function (wizard1, wizard2) {
      return -getSummaryPropertyWeight(wizard1, currentPropertyValue) + getSummaryPropertyWeight(wizard2, currentPropertyValue);
    });
    genUpdateSimilarWizardsEvent();
  };
  var debounce = function () {
    clearTimeout(timerId);
    timerId = setTimeout(filtrate, 2000);
  };
  var onClicked = function () {
    debounce();
  };

  window.library.addListenerTo('.setup-wizard-appearance', 'click', onClicked);
  window.library.addListenerTo('.setup-wizard-appearance', 'filtrate', onClicked);
})();
