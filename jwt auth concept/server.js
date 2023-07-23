const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'; 
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  // Add more users as needed
];

app.use(express.json());

// Signup endpoint
app.post('/signup', (req, res) => {
  // Extract the signup data from the request body
  const { username, password } = req.body;

  // Perform server-side validation (e.g., check for existing users, password strength, etc.)

  // Create the new user account (in production, hash the password before saving it)
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);

  res.status(200).json({ message: 'User registered successfully!' });
});

// Login endpoint
app.post('/login', (req, res) => {
  // Extract the login data from the request body
  const { username, password } = req.body;

  // Find the user with the given username (in production, query the database)
  const user = users.find((u) => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate and send the JWT token (in production, use a longer expiration time)
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  res.status(200).json({ token });
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Protected data accessed successfully!' });
});

// Middleware to verify the JWT token
function authenticateToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
