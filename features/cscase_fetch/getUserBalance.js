export const getBalance = async (user) => {
  const response = await fetch(
    `http://192.168.1.100:322/users/balance/${user}`,
    {
      method: "GET",
    }
  );
  return response.json();
};
