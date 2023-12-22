require("dotenv").config();
import { fish_list, animals } from "./data";
const uname = process.env.USER_NAME;
const token = process.env.ACCESS_TOKEN;
const refresh_token = process.env.REFRESH_TOKEN;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const tmi = require("tmi.js");

const opts = {
  identity: {
    username: uname,
    password: token,
  },
  channels: ["jahmsd", "sveltebs"],
};
// function refreshToken() {
//   fetch("https://id.twitch.tv/oauth2/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: `grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${client_id}&client_secret=${client_secret}`,
//   }).then((response) => console.log(JSON.stringify(response.json)));
// }

const client = new tmi.client(opts);
var enabled = true;
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
  const commandName = msg.trim();
  console.log(commandName);
  if (enabled) {
    if (commandName === "!dice" || commandName === "!dice 󠀀") {
      client.ping();
      const num = rng(6);
      await client.say(target, `You rolled a ${num} furinaSmug`);
      console.log(`* Executed ${commandName} command`);
    } else if (commandName === "!fish" || commandName === "!fish 󠀀") {
      fishGame(target);
    } else if (commandName === "hi") {
      client.say(target, `freen`);
    } else if (commandName === "buh") {
      client.say(target, `buh`);
    } else if (commandName === "!disable" || commandName === "!disable 󠀀") {
      if (ctx.badges.broadcaster === "1" || ctx.badges.vip === "1") {
        enabled = false;
        client.say(target, `Bye!`);
      } else {
        return;
      }
    } else {
      client.say(`* Unknown command ${commandName}`);
    }
  } else {
    if (commandName === "!enable" || commandName === "!enable 󠀀") {
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
