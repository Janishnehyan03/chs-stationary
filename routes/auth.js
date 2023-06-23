const authController = require("../controllers/authController.js");

const router = require("express").Router();
// refresh token
router.post("/check-loggedIn", authController.checkLoggedIn);

// register
router.post("/register", authController.register);

// login
router.post("/login", authController.login);
// logout
router.post("/logout", authController.logout);
// isLoggedIn
router.get("/getUser", authController.getUser);

module.exports = router;
