import { EMS } from "../cs2_cases/ems14.js";
import rng from "../rng/rng.js";
import { client } from "../bot.js";
import { getBalance } from "./cscase_fetch/getUserBalance.js";
import { checkUser } from "./cscase_fetch/checkUserIfExists.js";
import { registerUser } from "./cscase_fetch/registerUser.js";
import { updateBal } from "./cscase_fetch/updateBalance.js";
import { cobble } from "../cs2_cases/cobblestone.js";

export default async function openCScase(target, args, username) {
  var seed = rng(10000) + 1;

  var balnao;
  const katoprice = 12000;
  const cobbleprice = 1500;
  const isUserRegistered = await checkUser(username);
  if (isUserRegistered) {
    if (args === "kato14" || args === "ems") {
      const res = await getBalance(username);
      const moolah = parseFloat(res.data[0].current_bal);
      if (parseFloat(moolah) > katoprice) {
        if (seed <= 9600) {
          var item = EMS.blues[Math.floor(Math.random() * EMS.blues.length)];
          console.log(item);
          balnao = parseFloat(item.price) + (moolah - katoprice);
          client.say(
            target,
            `@${username}, you unboxed: ${item.team}! Price: ${item.price} Rarity: Blue || Your balance is now ${balnao} furinaSmug`
          );
          updateBal(username, balnao);
        } else if (seed > 9600 && seed <= 9910) {
          var item =
            EMS.purples[Math.floor(Math.random() * EMS.purples.length)];
          balnao = parseFloat(item.price) + (moolah - katoprice);
          client.say(
            target,
            `@${username}, you unboxed: ${item.team}! Price: ${item.price} Rarity: Purple || Your balance is now ${balnao} furinaSmug`
          );
          updateBal(username, balnao);
        } else if (seed > 9910 && seed <= 10000) {
          var item = EMS.pinks[Math.floor(Math.random() * EMS.pinks.length)];
          balnao = parseFloat(item.price) + (moolah - katoprice);
          client.say(
            target,
            `@${username}, you unboxed: ${item.team}! Price: ${item.price} Rarity: Red || Your balance is now ${balnao} furinaSmug`
          );
          updateBal(username, balnao);
        }
      } else {
        client.say(
          target,
          `Insufficient funds. Beg some funds with !case beg furinaSmug`
        );
      }
    } else if (args === "cobblestone" || args === "cobble") {
      const res = await getBalance(username);
      const moolah = parseFloat(res.data[0].current_bal);
      if (parseFloat(moolah) > cobbleprice) {
        if (seed <= 8000) {
          var item =
            cobble.grays[Math.floor(Math.random() * cobble.grays.length)];
          console.log(item);
          balnao = parseFloat(item.price) + (moolah - cobbleprice);
          client.say(
            target,
            `@${username}, you unboxed: ${item.team}! Price: ${item.price} Rarity: Gray || Your balance is now ${balnao} furinaSmug`
          );
          updateBal(username, balnao);
        } else if (seed >= 8000 && seed <= 9599) {
          var item =
            cobble.blues[Math.floor(Math.random() * cobble.blues.length)];
          console.log(item);
          balnao = parseFloat(item.price) + (moolah - cobbleprice);
          client.say(
            target,
            `@${username}, you unboxed: ${item.team}! Price: ${item.price} Rarity: Blue || Your balance is now ${balnao} furinaSmug`
          );
          updateBal(username, balnao);
        } else if (seed >= 9600 && seed <= 9919) {
          var item =
            cobble.dark_blues[
              Math.floor(Math.random() * cobble.dark_blues.length)
            ];
          console.log(item);
          balnao = parseFloat(item.price) + (moolah - cobbleprice);
          client.say(
            target,
            `@${username}, you unboxed: ${item.team}! Price: ${item.price} Rarity: Dark Blue || Your balance is now ${balnao} furinaSmug`
          );
          updateBal(username, balnao);
        } else if (seed >= 9920 && seed <= 9983) {
          var item =
            cobble.purples[Math.floor(Math.random() * cobble.purples.length)];
          console.log(item);
          balnao = parseFloat(item.price) + (moolah - cobbleprice);
          client.say(
            target,
            `@${username}, you unboxed: ${item.team}! Price: ${item.price} Rarity: Purple || Your balance is now ${balnao} furinaSmug`
          );
          updateBal(username, balnao);
        } else if (seed >= 9984 && seed <= 9996) {
          var item =
            cobble.pinks[Math.floor(Math.random() * cobble.pinks.length)];
          console.log(item);
          balnao = parseFloat(item.price) + (moolah - cobbleprice);
          client.say(
            target,
            `@${username}, you unboxed: ${item.team}! Price: ${item.price} Rarity: Pink || Your balance is now ${balnao} furinaSmug`
          );
          updateBal(username, balnao);
        } else if (seed >= 9997 && seed <= 10000) {
          var item =
            cobble.reds[Math.floor(Math.random() * cobble.reds.length)];
          console.log(item);
          balnao = parseFloat(item.price) + (moolah - cobbleprice);
          client.say(
            target,
            `@${username}, you unboxed: ${item.team}! Price: ${item.price} Rarity: Red || Your balance is now ${balnao} furinaSmug`
          );
          updateBal(username, balnao);
        }
      } else {
        client.say(
          target,
          `Insufficient funds. Beg some funds with !case beg furinaSmug`
        );
      }
    } else if (args === "odds") {
      client.say(
        target,
        `Cases: Blues: 81%, Purple: 15%, Pink: 3.1%, Red: 0.6%, Knife/Gloves: 0.3% || Sticker Capsules: Blues: 96%, Purple (Holos): 3.4%, Red: 0.6% || Souvenir Packages: Gray: 80%, Blue: 16%, Dark Blue: 3.2%, Purple: 0.64%, Pink: 0.13%, Red: 0.03%`
      );
    } else if (args === "balance") {
      const res = await getBalance(username);
      console.log(res.data);
      client.say(target, `Current balance: $${res.data[0].current_bal}`);
    } else if (args === "beg") {
      const res = await getBalance(username);
      const moolah = parseFloat(res.data[0].current_bal);
      if (moolah <= 15000) {
        client.say(
          target,
          `The Fatui handed you some sum! Your balance is now $50,000 furinaSmug`
        );
        updateBal(username, 50000);
      } else {
        client.say(target, `Your balance is still high enough PepeWeird`);
      }
    } else {
      client.say(target, `Invalid case! nah`);
    }
  } else if (args === "register") {
    if (!isUserRegistered) {
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
      return;
    }
  } else {
    client.say(
      target,
      `You are currently not registered! Type !case register to start opening cases.`
    );
  }
}
