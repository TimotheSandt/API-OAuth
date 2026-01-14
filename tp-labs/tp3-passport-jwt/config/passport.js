// Configuration de Passport avec 2 stratégies
// À COMPLÉTER PAR L'ÉTUDIANT

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');

// ============================================
// TODO 1 : Configuration de la stratégie Local
// ============================================
// Cette stratégie est utilisée pour le LOGIN uniquement.
// Elle vérifie email + password et retourne l'utilisateur si valide.
//
// Vous devez :
// 1. Configurer LocalStrategy avec usernameField: 'email'
// 2. Implémenter la fonction verify : (email, password, done) => {}
// 3. Trouver l'utilisateur avec User.findByEmail()
// 4. Vérifier le mot de passe avec user.comparePassword()
// 5. Retourner done(null, user) si succès, done(null, false) si échec
//
// Référence : Slide "🔐 passport-local : Configuration"
//             TP1 - config/passport.js

passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, async (email, password, done) => {
  try {
    // TODO: Implémenter la vérification des credentials

    // Étape 1: Trouver l'utilisateur
    // const user = await User.findByEmail(email);
    // if (!user) {
    //   return done(null, false, { message: 'Email ou mot de passe incorrect' });
    // }

    // Étape 2: Vérifier le mot de passe
    // const isValid = await user.comparePassword(password);
    // if (!isValid) {
    //   return done(null, false, { message: 'Email ou mot de passe incorrect' });
    // }

    // Étape 3: Retourner l'utilisateur
    // return done(null, user);

    return done(new Error('TODO 1 : Configuration LocalStrategy à compléter'));
  } catch (err) {
    return done(err);
  }
}));

// ============================================
// TODO 2 : Configuration de la stratégie JWT
// ============================================
// Cette stratégie est utilisée pour PROTÉGER LES ROUTES.
// Elle extrait le JWT du header Authorization et vérifie sa signature.
//
// Vous devez :
// 1. Configurer les options :
//    - jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
//    - secretOrKey: process.env.JWT_SECRET
// 2. Implémenter la fonction verify : (jwt_payload, done) => {}
// 3. Extraire userId du payload : jwt_payload.userId
// 4. Trouver l'utilisateur avec User.findById()
// 5. Retourner done(null, user) si trouvé, done(null, false) sinon
//
// Référence : Slide "🔐 passport-jwt : Configuration"
//             Exemple dans presentation-examples/4-passport-jwt.js

const jwtOptions = {
  // TODO: Configurer l'extracteur de JWT
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // secretOrKey: process.env.JWT_SECRET
};

passport.use('jwt', new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
  try {
    // TODO: Implémenter la vérification du JWT

    // Étape 1: Extraire l'userId du payload
    // const userId = jwt_payload.userId;

    // Étape 2: Trouver l'utilisateur
    // const user = await User.findById(userId);

    // Étape 3: Vérifier qu'il existe
    // if (user) {
    //   return done(null, user);
    // } else {
    //   return done(null, false);
    // }

    return done(new Error('TODO 2 : Configuration JwtStrategy à compléter'));
  } catch (err) {
    return done(err);
  }
}));

// ============================================
// Notes Importantes
// ============================================
// - LocalStrategy : Pour le login (vérification email + password)
// - JwtStrategy : Pour les routes protégées (vérification du token)
// - Les deux stratégies travaillent ensemble :
//   1. L'utilisateur se connecte via LocalStrategy
//   2. Le serveur génère un JWT
//   3. Les routes protégées utilisent JwtStrategy pour vérifier le JWT
//
// - session: false pour les deux stratégies (API stateless)
// - Le JWT contient userId et email, mais vous n'avez besoin que de userId
//   pour retrouver l'utilisateur complet en DB

module.exports = passport;
