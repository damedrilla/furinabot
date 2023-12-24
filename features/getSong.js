import getNowPlayingItem from "../api/spotify.js";

export default function getSong(target) {
    Promise.all([getNowPlayingItem(sclient_id, sclient_secret, srefresh_token)])
      .then((results) => {
        console.log(results);
        if (results[0].isPlaying === true) {
          console.log(results[0]);
          client.say(
            target,
            `Current song playing: ${results[0].title} - ${results[0].artist}`
          );
        } else {
          client.say(target, `No song currently playing`);
        }
      })
      .catch((err) => {
        client.say(target, `Error connecting to Spotify API`);
        console.log(err);
      });
  }