// Configuration de Passport Local Strategy
// À COMPLÉTER PAR L'ÉTUDIANT

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

// ============================================
// TODO 1 : Configurer la stratégie locale
// ============================================
// Utilisez passport.use() pour configurer une stratégie 'local'
//
// Indices :
// - Utilisez LocalStrategy de passport-local
// - Options : usernameField: 'email', passwordField: 'password', session: false
// - La fonction verify doit :
//   1. Trouver l'utilisateur par email avec User.findByEmail()
//   2. Vérifier le mot de passe avec user.comparePassword()
//   3. Retourner l'utilisateur si valide, sinon false
//
// Référence : Voir slide "⚙️ passport-local : Configuration"

passport.use('local', new LocalStrategy(
  {
    // TODO: Ajouter les options
    // usernameField: ...,
    // passwordField: ...,
    // session: ...
  },
  async (email, password, done) => {
    try {
      // TODO: Implémenter la logique de vérification
      // 1. Trouver l'utilisateur par email
      // const user = await User.findByEmail(email);

      // 2. Si utilisateur non trouvé, retourner false avec un message
      // if (!user) { ... }

      // 3. Vérifier le mot de passe
      // const isMatch = await user.comparePassword(password);

      // 4. Si mot de passe incorrect, retourner false
      // if (!isMatch) { ... }

      // 5. Sinon, retourner l'utilisateur
      // return done(null, user);

      return done(null, false, { message: 'À COMPLÉTER' });
    } catch (err) {
      return done(err);
    }
  }
));

module.exports = passport;
