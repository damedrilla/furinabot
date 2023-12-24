const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM inventory LIMIT 10,${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(itemName, username) {
  const id = await db.query(
    `SELECT userID from users where username = '${username}'`
  );
  const result = await db.query(
    `INSERT INTO users 
        (users) 
        VALUES 
        ('${userName}')`
  );

  let message = "Error creating user";

  if (result.affectedRows) {
    message = "Sucessfully registered!";
  }

  return { message };
}

module.exports = {
  getMultiple,
};
