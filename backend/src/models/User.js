import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Admin Role & Team Pole
    role: {
      type: String,
      enum: [
        'president',
        'vice-president',
        'secretaire-general',
        'tresorier',
        'cio',
        'resp-com',
        'resp-dev',
        'resp-compta'
      ],
      required: true
    },

    pole: {
      type: String,
      enum: [
        'dev',
        'design',
        'com',
        'compta',
        'rh',
        'juridique',
        'partenariat',
        'strategie'
      ],
      required: true
    },

    // Personal Info (for profile directory)
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' }, // URL to image
    phone: { type: String, default: '' },
    linkedin: { type: String, default: '' },

    // Mandate Tracking
    mandate: {
      start: { type: Date },
      end: { type: Date }
    },

    // Account Status
    isActive: { type: Boolean, default: true },

    // Gamification (future)
    points: { type: Number, default: 0 },
    badges: [{ type: String }], // example: ["team-player", "early-bird"]

    // Activity Tracking
    lastLogin: { type: Date },
    streak: { type: Number, default: 0 },

    // Who created this account
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed one
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
