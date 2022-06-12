import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

setCurrentTimePlayer(getCurrentTimeLS());

player.on('timeupdate', throttle(saveCurrentTimeLS, 1000));

function saveCurrentTimeLS(e) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(e));
}

function getCurrentTimeLS() {
  if (JSON.parse(localStorage.getItem('videoplayer-current-time'))) {
    return JSON.parse(localStorage.getItem('videoplayer-current-time')).seconds;
  }
  return;
}

function setCurrentTimePlayer(time) {
  player
    .setCurrentTime(time)
    .then(function (seconds) {
      console.log();
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;
        default:
          break;
      }
    });
}
