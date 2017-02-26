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
            const channelName = data.display_name ? data.display_name : channel;
            const channelLogo = data.logo ? data.logo : channel
            const html = `
              <li class="result">
                <img src="${channelLogo}" />
                <a href="${data.url ? data.url : ''}" target="_blank"><h3>${channelName}</h3></a>
                <p>${data.status ? data.status == '404' ? 'Channel doesn\'t exist' : data.status : ''}</p>
              </li>`;
            resultList.innerHTML = resultList.innerHTML + html;
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
          const channelName = data.display_name ? data.display_name : channel;
            const channelLogo = data.logo ? data.logo : channel
            const html = `
              <li class="result">
                <img src="${channelLogo}" />
                <a href="${data.url ? data.url : ''}" target="_blank"><h3>${channelName}</h3></a>
                <p>${data.status ? data.status == '404' ? 'Channel doesn\'t exist' : data.status : ''}</p>
              </li>`;
            resultList.innerHTML = resultList.innerHTML + html;
        })
        .catch(err => console.error(err));
        }
      } else {
        // show all channels
        const streamStatus = data.stream != null ? 'Online' : 'Offline';
        const chans = getURL('channels', channel);
        fetch(chans)
        .then(response => response.json())
        .then(data => {
          const channelName = data.display_name ? data.display_name : channel;
          const channelLogo = data.logo ? data.logo : 'https://unsplash.it/200/?random';
          const html = `
            <li class="result">
              <img src="${channelLogo}" />
              <div>
              <a href="${data.url ? data.url : ''}" target="_blank"><h2>${channelName}</h2></a>
              <p class="item__description">${data.status ? data.status == '404' ? 'Channel doesn\'t exist' : data.status : ''}</p>
              <p class="item__status-text">Status: <span class="item__status ${streamStatus == 'Online' ? 'item__status-online' : 'item__status-offline'}">${streamStatus}</span></p>
              <div>
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

window.onload = () => getInfo('all');