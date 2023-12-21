require("dotenv").config();
const uname = process.env.USER_NAME;
const token = process.env.ACCESS_TOKEN;
const tmi = require("tmi.js");

const opts = {
  identity: {
    username: uname,
    password: token,
  },
  channels: ["jahmsd", "sveltebs"],
};

const client = new tmi.client(opts);

client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

client.connect();
async function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  }
  const commandName = msg.trim();;
  console.log(commandName);
  if (commandName === "!dice" || commandName === "!dice 󠀀") {
    client.ping();
    const num = rollDice();
    await client.say(target, `You rolled a ${num} furinaSmug`);
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "!fish" || commandName === "!fish 󠀀") {
    fishGame(target);
  } else if (commandName === "hi") {
    client.say(target, `freen`);
  } else if (commandName === "buh") {
    client.say(target, `buh`);
  } else {
    client.say(`* Unknown command ${commandName}`);
  }
}

function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

function rng() {
  const sides = 100;
  return Math.floor(Math.random() * sides) + 1;
}

function fishGame(target) {
  const fish_list = [
    "Anchovy",
    "Bass (black)",
    "Bass (striped)",
    "Bluefish",
    "Buffalo Fish",
    "Butterfish",
    "Calamari (Squid)",
    "Carp",
    "Catfish (farm-raised)",
    "Chilean sea bass",
    "Clam",
    "Cod",
    "Crab (Blue, King and Snow)",
    "Crayfish (Crawfish)",
    "Croaker (Atlantic)",
    "Flounder",
    "Golden Snapper",
    "Grouper",
    "Haddock",
    "Hake",
    "Halibut",
    "Herring",
    "Jack (Amber, Crevalle)",
    "Jacksmelt",
    "King Mackerel",
    "Lobster (northern, Maine, American)",
    "Lobster (spiny)",
    "Mackerel (Atlantic, jack, chub)",
    "Mahi Mahi (Dolphin-fish)",
    "Marlin",
    "Mullet",
    "Orange Roughy",
    "Oysters (cooked)",
    "Perch (Freshwater)",
    "Perch (Ocean)",
    "Pickerel",
    "Plaice",
    "Pollock",
    "Pompano (Florida)",
    "Rainbow Trout (farm-raised)",
    "Sablefish",
    "Salmon (wild or farm-raised)",
    "Sardine",
    "Scallop",
    "Scorpion Fish",
    "Sea Trout",
    "Shad (American)",
    "Shark",
    "Shrimp",
    "Snapper",
    "Sole",
    "Spanish Mackerel (Gulf of Mexico)",
    "Spanish Mackerel (South Atlantic)",
    "Squid (Calamari)",
    "Swordfish",
    "Tilapia",
    "Tilefish (Atlantic)",
    "Tilefish (Gulf of Mexico)",
    "Tuna",
    "Walleye (Great Lakes, Canada)",
    "Weakfish",
    "White Croaker (Pacific)",
    "Whitefish",
    "Whiting",
  ];
  rngeesus = rng();
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
