const express = require('express');
const router = express.Router();
const connection = require('./db'); // Your MySQL connection file
const jwt = require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken'); // Add this line to import JsonWebTokenError

// Middleware that extracts the user ID from the token and sets the user ID
// in a variable accessible to other routes. This way, it can be used here
// in uploadPost.js without explicitly passing it in the response
const userMiddleware = (req, res, next) => {
    const token = req.headers.authorization; // Get token from header
  
    if (!token) {
      return res.status(401).json({ message: 'Missing authorization token' });
    }
  
    try {
      console.log("The token received by userMiddleware:", token);
      const decodedToken = jwt.verify(token, process.env.API_SECRET); // Decode token
      console.log('Decoded token: ', decodedToken);
      req.userId = decodedToken.id; // Store user ID in the request object
      next();
    } catch (error) {
        console.error('Token verification error: ', error);
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({ message: 'Invalid token' });
        } else if (error instanceof SyntaxError) {
          return res.status(400).json({ message: 'Invalid token format' });
        } else {
          // Handle other unexpected errors
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
    }
};
  
// Search for users
router.get('/search', userMiddleware, async (req, res) => {
  const searchTerm = req.query.q;
  const sql = 'SELECT * FROM Users WHERE username LIKE ?';
  connection.query(sql, [`%${searchTerm}%`], (err, users) => {
    if (err) {
      console.error('Database error: ', err);
      res.status(500).json({ error: 'Failed to search users' });
    } else {
      res.status(200).json(users);
    }
  });
});

// Follow users
router.post('/:userId/follow', userMiddleware, async (req, res) => {
  const followerId = req.userId;
  const followingId = req.params.userId;

  // Check if the follower is trying to follow themselves
  if (followerId === followingId) {
    return res.status(400).json({ error: 'Cannot follow yourself' });
  }

  // Check if the follower is already following the user
  const checkSql = 'SELECT * FROM UserFollowers WHERE followerId = ? AND followingId = ?';
  connection.query(checkSql, [followerId, followingId], (err, result) => {
    if (err) {
      console.error('Database error: ', err);
      res.status(500).json({ error: 'Failed to check follow relationship' });
    } else if (result.length > 0) {
      // The follower is already following the user
      return res.status(400).json({ error: 'Already following this user' });
    } else {
      // Create a new follow relationship
      const sql = 'INSERT INTO UserFollowers (followerId, followingId) VALUES (?, ?)';
      connection.query(sql, [followerId, followingId], (err, result) => {
        if (err) {
          console.error('Database error: ', err);
          res.status(500).json({ error: 'Failed to follow user' });
        } else {
          res.status(200).json({ message: 'Successfully followed user' });
        }
      });
    }
  });
});

// Unfollow
router.delete('/:userId/unfollow', userMiddleware, async (req, res) => {
  const followerId = req.userId;
  const followingId = req.params.userId;

  // Check if the follower is trying to unfollow themselves
  if (followerId === followingId) {
    return res.status(400).json({ error: 'Cannot unfollow yourself' });
  }

  // Delete the follow relationship
  const sql = 'DELETE FROM UserFollowers WHERE followerId = ? AND followingId = ?';
  connection.query(sql, [followerId, followingId], (err, result) => {
    if (err) {
      console.error('Database error: ', err);
      res.status(500).json({ error: 'Failed to unfollow user' });
    } else if (result.affectedRows === 0) {
      // No relationship found to delete
      return res.status(404).json({ error: 'No relationship found to unfollow' });
    } else {
      res.status(200).json({ message: 'Successfully unfollowed user' });
    }
  });
});

// (ADD THE DIFFERENT REQUESTS TO THE SERVER TO THE BOTTOM)

module.exports = router;