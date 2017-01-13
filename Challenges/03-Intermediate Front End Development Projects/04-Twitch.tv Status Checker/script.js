const noavatar = 'http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png';

class Streamer {
  constructor(channel, avatar = noavatar, game = '-', status = 'Account closed') {
    this.channel = channel;
    this.avatar = avatar;
    this.game = game;
    this.status = status;
  }
}

const channels = [
  'ESL_SC2',
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas',
  'brunofin',
  'comster404',
  'asdfasdfsadfasdfsadffwegawegwegawegawe',
];

function call(type, name) {
  return `https://wind-bow.gomix.me/twitch-api/${type}/${name}?callback=?`;
}

function userExists(user) {
  return new Promise((resolve, reject) => (
    $.getJSON(call('channels', user), (data) => (
      data.error ? reject('User not found') : resolve(data)
    ))
  ));
}

function checkStatus(user) {
  return new Promise((resolve) => (
    $.getJSON(call('streams', user), (data) => (
      data.stream ? resolve(data.stream.channel.status) : resolve('Offline')
    ))
  ));
}

function getStreamDetails(channel) {
  return new Promise((resolve, reject) => {
    userExists(channel)
      .then(({ game, logo: avatar }) => {
        checkStatus(channel)
          .then(title => resolve(new Streamer(channel, avatar, game, title)));
      })
      .catch(err => resolve(new Streamer(channel, noavatar, '-', err)));
  });
}

// map over forEach since it returns
const checkStreams = channels.map(getStreamDetails); // run the function over all channels.

// we now have a promises array and we want to wait for it
const results = Promise.all(checkStreams); // pass array of promises

results.then((streamers) => {
  streamers.forEach((streamer) => {
    let row = '<tr>';
    let avatar = streamer.avatar;
    let channel = streamer.channel;
    let game = `<i>${streamer.game}</i>`;
    let status = streamer.status;

    // check if game is null value
    if (streamer.game !== '-') {
      game = `
        <a href="https://www.twitch.tv/directory/game/${streamer.game}">
          ${game}
        </a>`.trim();
    }

    if (streamer.status === 'User not found') {
      avatar = `<img src="${streamer.avatar}" alt="${streamer.channel}">`;
    } else {
      avatar = `
        <a href="https://www.twitch.tv/${streamer.channel}">
          <img src="${streamer.avatar}" alt="${streamer.channel}">
        </a>`.trim();

      // check if stream is live
      if (status !== 'Offline') {
        row = '<tr class="success">';
        status = `
          <a href="https://www.twitch.tv/${streamer.channel}">${streamer.status}</a>
        `.trim();
      }

      channel = `
        <a href="https://www.twitch.tv/${streamer.channel}">${streamer.channel}</a>
      `.trim();
    }

    $('#streams').append(`
      ${row}
        <td>${avatar}</td>
        <td>${channel}</td>
        <td>${game}</td>
        <td>${status}</td>
      </tr>
    `.trim());
  }, this);
});
