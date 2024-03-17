const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const cors = require("cors");
const app = express();

dotenv.config({ path: "./src/config/.env" });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", methods: ["GET", "POST", "DELETE", "PUT"] }));

connectDB();
const userRoute = require("./src/routes/user");
app.use("/api/user/", userRoute);
app.listen(process.env.PORT, () => {
  console.log("Hello JS");
});
