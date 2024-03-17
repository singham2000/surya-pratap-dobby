const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const dotenv = require("dotenv");
const { token } = require("morgan");
dotenv.config();
exports.auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).send({
        error: {
          message: `Unauthorized.Please Send token in request header`,
        },
      });
    }

    const { userId } = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET,
    );

    req.userId = userId;

    const userValid = await userModel.find({ _id: userId });

    if (!userValid) {
      return res
        .status(401)
        .send({ error: { message: `Unauthorized user not valid` } });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      error: { message: `Unauthorized server error ${(error, token)}` },
    });
  }
};
