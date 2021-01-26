import { connectToDatabase } from "../lib/database";
const User = require("../models/User");

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const db = await connectToDatabase();
    const allUsers = await User.find({});
    res.status(200).json(allUsers);
  }
};
