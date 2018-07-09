'use strict';

(function () {
  var elementSetup = document.querySelector('.setup');
  var elementAvatar = document.querySelector('.upload');
  var dragged;

  var onMouseDown = function (evt) {
    evt.preventDefault();
    dragged = false;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (mouseEvt) {
      evt.preventDefault();
      var shift = getShift(mouseEvt);
      setSetupLocation(shift);
      changeStartCoords(mouseEvt);
      dragged = true;
    };
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    var getShift = function (mouseEvt) {
      return {
        x: startCoords.x - mouseEvt.clientX,
        y: startCoords.y - mouseEvt.clientY
      };
    };
    var changeStartCoords = function (mouseEvt) {
      startCoords.x = mouseEvt.clientX;
      startCoords.y = mouseEvt.clientY;
    };
    var setSetupLocation = function (shift) {
      elementSetup.style.left = (elementSetup.offsetLeft - shift.x) + 'px';
      elementSetup.style.top = (elementSetup.offsetTop - shift.y) + 'px';
    };
  };
  var onAvatarClicked = function (evt) {
    if (dragged) {
      dragged = false;
      evt.preventDefault();
    }
  };

  elementAvatar.addEventListener('mousedown', onMouseDown);
  elementAvatar.addEventListener('click', onAvatarClicked);
})();
