const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
};

module.exports = generateToken;
