const express = require('express');
const { login, register, getLoggedInUser } = require('../controllers/auth');
const AuthRouter = express.Router();


AuthRouter.post("/register", register);
AuthRouter.post("/login", login);
AuthRouter.get("/loggedInUser", getLoggedInUser);
AuthRouter.all("*", (req, res) => {
    res.send("Nothing with that route");
});

module.exports = AuthRouter;