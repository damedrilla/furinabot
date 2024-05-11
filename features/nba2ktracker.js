const nba2ktracker = async () => {
    const response = await fetch(
      `http://firefly.psl.sat:322/score`,
      {
        method: "GET",
      }
    );
    return response.json();
};

export default nba2ktracker;
