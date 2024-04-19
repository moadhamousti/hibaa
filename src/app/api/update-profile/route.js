import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken'; 

export const put = async function handler(req, res) {
    if (req.method !== 'PUT') {
      return res.status(405).end(); // Allow only PUT requests
    }
  
    try {
      // Extract data from request body and JWT
      const { name, username, image } = req.body;
      const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header
  
      if (!token) {
        return res.status(401).json({ message: 'Missing authorization token' });
      }
  
      const decoded = verify(token, process.env.JWT_SECRET); // Verify JWT
      const userId = decoded.userId;
  
      // Validate username (optional): Check for length, special characters, etc.
      if (username && !validateUsername(username)) {
        return res.status(400).json({ message: 'Invalid username format' });
      }
  
      // Update user profile in database (replace with your database interaction)
      const updatedUser = await db.user.update({
        where: { id: userId },
        data: { name, username, image },
      });
  
      if (!updatedUser) {
        return res.status(400).json({ message: 'Failed to update profile' });
      }
  
      // Optionally return the updated user data (if needed)
      return res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  // Optional username validation function (replace with your implementation)
  function validateUsername(username) {
    // Implement your username validation logic (e.g., length, allowed characters)
    return username.length >= 5 && /^[a-zA-Z0-9_]+$/.test(username);
  }
  