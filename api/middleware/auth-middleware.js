const { findBy } = require("../users/users-model");

function checkPayload(req, res, next) {
  if (
    !req.body.username ||
    !req.body.username.trim() ||
    !req.body.password ||
    !req.body.password.trim()
  ) {
    next({ status: 422, message: "username and password required" });
  } else {
    next();
  }
}

async function checkUsernameFree(req, res, next) {
  try {
    const users = await findBy({ username: req.body.username });
    if (!users.length) {
      next();
    } else
      next({
        status: 422,
        message: "username taken",
      });
  } catch (err) {
    next(err);
  }
}

async function checkUsernameExists(req, res, next) {
  try {
    const users = await findBy({ username: req.body.username });
    if (users.length) {
      req.user = users[0];
      next();
    } else
      next({
        status: 401,
        message: "invalid credentials",
      });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkPayload,
  checkUsernameFree,
  checkUsernameExists,
};
