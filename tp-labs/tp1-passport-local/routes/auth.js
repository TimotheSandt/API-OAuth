// Routes d'authentification
// À COMPLÉTER PAR L'ÉTUDIANT

const express = require('express');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// ============================================
// Route d'inscription (FOURNIE)
// ============================================
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et password requis' });
    }

    const user = await User.create(email, password);
    res.status(201).json({ message: 'Utilisateur créé', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ============================================
// TODO 6 : Route de connexion avec Passport
// ============================================
// POST /auth/login
// Body: { email, password }
//
// Cette route doit :
// 1. Utiliser passport.authenticate('local') pour vérifier les credentials
// 2. Retourner un message de succès avec les infos utilisateur
//
// Référence : Voir slide "🔐 passport-local : Utilisation"
router.post('/login', (req, res, next) => {
  // TODO: Implémenter le login avec Passport
  // Utilisez passport.authenticate('local', { session: false }, callback)
  //
  // Le callback reçoit (err, user, info)
  // - Si err ou !user : retourner erreur
  // - Sinon : retourner succès avec user.toJSON()
  //
  // Exemple de structure :
  // passport.authenticate('local', { session: false }, (err, user, info) => {
  //   if (err || !user) { return res.status(401).json(...) }
  //   return res.json({ message: 'Connexion réussie', user: user.toJSON() });
  // })(req, res, next);

  res.status(500).json({ error: 'Route /login à compléter' });
});

// ============================================
// Middleware de protection de route (FOURNI)
// ============================================
function requireAuth(req, res, next) {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ error: 'Header x-user-id requis' });
  }

  const allUsers = User.getAll();
  const user = allUsers.find(u => u.id === parseInt(userId));

  if (!user) {
    return res.status(401).json({ error: 'Utilisateur non trouvé' });
  }

  req.user = user;
  next();
}

// ============================================
// Route protégée (FOURNIE)
// ============================================
router.get('/profile', requireAuth, (req, res) => {
  res.json({ message: 'Profil utilisateur', user: req.user });
});

// ============================================
// Route de debug (FOURNIE)
// ============================================
router.get('/users', (req, res) => {
  res.json({
    message: 'Liste des utilisateurs (debug)',
    users: User.getAll()
  });
});

module.exports = router;
