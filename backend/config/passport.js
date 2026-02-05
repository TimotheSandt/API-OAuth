const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const DiscordStrategy = require("passport-discord").Strategy;
const {
  findUserByGoogleId,
  createUserFromGoogle,
  findUserByGithubId,
  createUserFromGithub,
  findUserByDiscordId,
  createUserFromDiscord,
} = require("../models/User");

// =============================================================================
// TODO 1: Configuration de la stratégie Google OAuth 2.0
// =============================================================================
// Instructions:
// 1. Importer GoogleStrategy depuis 'passport-google-oauth20'
// 2. Configurer passport.use() avec new GoogleStrategy()
// 3. Options à passer :
//    - clientID: process.env.GOOGLE_CLIENT_ID
//    - clientSecret: process.env.GOOGLE_CLIENT_SECRET
//    - callbackURL: process.env.GOOGLE_CALLBACK_URL
//    - passReqToCallback: true (pour accéder à req.app.locals.db)
// 4. Fonction callback async (req, accessToken, refreshToken, profile, done) :
//    a. Récupérer db depuis req.app.locals.db
//    b. Chercher l'utilisateur par googleId (profile.id) avec findUserByGoogleId()
//    c. Si l'utilisateur n'existe pas, le créer avec createUserFromGoogle()
//       - googleId: profile.id
//       - email: profile.emails[0].value
//       - name: profile.displayName
//       - picture: profile.photos[0].value
//    d. Appeler done(null, user) pour retourner l'utilisateur
//    e. En cas d'erreur, appeler done(error, null)
//
// Documentation : https://www.passportjs.org/packages/passport-google-oauth20/
// =============================================================================

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const db = req.app.locals.db;

        // 1. Chercher l'utilisateur par googleId
        let user = await findUserByGoogleId(db, profile.id);

        // 2. Si l'utilisateur n'existe pas, le créer
        if (!user) {
          // Logique optionnelle : vérifier si l'email existe déjà comme compte classique
          // Pour ce TP, on crée simplement un nouveau compte Google
          user = await createUserFromGoogle(db, {
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            picture:
              profile.photos && profile.photos[0]
                ? profile.photos[0].value
                : null,
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Erreur Google Strategy:", error);
        return done(error, null);
      }
    },
  ),
);

// =============================================================================
// Configuration GitHub OAuth
// =============================================================================
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      passReqToCallback: true,
      scope: ["user:email"], // Important pour récupérer l'email
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const db = req.app.locals.db;
        let user = await findUserByGithubId(db, profile.id);

        if (!user) {
          // GitHub ne retourne pas toujours l'email dans profile.emails s'il est privé
          // passport-github2 essaie de le récupérer avec le scope user:email
          const email =
            profile.emails && profile.emails[0]
              ? profile.emails[0].value
              : null;

          user = await createUserFromGithub(db, {
            githubId: profile.id,
            username: profile.username,
            name: profile.displayName,
            email: email,
            picture:
              profile.photos && profile.photos[0]
                ? profile.photos[0].value
                : null,
          });
        }
        return done(null, user);
      } catch (error) {
        console.error("Erreur GitHub Strategy:", error);
        return done(error, null);
      }
    },
  ),
);

// =============================================================================
// Configuration Discord OAuth
// =============================================================================
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      passReqToCallback: true,
      scope: ["identify", "email"],
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const db = req.app.locals.db;
        let user = await findUserByDiscordId(db, profile.id);

        if (!user) {
          user = await createUserFromDiscord(db, {
            discordId: profile.id,
            username: profile.username,
            email: profile.email,
            picture: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`,
          });
        }
        return done(null, user);
      } catch (error) {
        console.error("Erreur Discord Strategy:", error);
        return done(error, null);
      }
    },
  ),
);

// ⚠️ PAS de serializeUser/deserializeUser car on utilise JWT (stateless)
// Ces fonctions sont uniquement pour les sessions

module.exports = passport;
