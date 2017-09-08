'use strict';

var options = {
  'size': {
    'width': 1280,
    'height': 720
  }
};

var fitVideo = new FitVideo('.js-fit-video', options);

var button = document.querySelectorAll('.js-fit-video-button');
for (var i = 0; i < button.length; i++) {
  var item = button[i];
  item.addEventListener('click', function () {
    fitVideo.destroy();
  });
}
//# sourceMappingURL=app.js.map
