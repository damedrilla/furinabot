export const registerUser = async (username) => {
  let formBody = new FormData();
  const response = await fetch(`http://192.168.1.100:322/users`, {
    method: "POST",
    body: JSON.stringify({ user: username }),
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
