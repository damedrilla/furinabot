const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: "",
      user: "root",
      password: "",
      database: "furinabot_cs2",
      connectTimeout: 60000
    },
    listPerPage: 100,
  };
  module.exports = config;