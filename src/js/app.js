let options = {
    'size': {
        'width': 1280,
        'height': 720
    }
};

let fitVideo = new FitVideo('.js-fit-video', options);

let button = document.querySelectorAll('.js-fit-video-button');
for(let i = 0; i < button.length; i++){
  let item = button[i];
  item.addEventListener('click', ()=>{
    fitVideo.destroy();
  });
}
