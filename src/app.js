import css from './style.css';

const channels = ["brunofin", "comster404", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getData (url) {
  let result = [];
  fetch(url)
    .then(response => response.json())
    .then(data => result.push(data));
  
  return result;
}

function getStreamStatus(channel) {
  const urlStreams = `https://wind-bow.gomix.me/twitch-api/streams/${channel}`;

  const data = getData(urlStreams)
  return data;
}

function getChannels(channel) {
  const urlChannels = `https://wind-bow.gomix.me/twitch-api/channels/${channel}`;

  const data = getData(urlChannels)
  return data;
}

const streamStatus = channels.map(getStreamStatus);
const channelData = channels.map(getChannels);

console.log(streamStatus);
console.log(channelData);