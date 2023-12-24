export const updateBal = async (username, newBal) => {
  let formBody = new FormData();
  const response = await fetch(`http://192.168.1.100:322/users`, {
    method: "PUT",
    body: JSON.stringify({ user: username, bal: newBal }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response.json();
};
