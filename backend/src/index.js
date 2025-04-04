import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/Auth.js';
import { protect } from './middlewares/AuthMiddleware.js';
import { allowRoles } from './middlewares/RoleMiddleware.js';
import aiRoutes from "./routes/Ai.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(' DB Error:', err));

// Routes
app.use('/api', authRoutes);
app.use("/api/ai", aiRoutes);


// Protected route example
app.get('/api/profile', protect, (req, res) => {
  res.json({ user: req.user });
});

// Admin-only route
app.get('/api/admin-zone', protect, allowRoles('president', 'cio'), (req, res) => {
  res.json({ message: `Welcome ${req.user.username}, you have admin access.` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
