const jwt = require("jsonwebtoken");

const { TOKEN_SECRET } = require("../../config/index");

function createToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, TOKEN_SECRET, options);
}

module.exports = {
  createToken,
};
