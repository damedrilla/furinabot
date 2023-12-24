import fishGame from "./features/fishgame";
import openCScase from "./features/openCScase";
import rng from "./rng/rng";
import getSong from "./features/getSong";

export default async function onMessageHandler(target, context, msg, self) {
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