const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Fonction pour générer un JWT
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

// POST /api/auth/register - Inscription
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Données manquantes',
        message: 'Email, mot de passe et nom sont requis'
      });
    }

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: 'Email déjà utilisé',
        message: 'Un compte existe déjà avec cet email'
      });
    }

    // Créer l'utilisateur (le password sera haché automatiquement par le pre-save hook)
    const user = new User({ email, password, name });
    await user.save();

    // Générer le token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'Compte créé avec succès',
      user: user.toJSON(),
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    });
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({
      error: 'Erreur serveur',
      message: error.message
    });
  }
});

// POST /api/auth/login - Connexion
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Données manquantes',
        message: 'Email et mot de passe requis'
      });
    }

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: 'Identifiants invalides',
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Identifiants invalides',
        message: 'Email ou mot de passe incorrect'
      });
    }

    // Générer le token JWT
    const token = generateToken(user._id);

    res.json({
      message: 'Connexion réussie',
      user: user.toJSON(),
      token,
      expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({
      error: 'Erreur serveur',
      message: error.message
    });
  }
});

// GET /api/auth/profile - Profil utilisateur (protégé)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    res.json({
      message: 'Profil utilisateur',
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erreur serveur',
      message: error.message
    });
  }
});

// GET /api/auth/users - Liste des utilisateurs (debug)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      message: 'Liste des utilisateurs',
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erreur serveur',
      message: error.message
    });
  }
});

// ============================================
// TODO 2: Routes OAuth Google
// ============================================
// Instructions:
// 1. Créer une route GET '/google' qui :
//    - Utilise passport.authenticate('google', { ... })
//    - Configure les options :
//      * scope: ['profile', 'email']
//      * session: false (IMPORTANT : stateless JWT)
//    - Cette route redirige l'utilisateur vers Google pour authentification
//
// 2. Créer une route GET '/google/callback' qui :
//    - Utilise passport.authenticate('google', { session: false, failureRedirect: ... })
//    - Ajoute un handler (req, res) => { ... } après l'authentification
//    - Dans le handler :
//      * Récupérer l'utilisateur authentifié depuis req.user
//      * Générer un JWT avec generateToken(req.user._id)
//      * Rediriger vers le frontend : `${process.env.FRONTEND_URL}/auth/callback?token=${token}`
//      * En cas d'erreur, rediriger vers : `${process.env.FRONTEND_URL}/login?error=token_generation_failed`
//
// Documentation Passport : https://www.passportjs.org/concepts/authentication/oauth/
// =============================================================================

// TODO 2: Votre code ici


module.exports = router;
