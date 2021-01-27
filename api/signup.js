import { connectToDatabase } from "../lib/database";
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const db = await connectToDatabase();

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(req.body.password, salt);

    // Create a user object
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hasPassword,
    });

    // Save User in the database
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(registeredUser);
      }
    });
  }
};
