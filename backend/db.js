const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

const connectDB = () => {
  try {
    mongoose
      .connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then((con) => {
        console.log(
          `MongoDB Database connected with HOST: ${con.connection.host}`
        );
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
