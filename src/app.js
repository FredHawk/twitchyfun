import css from './style.css';

const channels = ["brunofin", "comster404", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getData (url) {
  let result = [];
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // if (url.includes('streams')) {
      //   return result.push({'stream': data.stream, 'links': data._links});
      // }
      return result.push(data)
    });
  
  return result;
}

function getStream(channel) {
  const urlStreams = `https://wind-bow.gomix.me/twitch-api/streams/${channel}`;

  const data = getData(urlStreams)
  return data;
}

function getChannels(channel) {
  const urlChannels = `https://wind-bow.gomix.me/twitch-api/channels/${channel}`;

  const data = getData(urlChannels)
  return data;
}

// function getOffline(streamData) {
//   if (streamData.)
// }

const streamData = channels.map(getStream);
const channelData = channels.map(getChannels);

// const offlineStreams = streamData.filter(streamData => streamData.Object.stream === null);

console.log(streamData);
console.log(channelData);
// console.log(offlineStreams);