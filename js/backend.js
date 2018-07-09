'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/code-and-magick/data';
  var elementForm = document.querySelector('.setup-wizard-form');
  var URL_POST = elementForm.action;

  window.backend = {};
  window.backend.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', onError);
    xhr.responseType = 'json';
    xhr.open('GET', URL_GET, true);
    xhr.send();
  };
  window.backend.save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', onError);
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };
})();
