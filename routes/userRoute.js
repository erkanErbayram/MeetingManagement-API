const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const UserController = require("../controllers/userController");

router.post("/register", auth, UserController.Register);
router.post("/login", UserController.Login);
router.post("/forgotPassword", UserController.ForgotPassword);
router.put("/changePassword", [auth], UserController.ChangePassword);
router.get("/me", auth, UserController.Me);
router.get("/", auth, UserController.AllUsers);
module.exports = router;
