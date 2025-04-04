import express from 'express';
import jwt from 'jsonwebtoken';
import { protect } from '../middlewares/AuthMiddleware.js';
import { allowRoles } from '../middlewares/RoleMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

router.post('/users', protect, allowRoles(
    'president',
    'vice-president',
    'secretaire-general',
    'tresorier',
    'cio'
  ), async (req, res) => {
    const { username, email, password, role, pole } = req.body;
    try {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ error: 'Email already in use' });
      const user = await User.create({ username, email, password, role, pole });
      res.status(201).json({ user });
    } catch (err) {
      res.status(500).json({ error: 'User creation failed', details: err.message });
    }
  });

  router.get('/users', protect, allowRoles(
    'president',
    'vice-president',
    'secretaire-general',
    'tresorier',
    'cio'
  ), async (req, res) => {
    try {
      const users = await User.find().select("-password"); // don't expose passwords
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  router.delete('/users/:id', protect, allowRoles(
    'president',
    'vice-president',
    'secretaire-general',
    'tresorier',
    'cio'
  ), async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete user', details: err.message });
    }
  });

router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// PUT /api/profile - update own editable fields
router.put('/profile', protect, async (req, res) => {
  try {
    const updates = {
      bio: req.body.bio,
      avatar: req.body.avatar,
      phone: req.body.phone,
      linkedin: req.body.linkedin
    };
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true
    }).select('-password');
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});


// create admin route

//router.post('/create-admin', async (req, res) => {
//    try {
//      const userExists = await User.findOne({ email: 'admin@synerghetic.com' });
//      if (userExists) return res.status(400).json({ error: 'Admin already exists' });
//      const admin = await User.create({
//        username: 'admin',
//        email: 'admin@synerghetic.com',
//        password: 'admin1234', // Will be hashed via pre-save hook
//        role: 'cio',
//        pole: 'dev',
//      });
//      res.status(201).json({ message: 'Admin created', user: admin });
//    } catch (err) {
//      res.status(500).json({ error: err.message });
//    }
//  });

export default router;
