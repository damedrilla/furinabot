import {opts} from "./bot.js";
const refreshtoken = async (id, secret, token) => {
  return await fetch(`https://id.twitch.tv/oauth2/token`, {
    body: `grant_type=refresh_token&refresh_token=${token}&client_id=${id}&client_secret=${secret}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });
};
export default async function getAccessToken(
  client_id,
  client_secret,
  refresh_token
) {
  var id = client_id;
  var secret = client_secret;
  var token = refresh_token;
  try {
    const response = await refreshtoken(
      client_id,
      client_secret,
      refresh_token
    );
    const data = await response.json();
    console.log(data);
    return data.access_token;
  } catch (err) {
    console.log("Retrying access token fetch...");
    getAccessToken(id, secret, token);
  }
}
