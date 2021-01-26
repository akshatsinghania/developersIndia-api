const mongoose = require("mongoose");
let connection  = null;

export const connectToDatabase = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection = mongoose.connection;
  connection.on("error", console.error.bind(console, "connection error:"));
  connection.once("open", function () {
    console.log("New db connection");
  });

  return connection;
};
