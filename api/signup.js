import { connectToDatabase } from "../lib/database";

const User = require("../models/User");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    const db = await connectToDatabase();

    const user = new User({
      username,
      email,
      password,
    });

    const newUser = await user.save();
    res.status(200).json(newUser);
  }
};
