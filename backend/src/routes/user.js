const express = require("express");
const { auth } = require("../middlewares/auth");

const {
  register,
  login,
  uploadedFile,
} = require("../controller/userController");

const router = express.Router();

router.post("/signup", register);
router.post("/signin", login);
router.post("/upload", auth, uploadedFile);

module.exports = router;
