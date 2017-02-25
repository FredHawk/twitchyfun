import css from './style.css';

const channels = ["brunofin", "comster404", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getURL(type, channel) {
  const baseURL = `https://wind-bow.gomix.me/twitch-api`;
  return `${baseURL}/${type}/${channel}`;
}

function getData (type, channel) {
  // get streams data
  const streams = getURL(type, channel);
  fetch(streams)
    .then(response => response.json())
    .then(data => {
      
      if (data.stream != null) {
        console.log(data.stream.channel.name);
      } else {
        console.log('Streamdata: ', data.stream);
      }
      // get channels data
      const chans = getURL('channels', channel);
      fetch(chans)
      .then(response => response.json())
      .then(data => console.log('Channeldata: ', data))
      .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
}

// function getStream(channel) {
//   // const urlStreams = `https://wind-bow.gomix.me/twitch-api/streams/${channel}`;

//   const data = getData('streams', channel)
//   return data;
// }

// function getChannels(channel) {
//   const urlChannels = `https://wind-bow.gomix.me/twitch-api/channels/${channel}`;

//   const data = getData(urlChannels)
//   return data;
// }

// function getOffline(streamData) {
//   if (streamData.)
// }

// const streamData = channels.map(channel => {
//   return getData('streams', channel)
// });
channels.map(channel => getData('streams', channel));

// const offlineStreams = streamData.filter(streamData => streamData.Object.stream === null);

// console.log(streamData);
// console.log(channelData);
// console.log(chanData[5]);