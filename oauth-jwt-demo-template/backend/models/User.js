const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email requis'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Email invalide']
  },
  password: {
    type: String,
    required: function() {
      // Password requis seulement si pas d'authentification Google
      return !this.googleId;
    },
    minlength: [6, 'Mot de passe trop court (min 6 caractères)']
  },
  name: {
    type: String,
    required: [true, 'Nom requis'],
    trim: true
  },
  // Champs pour OAuth Google
  googleId: {
    type: String,
    unique: true,
    sparse: true // Permet null/undefined
  },
  picture: {
    type: String
  },
  provider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hacher le mot de passe avant sauvegarde
userSchema.pre('save', async function(next) {
  // Ne hacher que si le mot de passe existe et est modifié
  if (!this.password || !this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour retourner l'objet sans le password
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

// ============================================
// Fonctions Helper pour Google OAuth
// ============================================

// Trouver un utilisateur par son Google ID
async function findUserByGoogleId(db, googleId) {
  const User = mongoose.model('User');
  return await User.findOne({ googleId });
}

// Créer un utilisateur depuis Google OAuth
async function createUserFromGoogle(db, { googleId, email, name, picture }) {
  const User = mongoose.model('User');

  const user = new User({
    googleId,
    email,
    name,
    picture,
    provider: 'google',
    // Pas de password car authentification via Google
  });

  await user.save();
  return user;
}

module.exports = mongoose.model('User', userSchema);
module.exports.findUserByGoogleId = findUserByGoogleId;
module.exports.createUserFromGoogle = createUserFromGoogle;
