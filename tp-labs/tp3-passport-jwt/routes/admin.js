// Routes administrateur protégées par rôle
// À COMPLÉTER PAR L'ÉTUDIANT

const express = require('express');
const passport = require('passport');
const { requireAdmin, requireRole } = require('../middleware/roles');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');

const router = express.Router();

// ============================================
// TODO 6a : Route dashboard admin
// ============================================
// GET /admin/dashboard
// Header: Authorization: Bearer <access_token>
//
// Cette route doit :
// 1. Être protégée par passport.authenticate('jwt')
// 2. Être protégée par requireAdmin (rôle admin uniquement)
// 3. Retourner des statistiques système
//
// Référence : Exemple dans presentation-examples/4-passport-jwt.js

router.get('/dashboard',
  // TODO: Ajouter passport.authenticate('jwt', { session: false })
  // TODO: Ajouter requireAdmin
  // passport.authenticate('jwt', { session: false }),
  // requireAdmin,
  (req, res) => {
    // TODO: Implémenter le dashboard

    // res.json({
    //   message: 'Dashboard administrateur',
    //   admin: req.user.toJSON(),
    //   statistics: {
    //     totalUsers: User.getAll().length,
    //     activeTokens: RefreshToken.getAll().length,
    //     adminCount: User.getAll().filter(u => u.role === 'admin').length,
    //     userCount: User.getAll().filter(u => u.role === 'user').length
    //   }
    // });

    res.status(500).json({ error: 'TODO 6a : Route /admin/dashboard à compléter' });
  }
);

// ============================================
// TODO 6b : Route de gestion des utilisateurs
// ============================================
// GET /admin/users
// Header: Authorization: Bearer <access_token>
//
// Cette route doit :
// 1. Être protégée par passport.authenticate('jwt')
// 2. Être protégée par requireAdmin
// 3. Retourner la liste complète des utilisateurs
//
// Référence : Similar to dashboard, uses same protections

router.get('/users',
  // TODO: Ajouter passport.authenticate('jwt', { session: false })
  // TODO: Ajouter requireAdmin
  // passport.authenticate('jwt', { session: false }),
  // requireAdmin,
  (req, res) => {
    // TODO: Implémenter la liste des utilisateurs

    // res.json({
    //   message: 'Liste des utilisateurs (admin)',
    //   users: User.getAll(),
    //   total: User.getAll().length
    // });

    res.status(500).json({ error: 'TODO 6b : Route /admin/users à compléter' });
  }
);

// ============================================
// TODO 6c : Route de suppression d'utilisateur
// ============================================
// DELETE /admin/users/:id
// Header: Authorization: Bearer <access_token>
//
// Cette route doit :
// 1. Être protégée par passport.authenticate('jwt')
// 2. Être protégée par requireAdmin
// 3. Supprimer l'utilisateur avec User.deleteById()
// 4. Révoquer tous ses refresh tokens avec RefreshToken.revokeAllForUser()
// 5. Empêcher la suppression de soi-même (sécurité)
//
// Référence : Slide "🎯 Exemple Complet : API avec JWT"

router.delete('/users/:id',
  // TODO: Ajouter passport.authenticate('jwt', { session: false })
  // TODO: Ajouter requireAdmin
  // passport.authenticate('jwt', { session: false }),
  // requireAdmin,
  async (req, res) => {
    try {
      // TODO: Implémenter la suppression

      // Étape 1: Extraire l'ID de l'utilisateur à supprimer
      // const userId = parseInt(req.params.id);
      // if (isNaN(userId)) {
      //   return res.status(400).json({ error: 'ID invalide' });
      // }

      // Étape 2: Empêcher la suppression de soi-même
      // if (userId === req.user.id) {
      //   return res.status(400).json({
      //     error: 'Auto-suppression interdite',
      //     message: 'Vous ne pouvez pas supprimer votre propre compte'
      //   });
      // }

      // Étape 3: Supprimer l'utilisateur
      // const deleted = await User.deleteById(userId);
      // if (!deleted) {
      //   return res.status(404).json({ error: 'Utilisateur non trouvé' });
      // }

      // Étape 4: Révoquer tous ses tokens
      // const revokedCount = await RefreshToken.revokeAllForUser(userId);

      // Étape 5: Retourner le succès
      // res.json({
      //   message: 'Utilisateur supprimé',
      //   userId,
      //   tokensRevoked: revokedCount
      // });

      res.status(500).json({ error: 'TODO 6c : Route DELETE /admin/users/:id à compléter' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ============================================
// Route bonus : Nettoyer les tokens expirés (FOURNIE)
// ============================================
router.post('/cleanup-tokens',
  passport.authenticate('jwt', { session: false }),
  requireAdmin,
  async (req, res) => {
    try {
      const removed = RefreshToken.cleanExpired();
      res.json({
        message: 'Tokens expirés nettoyés',
        removed
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
