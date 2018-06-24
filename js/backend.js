'use strict';

(function () {
  var URL_GET = 'https://js.dump.academy/code-and-magick/data'; // .json?
  var elementForm = document.querySelector('.setup-wizard-form');
  var URL_POST = elementForm.action;

  window.backend = {};
  window.backend.load = function (onLoad, onError, onTimeOut) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', onError); // for 500 answer | if we have got not a JSON answer
    xhr.addEventListener('timeout', onTimeOut);
    xhr.timeout = 1000;
    xhr.responseType = 'json';
    xhr.open('GET', URL_GET, true);
    xhr.send();
  };
  window.backend.save = function (data, onLoad, onError, onTimeOut) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', onError);
    xhr.addEventListener('timeout', onTimeOut);
    xhr.timeout = 1000;
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };
})();
