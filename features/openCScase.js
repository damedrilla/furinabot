import { EMS } from "../cs2_cases/ems14";
import rng from "../rng/rng";

export default function openCScase(target, args, username) {
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