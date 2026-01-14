// Routes d'authentification JWT
// À COMPLÉTER PAR L'ÉTUDIANT

const express = require('express');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  decodeToken
} = require('../utils/jwt');
const { authenticateToken } = require('../middleware/auth');

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
// TODO 10 : Route de connexion (Login)
// ============================================
// POST /auth/login
// Body: { email, password }
//
// Cette route doit :
// 1. Vérifier les credentials (User.findByEmail + comparePassword)
// 2. Générer un Access Token (15 min) avec generateAccessToken()
// 3. Générer un Refresh Token (7 jours) avec generateRefreshToken()
// 4. Stocker le Refresh Token en DB avec RefreshToken.store()
// 5. Retourner les deux tokens au client
//
// Référence : Slide "🔄 Implémentation : Refresh Token (1/2)"
router.post('/login', async (req, res) => {
  try {
    // TODO: Implémenter le login complet

    // Étape 1: Extraire et valider les credentials
    // const { email, password } = req.body;
    // if (!email || !password) { ... }

    // Étape 2: Trouver l'utilisateur
    // const user = await User.findByEmail(email);
    // if (!user) { return res.status(401).json(...) }

    // Étape 3: Vérifier le mot de passe
    // const isValid = await user.comparePassword(password);
    // if (!isValid) { return res.status(401).json(...) }

    // Étape 4: Générer les tokens
    // const accessToken = generateAccessToken(user.id, user.email);
    // const refreshToken = generateRefreshToken(user.id);

    // Étape 5: Stocker le Refresh Token
    // await RefreshToken.store(user.id, refreshToken);

    // Étape 6: Retourner les tokens
    // res.json({
    //   message: 'Connexion réussie',
    //   accessToken,
    //   refreshToken,
    //   expiresIn: '15 minutes'
    // });

    res.status(500).json({ error: 'Route /login à compléter' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// TODO 11 : Route de rafraîchissement (Refresh)
// ============================================
// POST /auth/refresh
// Body: { refreshToken }
//
// Cette route doit :
// 1. Vérifier que le refresh token est fourni
// 2. Vérifier sa signature avec verifyRefreshToken()
// 3. Vérifier qu'il existe en DB avec RefreshToken.findByToken()
// 4. Générer un nouveau Access Token
// 5. Retourner le nouveau Access Token
//
// Référence : Slide "🔄 Implémentation : Refresh Token (2/2)"
router.post('/refresh', async (req, res) => {
  try {
    // TODO: Implémenter le rafraîchissement

    // Étape 1: Extraire le refresh token
    // const { refreshToken } = req.body;
    // if (!refreshToken) { return res.status(401).json(...) }

    // Étape 2: Vérifier la signature du refresh token
    // let decoded;
    // try {
    //   decoded = verifyRefreshToken(refreshToken);
    // } catch (err) {
    //   if (err.name === 'TokenExpiredError') {
    //     return res.status(403).json({ error: 'Refresh token expiré' });
    //   }
    //   return res.status(403).json({ error: 'Refresh token invalide' });
    // }

    // Étape 3: Vérifier qu'il existe en DB (pas révoqué)
    // const storedToken = await RefreshToken.findByToken(refreshToken);
    // if (!storedToken) {
    //   return res.status(403).json({ error: 'Refresh token révoqué ou invalide' });
    // }

    // Étape 4: Récupérer l'utilisateur
    // const user = await User.findById(decoded.userId);
    // if (!user) {
    //   return res.status(404).json({ error: 'Utilisateur non trouvé' });
    // }

    // Étape 5: Générer un nouveau Access Token
    // const newAccessToken = generateAccessToken(user.id, user.email);

    // Étape 6: Retourner le nouveau token
    // res.json({
    //   message: 'Access Token rafraîchi',
    //   accessToken: newAccessToken,
    //   expiresIn: '15 minutes'
    // });

    res.status(500).json({ error: 'Route /refresh à compléter' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// TODO 12 : Route de déconnexion (Logout)
// ============================================
// POST /auth/logout
// Body: { refreshToken }
//
// Cette route doit :
// 1. Vérifier que le refresh token est fourni
// 2. Révoquer le token avec RefreshToken.revoke()
// 3. Retourner un message de succès
//
// Référence : Slide "🚫 Révocation des Tokens"
router.post('/logout', async (req, res) => {
  try {
    // TODO: Implémenter la déconnexion

    // Étape 1: Extraire le refresh token
    // const { refreshToken } = req.body;
    // if (!refreshToken) {
    //   return res.status(400).json({ error: 'Refresh token requis' });
    // }

    // Étape 2: Révoquer le token
    // const revoked = await RefreshToken.revoke(refreshToken);

    // Étape 3: Retourner le résultat
    // if (revoked) {
    //   res.json({ message: 'Déconnexion réussie' });
    // } else {
    //   res.status(404).json({ error: 'Token non trouvé' });
    // }

    res.status(500).json({ error: 'Route /logout à compléter' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// TODO 13 : Route protégée par JWT
// ============================================
// GET /auth/profile
// Header: Authorization: Bearer <access_token>
//
// Cette route doit :
// 1. Être protégée par le middleware authenticateToken
// 2. Retourner les infos de l'utilisateur connecté (req.user)
//
// Référence : Slide "🎯 Exemple Complet : API avec JWT"
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // TODO: Retourner le profil
    // Le middleware authenticateToken a déjà ajouté req.user
    // req.user contient : { userId, email, iat, exp }

    // Optionnel : Récupérer les infos complètes de l'utilisateur
    // const user = await User.findById(req.user.userId);

    // res.json({
    //   message: 'Profil utilisateur',
    //   user: {
    //     id: req.user.userId,
    //     email: req.user.email
    //   },
    //   tokenInfo: {
    //     issuedAt: new Date(req.user.iat * 1000),
    //     expiresAt: new Date(req.user.exp * 1000)
    //   }
    // });

    res.status(500).json({ error: 'Route /profile à compléter' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// Routes de debug (FOURNIES)
// ============================================

// Voir tous les refresh tokens actifs
router.get('/debug/tokens', (req, res) => {
  res.json({
    message: 'Refresh Tokens actifs',
    count: RefreshToken.getAll().length,
    tokens: RefreshToken.getAll()
  });
});

// Voir tous les utilisateurs
router.get('/debug/users', (req, res) => {
  res.json({
    message: 'Utilisateurs',
    users: User.getAll()
  });
});

// Décoder un token (sans vérification - debug uniquement)
router.post('/debug/decode', (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: 'Token requis' });
    }

    const decoded = decodeToken(token);
    res.json({
      message: 'Token décodé (SANS VÉRIFICATION)',
      warning: 'Ceci ne vérifie PAS la signature !',
      decoded
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
