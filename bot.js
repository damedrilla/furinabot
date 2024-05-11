import "dotenv/config";
import tmi from "tmi.js";
import getAccessToken from "./features/getaccesstoken.js";
import onMessageHandler from "./messagehandler.js";

const {
  SPOTIFY_CLIENT_ID: sclient_id,
  SPOTIFY_CLIENT_SECRET: sclient_secret,
  SPOTIFY_REFRESH_TOKEN: srefresh_token,
  JAM_REFRESH_TOKEN: jam_refresh_token,
  USER_NAME: uname,
  ACCESS_TOKEN: token,
  REFRESH_TOKEN: refresh_token,
  CLIENT_ID: id,
  CLIENT_SECRET: secret,
} = process.env;
export const opts = {
  identity: {
    username: uname,
    password: getAccessToken(id, secret, refresh_token),
  },
  channels: ["jahmsd", "sveltebs"],
};

export const client = new tmi.client(opts);

client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

client.connect();

async function getDotaPlayer(args) {
  return await fetch(`https://api.opendota.com/api/players/${args}`, {
    method: "GET",
  })
    .then((results) => {
      console.log(results.json());
    })
    .then((results) => {
      console.log(results);
    });
}
function fishGame(target) {
  var rngeesus = rng(100);
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
