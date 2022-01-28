module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || "shh, it is a secret",
  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 8,
};
