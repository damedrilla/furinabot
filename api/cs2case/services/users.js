import { query } from "./db";
import { getOffset, emptyOrRows } from "../helper";
import { listPerPage } from "../config";

async function getMultiple(page = 1) {
  const offset = getOffset(page, listPerPage);
  const rows = await query(
    `SELECT *
    FROM users LIMIT ${offset},${listPerPage}`
  );
  const data = emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(userName) {
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
export default {
  getMultiple,
  create,
};
