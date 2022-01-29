const db = require("../../data/dbConfig");

async function find() {
  const rows = await db("users");
  return rows;
}

async function findBy(filter) {
  const rows = await db("users").where(filter);
  return rows;
}

async function findById(id) {
  const rows = await db("users").where("id", id).first();
  return rows;
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

module.exports = {
  find,
  findBy,
  findById,
  add,
};
