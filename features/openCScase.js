import { EMS } from "../cs2_cases/ems14.js";
import rng from "../rng/rng.js";
import { client } from "../bot.js";
import { getBalance } from "./cscase_fetch/getUserBalance.js";
import { checkUser } from "./cscase_fetch/checkUserIfExists.js";
import { registerUser } from "./cscase_fetch/registerUser.js";
import { updateBal } from "./cscase_fetch/updateBalance.js";

export default async function openCScase(target, args, username) {
  var seed = rng(1000);
  
  var balnao;
  const katoprice = 12000;
  const isUserRegistered = await checkUser(username);
  if (isUserRegistered) {
    if (args === "kato14" || args === "ems") {
      const res = await getBalance(username);
      const moolah = parseFloat(res.data[0].current_bal);
      if (parseFloat(moolah) > katoprice) {
        if (seed <= 960) {
          var item = EMS.blues[Math.floor(Math.random() * EMS.blues.length)];
          console.log(item);
          balnao = parseFloat(item.price) + (moolah - katoprice);
          client.say(
            target,
            `@${username}, You unboxed ${item.team}! Price: ${item.price} Rarity: Blue || Your balance is now ${balnao}`
          );
          updateBal(username, balnao);
        } else if (seed > 960 && seed <= 991) {
          var item = EMS.purples[Math.floor(Math.random() * EMS.purples.length)];
          balnao = parseFloat(item.price) + (moolah - katoprice);
          client.say(
            target,
            `@${username}, You unboxed ${item.team}! Price: ${item.price} Rarity: Purple || Your balance is now ${balnao}`
          );
          updateBal(username, balnao);
        } else if (seed > 991 && seed <= 1000) {
          var item = EMS.pinks[Math.floor(Math.random() * EMS.pinks.length)];
          balnao = parseFloat(item.price) + (moolah - katoprice);
          client.say(
            target,
            `@${username}, You unboxed ${item.team}! Price: ${item.price} Rarity: Red || Your balance is now ${balnao}`
          );
          updateBal(username, balnao);
        }
      } else {
        client.say(target, `Insufficient funds. Return again soon!`);
      }
    } else if (args === "cobblestone" || args === "cobble") {
      if (seed <= 810) {
        var item = EMS.blues[Math.floor(Math.random() * EMS.blues.length)];
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
    } else if (args === "balance") {
      const res = await getBalance(username);
      console.log(res.data);
      client.say(target, `Current balance: $${res.data[0].current_bal}`);
    } else if (args === "beg") {
      client.say(target, `The Fatui handed you some sum! Your balance is now $50,000.`);
      updateBal(username, 50000);
    } else {
      client.say(target, `Invalid case!`);
    }
  } else if (args === "register") {
    const res = await registerUser(username);
    console.log(res);
    if (res.message === "User registered successfully") {
      client.say(target, `@${username} is now registered. Enjoy! furinaSmug`);
    } else {
      client.say(
        target,
        `Oops, there's an error on our database. Spam tag @sveltebs to fix it xdd`
      );
    }
  } else {
    client.say(
      target,
      `You are currently not registered! Type !case register to start opening cases.`
    );
  }
}
