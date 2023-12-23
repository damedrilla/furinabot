import "dotenv/config";
import getNowPlayingItem from "./api/spotify.js";
import tmi from "tmi.js";
import getAccessToken from "./getaccesstoken.js";

const {
  SPOTIFY_CLIENT_ID: sclient_id,
  SPOTIFY_CLIENT_SECRET: sclient_secret,
  SPOTIFY_REFRESH_TOKEN: srefresh_token,
  USER_NAME: uname,
  ACCESS_TOKEN: token,
  REFRESH_TOKEN: refresh_token,
  CLIENT_ID: id,
  CLIENT_SECRET: secret,
} = process.env;
export const opts = {
  identity: {
    username: uname,
    password: "",
  },
  channels: ["jahmsd", "sveltebs"],
};

const client = new tmi.client(opts);
var enabled = true;

client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

getAccessToken(id, secret, refresh_token)
  .then(client.connect())
  .catch(console.log("Error fetching access token"));

function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  }
  let ctx = context;
  console.log(
    "username:" + ctx.username + " badges: " + JSON.stringify(ctx.badges)
  );
  var cmdSplit = msg.split(" ");
  var actualCommand = cmdSplit[0];
  console.log("args :" + cmdSplit[1]);
  var args;
  if (cmdSplit[1] === undefined) {
    args = "nothing";
  } else {
    args = cmdSplit[1];
  }
  if (enabled) {
    if (actualCommand === "!dice" || actualCommand === "!dice 󠀀") {
      const num = rng(6);
      client.say(target, `You rolled a ${num} furinaSmug`);
    } else if (actualCommand === "!rng" || actualCommand === "!rng 󠀀") {
      if (args === "" || args === undefined) {
        const num = rng(100);
        client.say(target, `RNG (1-100): ${num}`);
      } else if (args === "help") {
        client.say(
          target,
          `Gives a random generated number. Syntax: !rng or !rng <range> (ex: !rng 1500)`
        );
      } else {
        const num = rng(parseInt(args));
        client.say(target, `RNG (1-${args}): ${num}`);
      }
    } else if (actualCommand === "!fish" || actualCommand === "!fish 󠀀") {
      fishGame(target);
    } else if (actualCommand === "hi") {
      client.say(target, `freen`);
    } else if (actualCommand === "buh") {
      client.say(target, `buh`);
    } else if (
      actualCommand === "!songname" ||
      actualCommand === "!songname 󠀀"
    ) {
      getSong(target);
    } else if (actualCommand === "!disable" || actualCommand === "!disable 󠀀") {
      if (ctx.badges.broadcaster === "1" || ctx.badges.vip === "1") {
        enabled = false;
        client.say(target, `Bye!`);
      } else {
        return;
      }
    } else {
      return;
    }
  } else {
    if (actualCommand === "!enable" || actualCommand === "!enable 󠀀") {
      if (ctx.badges.broadcaster === "1" || ctx.badges.vip === "1") {
        enabled = true;
        client.say(target, `I'm back! furinaSmug`);
      } else {
        return;
      }
    } else {
      return;
    }
  }
}
function rng(high) {
  const sides = high;
  return Math.floor(Math.random() * sides) + 1;
}
function getSong(target) {
  Promise.all([getNowPlayingItem(sclient_id, sclient_secret, srefresh_token)])
    .then((results) => {
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
    });
}
function fishGame(target) {
  rngeesus = rng(100);
  console.log("RNG: " + rngeesus);
  if (rngeesus >= 90) {
    const getFish = fish_list[Math.floor(Math.random() * fish_list.length) + 1];
    client.say(target, `You caught a ${getFish}, congrats! FurinaClap`);
  } else {
    client.say(target, `No fish FurinaLaughingAtYou`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
