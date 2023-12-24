import "dotenv/config";
import getNowPlayingItem from "./api/spotify.js";
import tmi from "tmi.js";
import getAccessToken from "./getaccesstoken.js";
import { EMS } from "./cs2_cases/ems14.js";

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

const client = new tmi.client(opts);
var enabled = true;
var devonly = false;

client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

client.connect();
async function onMessageHandler(target, context, msg, self) {
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
    if (!devonly || ctx.username === "sveltebs") {
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
      } else if (
        actualCommand === "!dotaprofile" ||
        actualCommand === "!dotaprofile 󠀀"
      ) {
        if (args === "" || args === undefined) {
          const num = rng(100);
          client.say(target, `RNG (1-100): ${num}`);
        } else {
          await getDotaPlayer(args).then((result) => {
            //the promise is resolved here
            console.log(result);
          });
        }
      } else if (actualCommand === "!fish" || actualCommand === "!fish 󠀀") {
        fishGame(target);
      } else if (actualCommand === "hi") {
        client.say(target, `freen`);
      } else if (actualCommand === "!open") {
        if (args === "nothing") {
          client.say(
            target,
            `Must select a case! (EMS (kato14, ems), gamma, cobblestone`
          );
        } else {
          openCScase(target, args);
        }
      } else if (actualCommand === "buh") {
        client.say(target, `buh`);
      } else if (actualCommand === "!case") {
        if (args === "nothing") {
          client.say(
            target,
            `Must select a case! (EMS (kato14, ems), gamma, cobblestone`
          );
        } else {
          client.say(target, `Opening case...`);
          setTimeout(function () {
            openCScase(target, args, ctx.username);
          }, 3000);
        }
      } else if (
        actualCommand === "!songname" ||
        actualCommand === "!songname 󠀀"
      ) {
        getSong(target);
      } else if (
        actualCommand === "!disable" ||
        actualCommand === "!disable 󠀀"
      ) {
        if (ctx.badges.broadcaster === "1" || ctx.badges.vip === "1") {
          enabled = false;
          client.say(target, `Bye!`);
        } else {
          return;
        }
      } else if (
        actualCommand === "!toggledev" ||
        actualCommand === "!toggledev 󠀀"
      ) {
        if (ctx.badges.broadcaster === "1" || ctx.badges.vip === "1") {
          devonly = true;
          client.say(target, `Dev only mode enabled! furinaSmug`);
        } else {
          return;
        }
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
function openCScase(target, args, username) {
  var seed = rng(1000);
  var item;
  if (args === "kato14" || args === "ems") {
    if (seed <= 960) {
      item = EMS.blues[Math.floor(Math.random() * EMS.blues.length) + 1];
      console.log(item.team + " " + item);
      client.say(
        target,
        `@${username}, You unboxed ${item.team}! Price: ${item.price} Rarity: Blue`
      );
    } else if (seed > 960 && seed <= 991) {
      item = EMS.purples[Math.floor(Math.random() * EMS.purples.length) + 1];
      console.log(item.team + " " + item);
      client.say(
        target,
        `You unboxed ${item.team}! Price: ${item.price} Rarity: Purple`
      );
    } else if (seed > 991 && seed <= 1000) {
      item = EMS.pinks[Math.floor(Math.random() * EMS.pinks.length) + 1];
      console.log(item.team + " " + item);
      client.say(
        target,
        `You unboxed ${item.team}! Price: ${item.price} Rarity: Purple`
      );
    }
  } else if (args === "cobblestone" || args === "cobble") {
    if (seed <= 810) {
      item = EMS.blues[Math.floor(Math.random() * EMS.blues.length) + 1];
      console.log(item.team + " " + item);
      client.say(
        target,
        `You unboxed ${item.team}! Price: ${item.price} (Seed: ${seed})`
      );
    } else if (seed > 810 && seed <= 960) {
      client.say(target, `Purple (Seed: ${seed})`);
    } else if (seed > 960 && seed <= 991) {
      client.say(target, `Holo (Seed: ${seed})`);
    } else if (seed > 991 && seed <= 1000) {
      client.say(target, `Red (Seed: ${seed})`);
    }
  } else if (args === "odds") {
    client.say(
      target,
      `Cases: Blues: 81%, Purple: 15%, Pink: 3.1%, Red: 0.6%, Knife/Gloves: 0.3% || Sticker Capsules: Blues: 96%, Purple (Holos): 3.4%, Red: 0.6% `
    );
  } else {
    client.say(target, `Invalid case!`);
  }
}
function rng(high) {
  const sides = high;
  return Math.floor(Math.random() * sides) + 1;
}
function getSong(target) {
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
