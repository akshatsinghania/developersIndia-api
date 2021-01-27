import { connectToDatabase } from "../lib/database";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const db = await connectToDatabase();
    User.findOne({ email: email }, async (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (user) {
          const validPass = await bcrypt.compare(password, user.password);

          if (!validPass)
            return res.status(401).send("Username/Email or Password is wrong");
          console.log(user);
          // Create and assign token
          const payload = { id: user._id };
          const token = jwt.sign(payload, process.env.SEED_KEY, {
            expiresIn: "1h",
          });
          // res.setHeader("auth-token", token);  //should I return the auth token as a header too?
          res.status(200).send({ token: token });
        } else {
          res.status(401).send("Invalid email");
        }
      }
    });
  }
};
