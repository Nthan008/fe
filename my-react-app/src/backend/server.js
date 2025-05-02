import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key"; // Replace with a secure key

app.use(cors());
app.use(bodyParser.json());

// Mock user data (you can replace this with a database later)
const users = [];

// Register route
app.post("/register", (req, res) => {
  const { idCard, name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Add the new user to the mock database
  users.push({ idCard, name, email, password });
  res.status(201).json({ message: "User registered successfully" });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // Generate a JWT token
    const token = jwt.sign({ email: user.email, name: user.name }, SECRET_KEY, {
      expiresIn: "1h", // Token expires in 1 hour
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

// Protected route
app.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verify the token
    res.json({ message: "Profile data", user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));