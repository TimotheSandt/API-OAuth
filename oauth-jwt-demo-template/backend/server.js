require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('./config/passport');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration CORS pour Vue.js
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialiser Passport (SANS session car on utilise JWT)
app.use(passport.initialize());
// ⚠️ PAS de passport.session() car on est en stateless JWT !

// Stocker la référence db dans app.locals pour Passport
app.locals.db = mongoose.connection;

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur MongoDB:', err));

// Routes
app.use('/auth', authRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: '🎓 OAuth + JWT Demo - Backend Express + MongoDB',
    endpoints: {
      'POST /auth/register': 'Créer un compte (email/password)',
      'POST /auth/login': 'Se connecter (email/password)',
      'GET /auth/google': 'Se connecter avec Google',
      'GET /auth/google/callback': 'Callback Google OAuth',
      'GET /auth/profile': 'Profil (protégé par JWT)',
      'GET /auth/users': 'Liste utilisateurs (debug)'
    },
    database: 'MongoDB localhost:27017',
    authentication: 'JWT stateless + Google OAuth 2.0',
    cors: 'Configuré pour Vue.js'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📊 Base de données: ${process.env.MONGODB_URI}`);
  console.log(`🌐 Frontend autorisé: ${process.env.FRONTEND_URL}`);
});
