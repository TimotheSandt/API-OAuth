// Middleware de vérification des rôles (RBAC)
// À COMPLÉTER PAR L'ÉTUDIANT

// ============================================
// TODO 3 : Middleware requireRole
// ============================================
// Ce middleware vérifie que l'utilisateur connecté possède
// le rôle requis pour accéder à une route.
//
// Ce middleware doit être utilisé APRÈS passport.authenticate('jwt')
// car il suppose que req.user existe déjà.
//
// Paramètre :
// - allowedRoles : String ou Array de rôles autorisés
//   Exemples : 'admin', ['admin', 'moderator']
//
// Le middleware doit :
// 1. Vérifier que req.user existe (sinon erreur 401)
// 2. Vérifier que req.user.role existe
// 3. Vérifier que le rôle de l'utilisateur est dans allowedRoles
// 4. Si oui : appeler next()
// 5. Si non : retourner 403 Forbidden
//
// Référence : Slide "🎯 Exemple Complet : API avec JWT"
//             Exemple dans presentation-examples/4-passport-jwt.js
//
// Exemple d'utilisation :
// router.get('/admin/dashboard',
//   passport.authenticate('jwt', { session: false }),
//   requireRole('admin'),
//   (req, res) => { ... }
// );

function requireRole(allowedRoles) {
  // Normaliser allowedRoles en array
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  return (req, res, next) => {
    try {
      // TODO: Implémenter la vérification des rôles

      // Étape 1: Vérifier que l'utilisateur est authentifié
      // if (!req.user) {
      //   return res.status(401).json({
      //     error: 'Non authentifié',
      //     message: 'Vous devez être connecté pour accéder à cette ressource'
      //   });
      // }

      // Étape 2: Vérifier que l'utilisateur a un rôle
      // if (!req.user.role) {
      //   return res.status(403).json({
      //     error: 'Accès refusé',
      //     message: 'Aucun rôle assigné à cet utilisateur'
      //   });
      // }

      // Étape 3: Vérifier que le rôle est autorisé
      // if (!roles.includes(req.user.role)) {
      //   return res.status(403).json({
      //     error: 'Accès refusé',
      //     message: `Rôle requis : ${roles.join(' ou ')}. Votre rôle : ${req.user.role}`,
      //     required: roles,
      //     current: req.user.role
      //   });
      // }

      // Étape 4: Autoriser l'accès
      // next();

      return res.status(500).json({
        error: 'TODO 3 : Middleware requireRole à compléter'
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}

// ============================================
// Middleware requireAdmin (FOURNI)
// ============================================
// Raccourci pour requireRole('admin')
// Exemple d'utilisation d'un middleware spécialisé
function requireAdmin(req, res, next) {
  return requireRole('admin')(req, res, next);
}

// ============================================
// Middleware requireUser (FOURNI)
// ============================================
// Raccourci pour requireRole(['admin', 'user'])
// Permet aux admin ET aux users d'accéder
function requireUser(req, res, next) {
  return requireRole(['admin', 'user'])(req, res, next);
}

module.exports = {
  requireRole,
  requireAdmin,
  requireUser
};
