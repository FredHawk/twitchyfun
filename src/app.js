import css from './style.css';

const allButton = document.querySelector('.btn__all');
const onlineButton = document.querySelector('.btn__online');
const offlineButton = document.querySelector('.btn__offline');

const channels = ["brunofin", "comster404", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getURL(type, channel) {
  const baseURL = `https://wind-bow.gomix.me/twitch-api`;
  return `${baseURL}/${type}/${channel}`;
}

function getData (type, channel, status) {
  // get streams data
  const streams = getURL(type, channel);
  fetch(streams)
    .then(response => response.json())
    .then(data => {
      if (status == 'online') {
        if (data.stream != null) {
          // Show online channels
          status = 'online';
          const chans = getURL('channels', channel);
          fetch(chans)
          .then(response => response.json())
          .then(data => {
            console.log('online: ', data)
          })
          .catch(err => console.error(err));
        }
      } else if(status == 'offline') {
        if (data.stream == null) {
        // Show offline channels
        const chans = getURL('channels', channel);
        fetch(chans)
        .then(response => response.json())
        .then(data => console.log('offline: ', data))
        .catch(err => console.error(err));
        }
      } else {
        // show all channels
        const chans = getURL('channels', channel);
        fetch(chans)
        .then(response => response.json())
        .then(data => console.log('Channeldata: ', data))
        .catch(err => console.error(err));
      }
    })
    .catch(err => console.error(err));
}
function getOnline() {
  console.log('From online');
  channels.map((channel, status ) => getData('streams', channel, 'online'));
}
function getOffline() {
  console.log('From offline');
  channels.map((channel, status ) => getData('streams', channel, 'offline'));
}
function getAll() {
  console.log('From all');
  channels.map((channel, status ) => getData('streams', channel));
}

function getInfo(status) {
  console.log(`From ${status}`);
  let streamStatus = status
  channels.map((channel, status ) => getData('streams', channel, streamStatus));
}

onlineButton.addEventListener('click', () => getInfo('online'));
offlineButton.addEventListener('click', () => getInfo('offline'));
allButton.addEventListener('click', () => getInfo('all'));