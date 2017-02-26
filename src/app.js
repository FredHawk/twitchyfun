import css from './style.css';

const allButton = document.querySelector('.btn__all');
const onlineButton = document.querySelector('.btn__online');
const offlineButton = document.querySelector('.btn__offline');
const resultList = document.querySelector('.results');

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
          const chans = getURL('channels', channel);
          fetch(chans)
          .then(response => response.json())
          .then(data => {
            console.log('online: ', data);
          })
          .catch(err => console.error(err));
        }
      } else if(status == 'offline') {
        if (data.stream == null) {
        // Show offline channels
        const chans = getURL('channels', channel);
        fetch(chans)
        .then(response => response.json())
        .then(data => {
            console.log('offline: ', data);
        })
        .catch(err => console.error(err));
        }
      } else {
        // show all channels
        const chans = getURL('channels', channel);
        fetch(chans)
        .then(response => response.json())
        .then(data => {
            const channelName = data.display_name ? data.display_name : channel;
            const channelLogo = data.logo ? data.logo : channel
            const html = `
              <li class="result">
                <img src="${channelLogo}" />
                <a href="${data.url ? data.url : ''}"><h3>${channelName}</h3></a>
                <p>${data.status ? data.status == '404' ? 'Channel doesn\'t exist' : data.status : ''}</p>
              </li>`;
            resultList.innerHTML = resultList.innerHTML + html;
        })
        .catch(err => console.error(err));
      }
    })
    .catch(err => console.error(err));
}

function getInfo(status) {
  let streamStatus = status;
  resultList.innerHTML = '';
  channels.map((channel, status ) => getData('streams', channel, streamStatus));
}

onlineButton.addEventListener('click', () => getInfo('online'));
offlineButton.addEventListener('click', () => getInfo('offline'));
allButton.addEventListener('click', () => getInfo('all'));