export const getRecentCommit = async () => {
  const response = await fetch(
    `https://api.github.com/repos/dota1g/furinabot/commits/main`,
    {
      method: "GET",
    }
  );
  return response.json();
};
