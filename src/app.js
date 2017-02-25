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
channels.map(channel => getData('streams', channel));