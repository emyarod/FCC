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
];

function getAvatar(user) {
  return new Promise((resolve) => {
    $.getJSON(`https://api.twitch.tv/kraken/users/${user}?callback=?`, (userData) => {
      const { logo: avatar } = userData;
      if (avatar === null) {
        resolve(noavatar);
      } else {
        resolve(avatar);
      }
    });
  });
}

function getStreamDetails(channel) {
  return new Promise((resolve) => {
    $.getJSON(`https://api.twitch.tv/kraken/streams/${channel}?callback=?`, (streamData) => {
      if (streamData.error !== undefined) {
        resolve(new Streamer(channel));
      } else {
        let game = '-';
        let title = 'Offline';

        if (streamData.stream !== null) {
          game = streamData.stream.game;
          title = streamData.stream.channel.status;
        }

        getAvatar(channel).then((image) => {
          const avatar = image;
          // console.log(avatar);
          resolve(new Streamer(channel, avatar, game, title));
        });
      }
    });
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

    if (streamer.status === 'Account closed') {
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
