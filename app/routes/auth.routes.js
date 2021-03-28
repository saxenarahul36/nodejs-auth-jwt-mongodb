const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { signup, signin } = controller;
module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // route for signup creations
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    signup
  );
  // route for user signin
  app.post("/api/auth/signin", signin);
};
