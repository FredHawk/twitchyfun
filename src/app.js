import css from './style.css';

const channels = ["brunofin", "comster404", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getData (type, channel) {
  const url = `https://wind-bow.gomix.me/twitch-api/${type}/${channel}`;
  let result = [];
  let test = [];
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      // const channelData = test.push(data);
      // console.log(channelData);

      if (url.includes('streams')) {
        if (data.stream != null) {
          // const channelData = data.keys(channel => {
          //   getData('channels', channel)
          // });
          // console.log(data);
          let temp = result.push({'stream': data.stream, 'links': data._links});
          // console.log(temp);
          return temp;
        }
      }
      return result.push(data);
    })
    .catch(error => console.error(error));
  // console.log(result);
  return result;
}

function getStream(channel) {
  // const urlStreams = `https://wind-bow.gomix.me/twitch-api/streams/${channel}`;

  const data = getData('streams', channel)
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

// const streamData = channels.map(channel => {
//   return getData('streams', channel)
// });
const chanData = channels.map(channel => {
  return getData('channels', channel)
});

// const offlineStreams = streamData.filter(streamData => streamData.Object.stream === null);

// console.log(streamData);
// console.log(channelData);
console.log(chanData[5]);