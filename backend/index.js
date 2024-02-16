// Express setup
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./userRegistration");
const UserData = require("./UserData/UserDataSchema");

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

const jwt_secret = "your_jwt_secret";

// User registration route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const encryptPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).send({ error: "User already exists" });
    }
    await User.create({
      name,
      email,
      password: encryptPassword,
    });
    res.send({ status: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// User login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ email: user.email }, jwt_secret);
      return res.status(200).send({ token });
    } else {
      return res.status(401).send({ error: "Invalid password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// Middleware to authenticate requests using JWT token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send({ error: "Unauthorized" });

  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) return res.status(403).send({ error: "Forbidden" });
    req.user = user;
    next();
  });
}

// User activity tracking route
// app.post("/track", authenticateToken, async (req, res) => {
//   // Extract user activity data from request body
//   const userData = req.body;

//   try {
//     await UserData.create(userData);
//     res.status(201).send({ status: "User activity tracked successfully" });
//   } catch (error) {
//     console.error("Error tracking user activity:", error);
//     res.status(500).send({ error: "Internal server error" });
//   }
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
