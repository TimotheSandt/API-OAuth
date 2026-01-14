// Middleware d'authentification JWT
// À COMPLÉTER PAR L'ÉTUDIANT

const { verifyAccessToken } = require('../utils/jwt');

// ============================================
// TODO 6 : Middleware de vérification JWT
// ============================================
// Ce middleware doit :
// 1. Extraire le token du header Authorization
// 2. Vérifier qu'il est au format "Bearer <token>"
// 3. Vérifier la validité du token avec verifyAccessToken()
// 4. Ajouter le payload décodé à req.user
// 5. Gérer les erreurs (token manquant, invalide, expiré)
//
// Référence : Slide "🔍 Vérifier un JWT : jwt.verify()"
// et Slide "⚠️ Gestion des Erreurs JWT"
function authenticateToken(req, res, next) {
  // TODO: Implémenter l'extraction et la vérification du token

  // Étape 1: Extraire le header Authorization
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"

  // Étape 2: Vérifier que le token existe
  // if (!token) {
  //   return res.status(401).json({ error: 'Token manquant' });
  // }

  // Étape 3: Vérifier le token
  // try {
  //   const decoded = verifyAccessToken(token);
  //   req.user = decoded; // { userId, email, iat, exp }
  //   next();
  // } catch (err) {
  //   // Gérer les différents types d'erreurs
  //   if (err.name === 'TokenExpiredError') {
  //     return res.status(401).json({
  //       error: 'Token expiré',
  //       message: 'Utilisez /auth/refresh pour obtenir un nouveau token'
  //     });
  //   }
  //   if (err.name === 'JsonWebTokenError') {
  //     return res.status(403).json({ error: 'Token invalide' });
  //   }
  //   return res.status(500).json({ error: 'Erreur de vérification' });
  // }

  return res.status(500).json({ error: 'Middleware authenticateToken à compléter' });
}

module.exports = { authenticateToken };
