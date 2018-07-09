'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
  var elementAvatarPicture = document.querySelector('.setup-user-pic');

  var onChanged = function (evt) {
    var elementInput = evt.target;
    var fileLoaded = elementInput.files[0];
    var fileName = fileLoaded.name.toLowerCase();
    var match = FILE_TYPES.some(function (typeName) {
      return fileName.endsWith(typeName);
    });
    if (match) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        elementAvatarPicture.src = reader.result;
      });
      reader.readAsDataURL(fileLoaded);
    }
  };

  window.library.addListenerTo('#avatar', 'change', onChanged);
})();
